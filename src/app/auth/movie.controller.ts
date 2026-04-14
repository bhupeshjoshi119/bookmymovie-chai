import { Request, Response } from 'express'
import {createBookingSchema} from './movie.modals'
import { db } from '../../db' 
import { movieBookRoundTable } from '../../db/schema'
import {eq, desc} from 'drizzle-orm'


/**
 * POST /movie/book
 * Requires authentication middleware to have set `req.user?.id` OR `res.locals.userId`.
 *
 * Basic flow:
 * - Validate payload with zod
 * - Ensure the request is authenticated and obtain user id
 * - Insert a booking row into the `movie` table (seatNumbers stored as JSON string)
 * - Return created booking (201)
 */
export async function bookMovieHandler(req: Request, res: Response) {
    // Validate body
    const parseResult = createBookingSchema.safeParse(req.body)
    if (!parseResult.success) {
        return res.status(400).json({ error: 'invalid_payload', details: parseResult.error.format() })
    }
    const payload = parseResult.data

    // Get authenticated user id (adapt to your auth middleware)
    const userId =
        // common places middleware stores it — adjust if your middleware uses other location
        (req as any).user?.id || (res.locals && (res.locals as any).userId)

    if (!userId) {
        return res.status(401).json({ error: 'unauthenticated', message: 'login required to book a movie' })
    }

    // Basic sanity: seatsCount should match seatNumbers length
    if (payload.seatsCount !== payload.seatNumbers.length) {
        return res.status(400).json({ error: 'seats_count_mismatch', message: 'seatsCount must equal the number of seatNumbers' })
    }

    try {
        const [inserted] = await db
            .insert(movieBookRoundTable)
            .values({
                userId,
                movieTitle: payload.movieTitle,
                showTime: new Date(payload.showTime),
                seatNumbers: JSON.stringify(payload.seatNumbers),
                seatsCount: payload.seatsCount,
                priceCents: payload.priceCents,
            })
            .returning() // returning the inserted row -- requires DB support (Postgres does)
        
        return res.status(201).json({ booking: inserted })
    } catch (err: any) {
        // Duplicate/constraint error or DB error handling — keep messages minimal for client
        console.error('movie booking error:', err)
        return res.status(500).json({ error: 'server_error', message: 'could not create booking' })
    }
}

/**
 * Helper: simple controller to fetch bookings for authenticated user
 * GET /movie/my-bookings
 */
export async function getMyBookingsHandler(req: Request, res: Response) {
    const userId = (req as any).user?.id || (res.locals && (res.locals as any).userId)
    if (!userId) return res.status(401).json({ error: 'unauthenticated' })

    try {
        const rows = await db
            .select()
            .from(movieBookRoundTable)
            .where(eq(movieBookRoundTable.userId, userId))
            .orderBy(desc(movieBookRoundTable.createdAt))

        // parse seatNumbers JSON for client convenience
        const bookings = rows.map(r => ({
            ...r,
            seatNumbers: (() => {
                try { return JSON.parse(r.seatNumbers) } catch { return r.seatNumbers }
            })(),
        }))

        return res.json({ bookings })
    } catch (err) {
        console.error('fetch bookings error:', err)
        return res.status(500).json({ error: 'server_error' })
    }
}