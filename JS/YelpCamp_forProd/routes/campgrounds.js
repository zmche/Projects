
import express from 'express';
import { catchAsync } from '../utils/CatchAsync.js';
import { isLoggedIn, validateCampground, isAuthor } from '../middleware.js';
import { campgrounds } from '../controllers/campgrounds.js';
import { Cloudinary } from '../cloudinary/index.js';
import multer from 'multer';

const { storage } = Cloudinary;

const upload = multer({ storage });
const router = express.Router();


router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));


export const campgroundsRoutes = router;