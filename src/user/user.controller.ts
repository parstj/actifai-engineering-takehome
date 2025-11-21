import { Request, Response } from 'express';
import userService from './user.service';

async function getUserRevenue(req: Request, res: Response) {
  const month = req.query.month as number | undefined;

  if(!req.params.id) {
    res.status(400).send('User ID is required');
    return;
  }
  
  const userId = parseInt(req.params.id.toString());
  const sales = await userService.getRevenueByUserId(userId, month);
  if(sales) {
    res.send(sales);
  } else {
    res.status(404).send('User not found');
  }
}

async function getRevenueForAllUsers(req: Request, res: Response) {
  const sales = await userService.getRevenueForAllUsers();
  if(sales) {
    res.send(sales);
  } else {
    res.status(500).send('Internal Server Error');
  }
}

async function getRevenueByMonth(req: Request, res: Response) {
  const sales = await userService.getRevenueByUserAndMonth();
  if(sales) {
    res.send(sales); 
  } else {
    res.status(500).send('Internal Server Error');
  }
}

export default {
  getUserRevenue,
  getRevenueForAllUsers,
  getRevenueByMonth
};
