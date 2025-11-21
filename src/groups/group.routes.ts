import express from 'express';
import groupController from './group.controller'; // Import the controller
import validation from '../middleware/validation';

const router = express.Router();

router.get('/revenue/month', groupController.getRevenueByMonth);
router.get('/revenue/:id', validation.monthValidation(), validation.handleValidationErrors, groupController.getGroupRevenue);
router.get('/revenue', validation.monthValidation(), validation.handleValidationErrors, groupController.getRevenueForAllGroups);

export default router;
