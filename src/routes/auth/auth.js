const router = require('express').Router();
const authController = require('../../controller/auth/authController')
const {authenticate, verifyAccessToken,verifyRefreshToken} = require('../../middleware/auth')

router.post('/login', authenticate,authController.login );
router.post('/register', authController.register,authenticate,authController.login);
router.get('/refreshToken',verifyRefreshToken,authController.refreshToken)
router.delete('/logout',verifyAccessToken,authController.logout)


module.exports = router;
