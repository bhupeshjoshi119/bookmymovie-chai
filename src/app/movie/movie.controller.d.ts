import { Request, Response } from 'express';
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
export declare function bookMovieHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * Helper: simple controller to fetch bookings for authenticated user
 * GET /movie/my-bookings
 */
export declare function getMyBookingsHandler(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=movie.controller.d.ts.map