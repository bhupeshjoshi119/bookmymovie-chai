"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingSchema = void 0;
const zod_1 = require("zod");
/**
 * Payload for creating a movie booking.
 * - showTime: ISO string or timestamp
 * - seatNumbers: array of seat identifiers (e.g. ["A1","A2"]) — stored as JSON string in DB
 * - seatsCount must match seatNumbers.length (basic sanity check)
 *
 * this project is for learning purpose,so how we will write production code to understand the flow
 */
exports.createBookingSchema = zod_1.z.object({
    movieTitle: zod_1.z.string().min(1),
    showTime: zod_1.z.string().refine(s => !Number.isNaN(Date.parse(s)), {
        message: 'showTime must be an ISO date string'
    }),
    seatNumbers: zod_1.z.array(zod_1.z.string()).min(1),
    seatsCount: zod_1.z.number().int().min(1),
    priceCents: zod_1.z.number().int().min(0),
});
//# sourceMappingURL=movie.modals.js.map