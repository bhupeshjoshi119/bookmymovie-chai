import express from 'express'
import type { Router } from 'express'

import AuthenticationController from './controller'
import { restrictToAuthenticatedUser } from '../middleware/auth-middleware'

import { bookMovieHandler, getMyBookingsHandler } from './movie.controller'





const authenticationController = new AuthenticationController()

export const authRouter: Router = express.Router()

authRouter.post('/sign-up', authenticationController.handleSignup.bind(authenticationController))
authRouter.post('/sign-in', authenticationController.handleSignin.bind(authenticationController))

authRouter.get('/me', restrictToAuthenticatedUser(), authenticationController.handleMe.bind(authenticationController))

authRouter.post('/movie/book', restrictToAuthenticatedUser(), bookMovieHandler)
authRouter.get('/movie/my-bookings', restrictToAuthenticatedUser(), getMyBookingsHandler)