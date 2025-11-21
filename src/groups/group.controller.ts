import { Request, Response } from 'express';
import groupService from './group.service';

async function getGroupRevenue(req: Request, res: Response) {
  const month = req.query.month as number | undefined;

  if(!req.params.id) {
    res.status(400).send('Group ID is required');
    return;
  }
  
  const groupId = parseInt(req.params.id.toString());
  const sales = await groupService.getRevenueByGroupId(groupId, month);
  if(sales) {
    res.send(sales);
  } else {
    res.status(404).send('Group not found');
  }
}

async function getRevenueForAllGroups(req: Request, res: Response) {
  const sales = await groupService.getRevenueForAllGroups();
  if(sales) {
    res.send(sales);
  } else {
    res.status(500).send('Internal Server Error');
  }
}

async function getRevenueByMonth(req: Request, res: Response) {
  const sales = await groupService.getRevenueByGroupAndMonth();
  if(sales) {
    res.send(sales); 
  } else {
    res.status(500).send('Internal Server Error');
  }
}

export default {
  getGroupRevenue,
  getRevenueForAllGroups,
  getRevenueByMonth
};
