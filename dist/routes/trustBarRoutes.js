"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trustBarController_1 = require("../controllers/trustBarController");
const router = (0, express_1.Router)();
router.get('/', trustBarController_1.getTrustBar);
router.post('/', trustBarController_1.createTrustBar);
router.put('/', trustBarController_1.updateTrustBar);
router.put('/toggle-status', trustBarController_1.toggleTrustBarStatus);
router.post('/reset', trustBarController_1.resetTrustBar);
router.delete('/', trustBarController_1.deleteTrustBar);
exports.default = router;
//# sourceMappingURL=trustBarRoutes.js.map