import { db } from '..';
import { sales, userGroups } from '../db/schema';
import { avg, eq, sql, sum, and } from 'drizzle-orm';

async function getRevenueByGroupId(groupId: number, month?: number) {
    try {
        const test = await db.select(
        {
            group: userGroups.groupId,
            averageRevenue: avg(sales.amount),
            totalRevenue: sum(sales.amount)
        }).from(sales)
        .leftJoin(userGroups, eq(sales.userId, userGroups.userId))
        .where(
            and(
                eq(userGroups.groupId, groupId),
                month ? sql`EXTRACT(MONTH FROM ${sales.date}) = ${month}` : undefined
            )
        )
        .groupBy(userGroups.groupId);
        return test;
    } catch (error) {
        console.error('Error fetching revenue by group ID:', error);
        throw error;
    }

}

async function getRevenueForAllGroups() {
    try {
        const test = await db.select(
            {
                group: userGroups.groupId,
                averageRevenue: avg(sales.amount),
                totalRevenue: sum(sales.amount)
            }).from(sales)
            .leftJoin(userGroups, eq(sales.userId, userGroups.userId))
            .groupBy(userGroups.groupId)
            .orderBy(userGroups.groupId);
        return test;
    } catch (error) {
        console.error('Error fetching revenue for all groups:', error);
        throw error;
    }
}

async function getRevenueByGroupAndMonth() {
    try {
        const test = await db.select(
            {
                group: userGroups.groupId,
                month: sql`EXTRACT(MONTH FROM ${sales.date})`.as<number>(),
                averageRevenue: avg(sales.amount),
                totalRevenue: sum(sales.amount)
            }).from(sales)
            .leftJoin(userGroups, eq(sales.userId, userGroups.userId))
            .groupBy(userGroups.groupId, sql`EXTRACT(MONTH FROM ${sales.date})`)
            .orderBy(userGroups.groupId, sql`EXTRACT(MONTH FROM ${sales.date})`);

        return test;
    } catch (error) {
        console.error('Error fetching revenue by group and month:', error);
        throw error;
    }
}

export default {
    getRevenueByGroupId,
    getRevenueForAllGroups,
    getRevenueByGroupAndMonth
};