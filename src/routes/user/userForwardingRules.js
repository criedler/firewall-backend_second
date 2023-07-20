const router = require('express').Router();
const userController = require('../../controller/user/userForwardingRulesController')
const {verifyAccessToken} = require("../../middleware/auth");
const {checkAccess} = require("../../middleware/auth");
router.use(verifyAccessToken)
router.use(checkAccess)

router.get('/rules/lists/:list', userController.getRulesInList)

router.post('/rules/lists/:list', userController.createRuleInList)

router.patch('/rules/lists/:list/:rule', userController.modifyRuleInList);

router.delete('/rules/lists/:list/:rule', userController.deleteRuleInList)


module.exports = router
