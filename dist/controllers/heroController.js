"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeroBanner = exports.toggleHeroBannerStatus = exports.updateHeroBanner = exports.createHeroBanner = exports.getHeroBanner = void 0;
const HeroBanner_1 = require("../models/HeroBanner");
// ============================================================
// GET - Fetch Hero Banner
// ============================================================
const getHeroBanner = async (req, res) => {
    try {
        let hero = await HeroBanner_1.HeroBanner.findOne();
        if (!hero) {
            return res.status(404).json({
                success: false,
                error: 'Hero banner not found. Please create one first.',
            });
        }
        res.status(200).json({
            success: true,
            data: hero,
        });
    }
    catch (error) {
        console.error('Get Hero Banner Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch hero banner',
        });
    }
};
exports.getHeroBanner = getHeroBanner;
// ============================================================
// POST - Create Hero Banner (First Time)
// ============================================================
const createHeroBanner = async (req, res) => {
    try {
        // Check if hero already exists
        const existing = await HeroBanner_1.HeroBanner.findOne();
        if (existing) {
            return res.status(400).json({
                success: false,
                error: 'Hero banner already exists. Use PUT to update.',
            });
        }
        const heroData = req.body;
        const hero = await HeroBanner_1.HeroBanner.create(heroData);
        res.status(201).json({
            success: true,
            data: hero,
            message: 'Hero banner created successfully',
        });
    }
    catch (error) {
        console.error('Create Hero Banner Error:', error);
        // Validation error
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
            error: error.message || 'Failed to create hero banner',
        });
    }
};
exports.createHeroBanner = createHeroBanner;
// ============================================================
// PUT - Update Hero Banner (Full Update)
// ============================================================
const updateHeroBanner = async (req, res) => {
    try {
        const updateData = req.body;
        // Find existing hero
        let hero = await HeroBanner_1.HeroBanner.findOne();
        if (!hero) {
            return res.status(404).json({
                success: false,
                error: 'Hero banner not found. Please create one first.',
            });
        }
        // Update all fields
        const updated = await HeroBanner_1.HeroBanner.findByIdAndUpdate(hero._id, {
            ...updateData,
            updatedAt: new Date()
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: updated,
            message: 'Hero banner updated successfully',
        });
    }
    catch (error) {
        console.error('Update Hero Banner Error:', error);
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
            error: error.message || 'Failed to update hero banner',
        });
    }
};
exports.updateHeroBanner = updateHeroBanner;
// ============================================================
// PUT - Partial Update (Status Toggle)
// ============================================================
const toggleHeroBannerStatus = async (req, res) => {
    try {
        const { isActive } = req.body;
        let hero = await HeroBanner_1.HeroBanner.findOne();
        if (!hero) {
            return res.status(404).json({
                success: false,
                error: 'Hero banner not found',
            });
        }
        const updated = await HeroBanner_1.HeroBanner.findByIdAndUpdate(hero._id, { isActive, updatedAt: new Date() }, { new: true });
        res.status(200).json({
            success: true,
            data: updated,
            message: `Hero banner ${isActive ? 'activated' : 'deactivated'} successfully`,
        });
    }
    catch (error) {
        console.error('Toggle Hero Banner Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to toggle hero banner status',
        });
    }
};
exports.toggleHeroBannerStatus = toggleHeroBannerStatus;
// ============================================================
// DELETE - Delete Hero Banner (Optional)
// ============================================================
const deleteHeroBanner = async (req, res) => {
    try {
        const hero = await HeroBanner_1.HeroBanner.findOne();
        if (!hero) {
            return res.status(404).json({
                success: false,
                error: 'Hero banner not found',
            });
        }
        await HeroBanner_1.HeroBanner.findByIdAndDelete(hero._id);
        res.status(200).json({
            success: true,
            message: 'Hero banner deleted successfully',
        });
    }
    catch (error) {
        console.error('Delete Hero Banner Error:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete hero banner',
        });
    }
};
exports.deleteHeroBanner = deleteHeroBanner;
//# sourceMappingURL=heroController.js.map