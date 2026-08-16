"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const heroController_1 = require("../controllers/heroController");
// import { authenticate } from '../middleware/auth'; // Comment out for now
const router = (0, express_1.Router)();
// All routes - public for testing
router.get('/', heroController_1.getHeroBanner);
router.post('/', heroController_1.createHeroBanner); // No auth
router.put('/', heroController_1.updateHeroBanner); // No auth
router.put('/toggle-status', heroController_1.toggleHeroBannerStatus);
router.delete('/', heroController_1.deleteHeroBanner);
exports.default = router;
//# sourceMappingURL=heroRoutes.js.map