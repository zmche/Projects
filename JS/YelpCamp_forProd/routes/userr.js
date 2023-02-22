import express from 'express';
import passport from 'passport';
import { catchAsync } from '../utils/CatchAsync.js';
import { ExpressError } from '../utils/ExpressError.js';
import { users } from '../controllers/users.js'

const router = express.Router({ mergeParams: true })

router.route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route("/login")
    .get(users.renderLogin)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login);

router.get('/logout', users.logout);

export const userRoutes = router;

