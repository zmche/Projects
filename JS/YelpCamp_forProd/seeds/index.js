import mongoose from 'mongoose';

import { Campground } from "../models/campground.js"
import { cities } from './cities.js';
import { places, descriptors } from './seedHelpers.js'

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "63e4c36e599ca36762a894df",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Vero animi sed fugit minus nobis ipsa.Explicabo maxime quisquam earum placeat, adipisci consectetur nisi autem vel amet dolores ratione! Quas, amet.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dorz5dhl5/image/upload/v1675947558/cld-sample-2.jpg',
                    filename: 'YelpCamp/lprxyutpucoo1nr1yizc'
                }
            ]
        })
        await camp.save();
    }

};

seedDB().then(() => {
    mongoose.connection.close();
    console.log("DATA CREATED, CLOSING...")
})

