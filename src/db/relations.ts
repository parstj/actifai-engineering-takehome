import { relations } from "drizzle-orm/relations";
import { users, userGroups, groups, sales } from "./schema";

export const userGroupsRelations = relations(userGroups, ({one}) => ({
	user: one(users, {
		fields: [userGroups.userId],
		references: [users.id]
	}),
	group: one(groups, {
		fields: [userGroups.groupId],
		references: [groups.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	userGroups: many(userGroups),
	sales: many(sales),
}));

export const groupsRelations = relations(groups, ({many}) => ({
	userGroups: many(userGroups),
}));

export const salesRelations = relations(sales, ({one}) => ({
	user: one(users, {
		fields: [sales.userId],
		references: [users.id]
	}),
}));