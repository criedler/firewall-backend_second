const express = require('express');
const router = express.Router();
const {verifyAccessToken} = require('../../middleware/auth');
const {authorizeForAdmin} = require('../../middleware/auth');
const adminVlanController = require('../../controller/admin/admin-VlanController')
router.use(verifyAccessToken);
router.use(authorizeForAdmin);

router.route('/vlans')
    .get(adminVlanController.getAllVlans)
    .post(adminVlanController.createVlan)

router.route('/vlans/:name')
    .post( adminVlanController.assignVlan)
    .put(adminVlanController.updateVlan)
    .delete(adminVlanController.deleteVlan);


module.exports = router;