import { pgTable, uuid, varchar, text, boolean, timestamp,integer } from 'drizzle-orm/pg-core'


export const usersTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),

    firstName: varchar('first_name', { length: 45 }).notNull(),
    lastName: varchar('last_name', { length: 45 }),

    email: varchar('email', { length: 322 }).notNull().unique(),
    emailVerified: boolean('email_verified').default(false).notNull(),

    password: varchar('password', { length: 66 }),
    salt: text('salt'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})

export const movieBookRoundTable=pgTable('movie',{
    id: uuid('id').primaryKey().defaultRandom(),
        userId: uuid('user_id').notNull().references(() => usersTable.id),
    movieTitle: varchar('movie_title', { length: 255 }).notNull(),
    showTime: timestamp('show_time').notNull(),
    seatNumbers: text('seat_numbers').notNull(),
    seatsCount: integer('seats_count').notNull(),
    priceCents: integer('price_cents').notNull(),

    status:varchar('status',{length:20}).default('confirmed').notNull(),
        createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})