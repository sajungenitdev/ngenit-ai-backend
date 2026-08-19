import express from "express";
import { body } from "express-validator";
import {
    getPrivacyPolicy,
    getAllPrivacyVersions,
    getPrivacyPolicyVersion,
    createOrUpdatePrivacyPolicy,
    publishPrivacyPolicy,
    archivePrivacyPolicy,
    deletePrivacyPolicy,
    getPublicPrivacyPolicy,
} from "../controllers/privacyPolicyController";

const router = express.Router();

// ============================================================
// PUBLIC ROUTES
// ============================================================
router.get("/public", getPublicPrivacyPolicy);

// ============================================================
// CRUD OPERATIONS
// ============================================================
router.get("/", getPrivacyPolicy);
router.get("/versions", getAllPrivacyVersions);
router.get("/version/:version", getPrivacyPolicyVersion);

router.post(
    "/",
    [
        body("title").notEmpty().withMessage("Title is required").isString(),
        body("content").notEmpty().withMessage("Content is required").isString(),
        body("status").optional().isIn(["draft", "published", "archived"]),
    ],
    createOrUpdatePrivacyPolicy
);

router.patch("/:id/publish", publishPrivacyPolicy);
router.patch("/:id/archive", archivePrivacyPolicy);
router.delete("/:id", deletePrivacyPolicy);

export default router;