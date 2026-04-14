"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieBookRoundTable = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.usersTable = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    firstName: (0, pg_core_1.varchar)('first_name', { length: 45 }).notNull(),
    lastName: (0, pg_core_1.varchar)('last_name', { length: 45 }),
    email: (0, pg_core_1.varchar)('email', { length: 322 }).notNull().unique(),
    emailVerified: (0, pg_core_1.boolean)('email_verified').default(false).notNull(),
    password: (0, pg_core_1.varchar)('password', { length: 66 }),
    salt: (0, pg_core_1.text)('salt'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').$onUpdate(() => new Date()),
});
exports.movieBookRoundTable = (0, pg_core_1.pgTable)('movie', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').notNull().references(() => exports.usersTable.id),
    movieTitle: (0, pg_core_1.varchar)('movie_title', { length: 255 }).notNull(),
    showTime: (0, pg_core_1.timestamp)('show_time').notNull(),
    seatNumbers: (0, pg_core_1.text)('seat_numbers').notNull(),
    seatsCount: (0, pg_core_1.integer)('seats_count').notNull(),
    priceCents: (0, pg_core_1.integer)('price_cents').notNull(),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('confirmed').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').$onUpdate(() => new Date()),
});
//# sourceMappingURL=schema.js.map