const router = require('express').Router();
const {verifyAccessToken} = require('../../middleware/auth');
const {authorizeForAdmin} = require('../../middleware/auth');
const adminHandleUsersController = require('../../controller/admin/admin-HandleUserController');
router.use(verifyAccessToken);
router.use(authorizeForAdmin);



router.get('/', adminHandleUsersController.getUsers);
router.delete('/:username', adminHandleUsersController.deleteUser);

module.exports = router;


