const router = require('express').Router();
const userController = require('../../controller/user/user-ForwardingRulesController')
const {verifyAccessToken} = require("../../middleware/auth");
const {checkAccess} = require("../../middleware/auth");
router.use(verifyAccessToken)
router.use(checkAccess)

router.route('/rules/lists/:list')
    .get(userController.getRulesInList)
    .post(userController.createRuleInList);

router.route('/rules/lists/:list/:rule')
    .patch(userController.modifyRuleInList)
    .delete(userController.deleteRuleInList);




module.exports = router
