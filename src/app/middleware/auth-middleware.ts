import type { Request, Response, NextFunction } from 'express'
import { verifyUserToken } from '../auth/utils/token'

export function authenticationMiddleware() {
    return function (req: Request, res: Response, next: NextFunction) {
        const header = req.headers['authorization']
        // If there's no Authorization header, continue without authenticating.
        // Important: return here so we don't run the Bearer checks below.
        if (!header) return next()

        // Expect format: "Bearer <token>"
        if (!header?.startsWith('Bearer ')) {
            return res.status(400).json({ error: 'authorization header must start with "Bearer " followed by the token' })
        }

        const token = header.split(' ')[1]

        if (!token) return res.status(400).json({ error: 'authorization header must include a token after "Bearer"' })

        const user = verifyUserToken(token)

        // @ts-ignore
        req.user = user

        return next()
    }
}

export function restrictToAuthenticatedUser() {
    return function (req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        if (!req.user) return res.status(401).json({ error: 'Authentication Required' })
        return next()
    }
}