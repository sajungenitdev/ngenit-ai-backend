"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrustBar = exports.resetTrustBar = exports.toggleTrustBarStatus = exports.updateTrustBar = exports.createTrustBar = exports.getTrustBar = void 0;
const TrustBar_1 = require("../models/TrustBar");
// ============================================================
// GET - Fetch Trust Bar
// ============================================================
const getTrustBar = async (req, res) => {
    try {
        let trustBar = await TrustBar_1.TrustBar.findOne();
        if (!trustBar) {
            return res.status(404).json({
                success: false,
                error: 'Trust bar not found. Please create one first.',
            });
        }
        res.status(200).json({
            success: true,
            data: trustBar,
        });
    }
    catch (error) {
        console.error('Get Trust Bar Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch trust bar',
        });
    }
};
exports.getTrustBar = getTrustBar;
// ============================================================
// POST - Create Trust Bar (First Time)
// ============================================================
const createTrustBar = async (req, res) => {
    try {
        // Check if trust bar already exists
        const existing = await TrustBar_1.TrustBar.findOne();
        if (existing) {
            return res.status(400).json({
                success: false,
                error: 'Trust bar already exists. Use PUT to update.',
            });
        }
        const trustBarData = req.body;
        // Ensure partners have IDs if not provided
        if (trustBarData.partners) {
            trustBarData.partners = trustBarData.partners.map((p, index) => ({
                ...p,
                id: p.id || (index + 1).toString(),
            }));
        }
        const trustBar = await TrustBar_1.TrustBar.create(trustBarData);
        res.status(201).json({
            success: true,
            data: trustBar,
            message: 'Trust bar created successfully',
        });
    }
    catch (error) {
        console.error('Create Trust Bar Error:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors,
            });
        }
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to create trust bar',
        });
    }
};
exports.createTrustBar = createTrustBar;
// ============================================================
// PUT - Update Trust Bar (Full Update)
// ============================================================
const updateTrustBar = async (req, res) => {
    try {
        const updateData = req.body;
        // Find existing trust bar
        let trustBar = await TrustBar_1.TrustBar.findOne();
        if (!trustBar) {
            return res.status(404).json({
                success: false,
                error: 'Trust bar not found. Please create one first.',
            });
        }
        // Ensure partners have IDs
        if (updateData.partners) {
            updateData.partners = updateData.partners.map((p, index) => ({
                ...p,
                id: p.id || (index + 1).toString(),
            }));
        }
        // Update all fields
        const updated = await TrustBar_1.TrustBar.findByIdAndUpdate(trustBar._id, {
            ...updateData,
            updatedAt: new Date()
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: updated,
            message: 'Trust bar updated successfully',
        });
    }
    catch (error) {
        console.error('Update Trust Bar Error:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors,
            });
        }
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to update trust bar',
        });
    }
};
exports.updateTrustBar = updateTrustBar;
// ============================================================
// PUT - Toggle Trust Bar Status
// ============================================================
const toggleTrustBarStatus = async (req, res) => {
    try {
        const { isEnabled } = req.body;
        let trustBar = await TrustBar_1.TrustBar.findOne();
        if (!trustBar) {
            return res.status(404).json({
                success: false,
                error: 'Trust bar not found',
            });
        }
        const updated = await TrustBar_1.TrustBar.findByIdAndUpdate(trustBar._id, { isEnabled, updatedAt: new Date() }, { new: true });
        res.status(200).json({
            success: true,
            data: updated,
            message: `Trust bar ${isEnabled ? 'enabled' : 'disabled'} successfully`,
        });
    }
    catch (error) {
        console.error('Toggle Trust Bar Status Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle trust bar status',
        });
    }
};
exports.toggleTrustBarStatus = toggleTrustBarStatus;
// ============================================================
// POST - Reset to Default
// ============================================================
const resetTrustBar = async (req, res) => {
    try {
        const defaultData = {
            isEnabled: true,
            leftText: "Technology Ecosystem",
            partners: [
                { id: "1", name: "Microsoft Azure" },
                { id: "2", name: "AWS" },
                { id: "3", name: "Google Cloud" },
                { id: "4", name: "OpenAI" },
                { id: "5", name: "SAP" },
                { id: "6", name: "Salesforce" },
            ],
        };
        let trustBar = await TrustBar_1.TrustBar.findOne();
        if (trustBar) {
            const updated = await TrustBar_1.TrustBar.findByIdAndUpdate(trustBar._id, { ...defaultData, updatedAt: new Date() }, { new: true });
            res.status(200).json({
                success: true,
                data: updated,
                message: 'Trust bar reset to default successfully',
            });
        }
        else {
            const created = await TrustBar_1.TrustBar.create(defaultData);
            res.status(201).json({
                success: true,
                data: created,
                message: 'Trust bar created with default values',
            });
        }
    }
    catch (error) {
        console.error('Reset Trust Bar Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to reset trust bar',
        });
    }
};
exports.resetTrustBar = resetTrustBar;
// ============================================================
// DELETE - Delete Trust Bar
// ============================================================
const deleteTrustBar = async (req, res) => {
    try {
        const trustBar = await TrustBar_1.TrustBar.findOne();
        if (!trustBar) {
            return res.status(404).json({
                success: false,
                error: 'Trust bar not found',
            });
        }
        await TrustBar_1.TrustBar.findByIdAndDelete(trustBar._id);
        res.status(200).json({
            success: true,
            message: 'Trust bar deleted successfully',
        });
    }
    catch (error) {
        console.error('Delete Trust Bar Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete trust bar',
        });
    }
};
exports.deleteTrustBar = deleteTrustBar;
//# sourceMappingURL=trustBarController.js.map