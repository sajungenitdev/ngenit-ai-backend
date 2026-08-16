import { Request, Response } from 'express';
import { ContactSubmission } from '../models/ContactSubmission';

// ============================================================
// GET - Fetch all submissions
// ============================================================
export const getSubmissions = async (req: Request, res: Response) => {
    try {
        const { status, search } = req.query;
        
        let filter: any = {};
        
        if (status && status !== 'all') {
            filter.status = status;
        }
        
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } },
            ];
        }
        
        const submissions = await ContactSubmission.find(filter)
            .sort({ createdAt: -1 });
        
        // Get stats
        const stats = {
            total: await ContactSubmission.countDocuments(),
            pending: await ContactSubmission.countDocuments({ status: 'pending' }),
            contacted: await ContactSubmission.countDocuments({ status: 'contacted' }),
            completed: await ContactSubmission.countDocuments({ status: 'completed' }),
        };
        
        res.status(200).json({
            success: true,
            data: submissions,
            stats,
        });
    } catch (error: any) {
        console.error('Get Submissions Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch submissions',
        });
    }
};

// ============================================================
// GET - Fetch single submission
// ============================================================
export const getSubmission = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const submission = await ContactSubmission.findById(id);
        
        if (!submission) {
            return res.status(404).json({
                success: false,
                error: 'Submission not found',
            });
        }
        
        res.status(200).json({
            success: true,
            data: submission,
        });
    } catch (error: any) {
        console.error('Get Submission Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch submission',
        });
    }
};

// ============================================================
// PUT - Update submission status
// ============================================================
export const updateSubmissionStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;
        
        const submission = await ContactSubmission.findById(id);
        
        if (!submission) {
            return res.status(404).json({
                success: false,
                error: 'Submission not found',
            });
        }
        
        const updateData: any = { status };
        
        if (status === 'contacted') {
            updateData.contactedAt = new Date();
        } else if (status === 'completed') {
            updateData.completedAt = new Date();
        }
        
        if (notes !== undefined) {
            updateData.notes = notes;
        }
        
        const updated = await ContactSubmission.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            data: updated,
            message: `Status updated to ${status}`,
        });
    } catch (error: any) {
        console.error('Update Submission Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to update submission',
        });
    }
};

// ============================================================
// DELETE - Delete submission
// ============================================================
export const deleteSubmission = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const submission = await ContactSubmission.findByIdAndDelete(id);
        
        if (!submission) {
            return res.status(404).json({
                success: false,
                error: 'Submission not found',
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Submission deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete Submission Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete submission',
        });
    }
};

// ============================================================
// DELETE - Delete multiple submissions
// ============================================================
export const deleteMultipleSubmissions = async (req: Request, res: Response) => {
    try {
        const { ids } = req.body;
        
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No IDs provided',
            });
        }
        
        await ContactSubmission.deleteMany({ _id: { $in: ids } });
        
        res.status(200).json({
            success: true,
            message: `${ids.length} submissions deleted successfully`,
        });
    } catch (error: any) {
        console.error('Delete Multiple Submissions Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete submissions',
        });
    }
};