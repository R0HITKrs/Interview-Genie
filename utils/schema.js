import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockInterview', {
  id:serial('id').primaryKey(),
  jsonMockResp:text('jsonMockResp').notNull(),
  jobPosition:varchar('jobPosition').notNull(),
  jobDesc:varchar('jobDesc').notNull(),
  jobExperience:varchar('jobExperience').notNull(),
  createBy:varchar('createdBy').notNull(),
  createAt:varchar('createdAt'),
  mockId:varchar('mockId').notNull()
})

export const UserAnswer = pgTable('UserAnswer', {
  id: serial('id').primaryKey(),
  mockIdREf: varchar('mockId').notNull(),
  question: varchar('question').notNull(),
  correctAns: text('correctAns').notNull(),
  userAns: text('userAns'),
  feedback: text('feedback'),
  rating: varchar('rating'),
  eserEmail: varchar('userEmail'),
  createAt: varchar('createdAt'),
})