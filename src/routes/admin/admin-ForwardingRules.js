const router = require('express').Router();
const {verifyAccessToken} = require('../../middleware/auth');
const {authorizeForAdmin} = require('../../middleware/auth');
const adminController = require('../../controller/admin/admin-ForwardingRulesController')
const userController = require("../../controller/user/user-ForwardingRulesController");
router.use(verifyAccessToken);
router.use(authorizeForAdmin);

router.route('/rules')
    .get(adminController.getRules)
    .post(adminController.createRule);

router.route('/rules/:rule')
    .patch(adminController.modifyRule)
    .delete(adminController.deleteRule);

router.route('/rules/lists/:list')
    .get(userController.getRulesInList)
    .post(userController.createRuleInList);

router.route('/rules/lists/:list/:rule')
    .patch(userController.modifyRuleInList)
    .delete(userController.deleteRuleInList);

router.route('/rules/lists')
    .get(adminController.getRuleLists)
    .post(adminController.createList)
    .delete(adminController.deleteList);











module.exports = router;