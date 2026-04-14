"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingMiddleware = exports.checkSeatAvailability = exports.ensureSeatsCountMatches = exports.validateCreateBooking = void 0;
const movie_modals_1 = require("./movie.modals");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
/**
 * Validate and sanitize request body using Zod schema.
 * Attaches parsed payload to res.locals.bookingPayload (and replaces req.body).
 */
const validateCreateBooking = (req, res, next) => {
    const result = movie_modals_1.createBookingSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: 'invalid_payload', details: result.error.format() });
    }
    // canonicalize payload and store for downstream middleware/handler
    const payload = result.data;
    req.body = payload;
    res.locals.bookingPayload = payload;
    return next();
};
exports.validateCreateBooking = validateCreateBooking;
/**
 * Ensure seatsCount matches number of seatNumbers.
 */
const ensureSeatsCountMatches = (req, res, next) => {
    const payload = res.locals.bookingPayload;
    if (!payload)
        return res.status(500).json({ error: 'server_error', message: 'missing booking payload' });
    if (payload.seatsCount !== payload.seatNumbers.length) {
        return res.status(400).json({
            error: 'seats_count_mismatch',
            message: 'seatsCount must equal the number of seatNumbers',
        });
    }
    return next();
};
exports.ensureSeatsCountMatches = ensureSeatsCountMatches;
/**
 * Check seat availability for the same movie + showTime.
 * If any requested seat is already taken, responds 409 with the conflicting seats.
 */
const checkSeatAvailability = async (req, res, next) => {
    const payload = res.locals.bookingPayload;
    if (!payload)
        return res.status(500).json({ error: 'server_error', message: 'missing booking payload' });
    // convert showTime to Date for DB comparison
    const showDate = new Date(payload.showTime);
    if (Number.isNaN(showDate.getTime())) {
        return res.status(400).json({ error: 'invalid_show_time', message: 'showTime must be a valid date' });
    }
    try {
        const rows = await db_1.db
            .select()
            .from(schema_1.movieBookRoundTable)
            .where((0, drizzle_orm_1.eq)(schema_1.movieBookRoundTable.movieTitle, payload.movieTitle), (0, drizzle_orm_1.eq)(schema_1.movieBookRoundTable.showTime, showDate));
        // collect already-taken seats
        const taken = new Set();
        for (const r of rows) {
            try {
                const seats = JSON.parse(r.seatNumbers);
                if (Array.isArray(seats)) {
                    for (const s of seats)
                        taken.add(String(s));
                }
            }
            catch {
                // ignore parse errors; fallback to treating stored value as single seat string
                if (typeof r.seatNumbers === 'string')
                    taken.add(r.seatNumbers);
            }
        }
        const conflicts = payload.seatNumbers.filter(s => taken.has(s));
        if (conflicts.length > 0) {
            return res.status(409).json({
                error: 'seats_unavailable',
                message: 'Some requested seats are already booked',
                seats: conflicts,
            });
        }
        return next();
    }
    catch (err) {
        console.error('checkSeatAvailability error:', err);
        return res.status(500).json({ error: 'server_error' });
    }
};
exports.checkSeatAvailability = checkSeatAvailability;
/**
 * Export a composed middleware chain you can use on the booking route.
 * Example usage in routes:
 * router.post('/book', authenticationMiddleware, requireAuth, ...bookingMiddleware, bookMovieHandler)
 */
exports.bookingMiddleware = [exports.validateCreateBooking, exports.ensureSeatsCountMatches, exports.checkSeatAvailability];
//# sourceMappingURL=booking-middleware.js.map