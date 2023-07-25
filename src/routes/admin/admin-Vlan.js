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
    .put(adminVlanController.updateVlan);

router.delete('/vlans/:vlanName', adminVlanController.deleteVlan);

router.post('/vlans/assign-vlan', adminVlanController.assignVlan);

module.exports = router;