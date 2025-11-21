import express from 'express';
import userController from './user.controller';
import validation from '../middleware/validation';

const router = express.Router();

router.get('/revenue/month', userController.getRevenueByMonth);
router.get('/revenue/:id', validation.monthValidation(), validation.handleValidationErrors, userController.getUserRevenue);
router.get('/revenue', validation.monthValidation(), validation.handleValidationErrors, userController.getRevenueForAllUsers);

export default router;
