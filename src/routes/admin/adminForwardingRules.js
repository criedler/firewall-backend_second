const router = require('express').Router();
const {verifyAccessToken} = require('../../middleware/auth');
const {authorizeForAdmin} = require('../../middleware/auth');
const adminController = require('../../controller/admin/adminForwardingRulesController')
router.use(verifyAccessToken);
router.use(authorizeForAdmin);

router.get('/rules', adminController.getRules)
router.get('/rules/lists', adminController.getRuleLists)

router.post('/rules', adminController.createRule)
router.post('/rules/lists', adminController.createList)

router.delete('/rules/:rule',adminController.deleteRule)
router.delete('/rules/lists/:list',adminController.deleteList)

module.exports = router;