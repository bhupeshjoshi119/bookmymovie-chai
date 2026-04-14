import { z } from 'zod';
/**
 * Payload for creating a movie booking.
 * - showTime: ISO string or timestamp
 * - seatNumbers: array of seat identifiers (e.g. ["A1","A2"]) — stored as JSON string in DB
 * - seatsCount must match seatNumbers.length (basic sanity check)
 *
 * this project is for learning purpose,so how we will write production code to understand the flow
 */
export declare const createBookingSchema: z.ZodObject<{
    movieTitle: z.ZodString;
    showTime: z.ZodString;
    seatNumbers: z.ZodArray<z.ZodString>;
    seatsCount: z.ZodNumber;
    priceCents: z.ZodNumber;
}, z.core.$strip>;
export type CreateBookingPayload = z.infer<typeof createBookingSchema>;
//# sourceMappingURL=movie.modals.d.ts.map