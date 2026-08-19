import express from "express";
import { body } from "express-validator";
import {
    archiveCookiePolicy,
    createOrUpdateCookiePolicy,
    deleteCookiePolicy,
    getAllVersions,
    getCookiePolicy,
    getPolicyStats,
    getPolicyVersion,
    getPublicCookiePolicy,
    publishCookiePolicy,
} from "../controllers/cookiePolicycontroller";

const router = express.Router();

// ============================================================
// ALL ROUTES - PUBLIC (No authentication required)
// ============================================================

// Get published cookie policy for public display
router.get("/public", getPublicCookiePolicy);

// Get all versions
router.get("/versions", getAllVersions);

// Get policy statistics
router.get("/stats", getPolicyStats);

// Get a specific version
router.get("/version/:version", getPolicyVersion);

// Get current policy (latest version)
router.get("/", getCookiePolicy);

// Create or update policy
router.post(
    "/",
    [
        body("title")
            .notEmpty()
            .withMessage("Title is required")
            .isString()
            .withMessage("Title must be a string")
            .isLength({ max: 200 })
            .withMessage("Title must be less than 200 characters"),
        body("content")
            .notEmpty()
            .withMessage("Content is required")
            .isString()
            .withMessage("Content must be a string"),
        body("status")
            .optional()
            .isIn(["draft", "published", "archived"])
            .withMessage("Invalid status value"),
    ],
    createOrUpdateCookiePolicy
);

// Publish policy
router.patch("/:id/publish", publishCookiePolicy);

// Archive policy
router.patch("/:id/archive", archiveCookiePolicy);

// Delete policy
router.delete("/:id", deleteCookiePolicy);

export default router;