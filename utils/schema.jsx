import { varchar, serial, integer, boolean } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

// Students Table
export const STUDENTS = pgTable('students', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    grade: varchar('grade', { length: 20 }).notNull(),
    branch: varchar('branch', { length: 20 }).notNull(),
    contact: varchar('contact', { length: 15 }).notNull(),
    address: varchar('address', { length: 100 }).notNull(),
});

// Attendance Table
export const ATTENDANCE = pgTable('attendance', {
    id: serial('id').primaryKey(),
    studentId: integer('studentId').notNull(),
    present: boolean('present').default(false),
    day: integer('day').notNull(),
    date: varchar('date', { length: 20 }).notNull(),
});
