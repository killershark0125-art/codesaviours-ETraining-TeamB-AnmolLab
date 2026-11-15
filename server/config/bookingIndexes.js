
const Booking = require("../models/booking");

const createBookingIndexes = async () => {
    await Booking.collection.createIndex(
        { bookedBy: 1, createdAt: -1 },
        { name: "bookings_by_user_and_date" }
    );

    await Booking.collection.createIndex(
        { status: 1, createdAt: -1 },
        { name: "bookings_by_status_and_date" }
    );

    await Booking.collection.createIndex(
        { slot: 1 },
        { name: "bookings_by_slot" }
    );

    console.log("Booking indexes created successfully");
};

module.exports = createBookingIndexes;
