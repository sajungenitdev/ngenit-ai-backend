import express from "express";
import { body } from "express-validator";
import {
    getTermsConditions,
    getAllTermsVersions,
    getTermsConditionsVersion,
    createOrUpdateTermsConditions,
    publishTermsConditions,
    archiveTermsConditions,
    deleteTermsConditions,
    getPublicTermsConditions,
} from "../controllers/termsConditionsController";

const router = express.Router();

// ============================================================
// PUBLIC ROUTES
// ============================================================
router.get("/public", getPublicTermsConditions);

// ============================================================
// CRUD OPERATIONS
// ============================================================
router.get("/", getTermsConditions);
router.get("/versions", getAllTermsVersions);
router.get("/version/:version", getTermsConditionsVersion);

router.post(
    "/",
    [
        body("title").notEmpty().withMessage("Title is required").isString(),
        body("content").notEmpty().withMessage("Content is required").isString(),
        body("status").optional().isIn(["draft", "published", "archived"]),
    ],
    createOrUpdateTermsConditions
);

router.patch("/:id/publish", publishTermsConditions);
router.patch("/:id/archive", archiveTermsConditions);
router.delete("/:id", deleteTermsConditions);

export default router;