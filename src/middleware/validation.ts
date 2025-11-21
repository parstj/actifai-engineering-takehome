import { query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const monthValidation = () => query('month').optional().isInt({ min: 1, max: 12 }).withMessage('Month must be an integer between 1 and 12');

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export default {
    monthValidation,
    handleValidationErrors
}