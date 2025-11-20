import { pgTable, serial, varchar, foreignKey, integer, date } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	role: varchar({ length: 50 }).notNull(),
});

export const userGroups = pgTable("user_groups", {
	userId: serial("user_id").notNull(),
	groupId: serial("group_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_groups_user_id_fkey"
		}),
	foreignKey({
			columns: [table.groupId],
			foreignColumns: [groups.id],
			name: "user_groups_group_id_fkey"
		}),
]);

export const groups = pgTable("groups", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
});

export const sales = pgTable("sales", {
	id: serial().primaryKey().notNull(),
	userId: serial("user_id").notNull(),
	amount: integer(),
	date: date(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sales_user_id_fkey"
		}),
]);
