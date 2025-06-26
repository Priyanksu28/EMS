import express from 'express'
import { login, verify, forgotPassword, verifyOtp, resetPassword} from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddlware.js'


const router = express.Router()

router.post('/login', login)
router.get('/verify', authMiddleware, verify)
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router

