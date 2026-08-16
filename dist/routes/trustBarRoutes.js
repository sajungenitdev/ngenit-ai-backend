"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trustBarController_1 = require("../controllers/trustBarController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Public routes
router.get('/', trustBarController_1.getTrustBar);
// Admin routes
router.post('/', auth_1.authenticate, validation_1.validateTrustBar, trustBarController_1.createTrustBar);
router.put('/', auth_1.authenticate, validation_1.validateTrustBar, trustBarController_1.updateTrustBar);
router.put('/toggle-status', auth_1.authenticate, trustBarController_1.toggleTrustBarStatus);
router.post('/reset', auth_1.authenticate, trustBarController_1.resetTrustBar);
router.delete('/', auth_1.authenticate, trustBarController_1.deleteTrustBar);
exports.default = router;
//# sourceMappingURL=trustBarRoutes.js.map