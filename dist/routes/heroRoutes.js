"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const heroController_1 = require("../controllers/heroController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
// Public routes
router.get('/', heroController_1.getHeroBanner);
// Admin routes
router.post('/', auth_1.authenticate, validation_1.validateHeroBanner, heroController_1.createHeroBanner);
router.put('/', auth_1.authenticate, validation_1.validateHeroBanner, heroController_1.updateHeroBanner);
router.put('/toggle-status', auth_1.authenticate, heroController_1.toggleHeroBannerStatus);
router.post('/reset', auth_1.authenticate, heroController_1.resetHeroBanner);
router.delete('/', auth_1.authenticate, heroController_1.deleteHeroBanner);
exports.default = router;
//# sourceMappingURL=heroRoutes.js.map