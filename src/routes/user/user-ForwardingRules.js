const router = require('express').Router();
const userController = require('../../controller/user/user-ForwardingRulesController')
const {verifyAccessToken} = require("../../middleware/auth");
const {checkAccess} = require("../../middleware/auth");
router.use(verifyAccessToken)

router.route('/rules/lists/:list')
    .get(checkAccess,userController.getRulesInList)
    .post(checkAccess,userController.createRuleInList);

router.route('/rules/lists/:list/:rule')
    .patch(checkAccess,userController.modifyRuleInList)
    .delete(checkAccess,userController.deleteRuleInList);

module.exports = router
