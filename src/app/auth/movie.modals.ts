import { z } from 'zod'

/**
 * Payload for creating a movie booking.
 * - showTime: ISO string or timestamp
 * - seatNumbers: array of seat identifiers (e.g. ["A1","A2"]) — stored as JSON string in DB
 * - seatsCount must match seatNumbers.length (basic sanity check)
 * 
 * this project is for learning purpose,so how we will write production code to understand the flow
 */
export const createBookingSchema = z.object({
    movieTitle: z.string().min(1),
    showTime: z.string().refine(s => !Number.isNaN(Date.parse(s)), {
        message: 'showTime must be an ISO date string'
    }),
    seatNumbers: z.array(z.string()).min(1),
    seatsCount: z.number().int().min(1),
    priceCents: z.number().int().min(0),
})

export type CreateBookingPayload = z.infer<typeof createBookingSchema>