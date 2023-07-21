const express = require('express');
const router = express.Router();
const {verifyAccessToken} = require('../../middleware/auth');
const {authorizeForAdmin} = require('../../middleware/auth');
const adminVlanController = require('../../controller/admin/adminVlanController')
router.use(verifyAccessToken);
router.use(authorizeForAdmin);

router.get('/vlans',adminVlanController.getAllVlans );

router.post('/vlans', adminVlanController.createVlan)

router.put('/vlans', adminVlanController.updateVlan)

router.delete('/vlans', adminVlanController.deleteVlan)

router.post('/vlans/assign-vlan', adminVlanController.assignVlan)
//Kunden vlan zuweisen

module.exports = router;