const router = require('express').Router();
const {verifyAccessToken} = require('../../middleware/auth');
const {authorizeForAdmin} = require('../../middleware/auth');
const adminController = require('../../controller/admin/adminForwardingRulesController')
const userController = require("../../controller/user/userForwardingRulesController");
router.use(verifyAccessToken);
router.use(authorizeForAdmin);

router.get('/rules', adminController.getRules)
router.get('/rules/lists/:list', userController.getRulesInList)
router.get('/rules/lists', adminController.getRuleLists)

router.post('/rules', adminController.createRule)
router.post('/rules/lists/:list', userController.createRuleInList)
router.post('/rules/lists', adminController.createList)

router.patch('/rules/:rule', adminController.modifyRule)
router.patch('/rules/lists:/:list/:rule', userController.modifyRuleInList)

router.delete('/rules/:rule',adminController.deleteRule)
router.delete('/rules/lists/:list/:rule', userController.deleteRuleInList)
router.delete('/rules/lists/:list',adminController.deleteList)









module.exports = router;