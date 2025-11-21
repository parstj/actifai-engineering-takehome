import { db } from '..';
import { sales, users } from '../db/schema';
import { avg, eq, sql, sum, and } from 'drizzle-orm';

async function getRevenueByUserId(userId: number, month?: number) {
    try {
        const test = await db.select(
            {
                user: users.id,
                averageRevenue: avg(sales.amount),
                totalRevenue: sum(sales.amount)
            }).from(sales)
            .leftJoin(users, eq(sales.userId, users.id))
            .where(
                and(
                    eq(users.id, userId),
                    month ? sql`EXTRACT(MONTH FROM ${sales.date}) = ${month}` : undefined
                )
            )
            .groupBy(users.id);
        return test;
    } catch (error) {
        console.error('Error fetching revenue by user ID:', error);
        throw error;
    }
}

async function getRevenueForAllUsers() {
    try {
        const test = await db.select(
            {
                user: users.id,
                averageRevenue: avg(sales.amount),
                totalRevenue: sum(sales.amount)
            }).from(sales)
            .leftJoin(users, eq(sales.userId, users.id))
            .groupBy(users.id)
            .orderBy(users.id);
        return test;
    } catch (error) {
        console.error('Error fetching revenue for all users:', error);
        throw error;
    }
}

async function getRevenueByUserAndMonth() {
    try {
        const test = await db.select(
            {
                user: users.id,
                month: sql`EXTRACT(MONTH FROM ${sales.date})`.as<number>(),
                averageRevenue: avg(sales.amount),
                totalRevenue: sum(sales.amount)
            }).from(sales)
            .leftJoin(users, eq(sales.userId, users.id))
            .groupBy(users.id, sql`EXTRACT(MONTH FROM ${sales.date})`)
            .orderBy(users.id, sql`EXTRACT(MONTH FROM ${sales.date})`);

        return test;
    } catch (error) {
        console.error('Error fetching revenue by user and month:', error);
        throw error;
    }
}

export default {
    getRevenueByUserId,
    getRevenueForAllUsers,
    getRevenueByUserAndMonth
};