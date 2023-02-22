import express from 'express';
import { reviewSchema } from '../schemas.js';
import { catchAsync } from '../utils/CatchAsync.js';
import { ExpressError } from '../utils/ExpressError.js';
import { validateReview, isLoggedIn, isReviewAuthor } from '../middleware.js';

import { reviews } from '../controllers/reviews.js'

const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

export const reviewsRoutes = router;