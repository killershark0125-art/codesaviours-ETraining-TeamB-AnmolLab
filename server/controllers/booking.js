const mongoose = require("mongoose");

const Booking = require("../models/booking");
const Slot = require("../models/slot");
const Branch = require("../models/branch");
const Test = require("../models/test");
const Package = require("../models/package");
const HomeSamplingArea = require("../models/homeSamplingArea");

const validateBooking = require("../validations/bookingValidation");

const responseHandler = require("../utils/responseHandler");
const { StatusCodes } = require("../consts/statusCode");


const createBooking = async (req, res) => {
    try {
        const validationError = validateBooking(req.body);

        if (validationError) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,validationError);
        }

        const bookedBy = req.user.id;

        if (!bookedBy) {
            return responseHandler(res,StatusCodes.UNAUTHORIZED,"User authentication is required");
        }

        const {patientDetails,serviceType,branch,slot,tests,packages,homeCollection} = req.body;

        const selectedSlot = await Slot.findOne({
            _id: slot,
            isActive: true
        });
        let selectedHomeArea = null;

if (serviceType === "Home") {
    selectedHomeArea = await HomeSamplingArea.findOne({
        _id: homeCollection.area,
        isActive: true
    });

    if (!selectedHomeArea) {
        return responseHandler(
            res,
            StatusCodes.BAD_REQUEST,
            "Selected home sampling area is invalid or unavailable"
        );
    }
}

        if (!selectedSlot) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Selected slot not found or inactive");
        }
        if (selectedSlot.serviceType !== serviceType) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Selected slot does not match the service type");
        }

        if ( serviceType === "Branch" && selectedSlot.branch?.toString() !== branch)
             {
             return responseHandler(res,StatusCodes.BAD_REQUEST,"Selected slot does not belong to this branch");
              }

        if (serviceType === "Home" && selectedSlot.branch) {
             return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid Home service slot");
             }
               if (serviceType === "Branch") {
                const existingBranch = await Branch.findOne({
                     _id: branch,
                      isActive: true
                  });

               if (!existingBranch) {
                     return responseHandler(res,StatusCodes.BAD_REQUEST,"Selected branch not found or inactive" );
                 }
               }

             const uniqueTestIds = [...new Set(tests.map(id => id.toString()))];

             const selectedTests = await Test.find({
                    _id: { $in: uniqueTestIds },
                    isActive: true,
                    priceStatus: "confirmed",
                    price: { $ne: null }
                  });

             if (selectedTests.length !== uniqueTestIds.length) {
                         return responseHandler(res,StatusCodes.BAD_REQUEST,"One or more selected tests are unavailable or have unconfirmed prices");
                   }
                   const uniquePackageIds = [
    ...new Set(packages.map(id => id.toString()))
];

const selectedPackages = await Package.find({
    _id: { $in: uniquePackageIds },
    isActive: true,
    packagePrice: { $ne: null }
}).populate(
    "includedTests",
    "name price priceStatus isActive"
);

if (selectedPackages.length !== uniquePackageIds.length) {
    return responseHandler(
        res,
        StatusCodes.BAD_REQUEST,
        "One or more selected packages are unavailable"
    );
}

const packageTestIds = new Set();

selectedPackages.forEach((pkg) => {
    pkg.includedTests.forEach((test) => {
        packageTestIds.add(test._id.toString());
    });
});

const additionalTests = selectedTests.filter(
    (test) => !packageTestIds.has(test._id.toString())
);
const testsTotal = additionalTests.reduce(
    (total, test) => total + test.price,
    0
);

const packagesTotal = selectedPackages.reduce(
    (total, pkg) => total + pkg.packagePrice,
    0
);
const testSnapshots = additionalTests.map((test) => ({
    test: test._id,
    name: test.name,
    price: test.price
}));

const packageSnapshots = selectedPackages.map((pkg) => ({
    package: pkg._id,
    name: pkg.name,
    price: pkg.packagePrice
}));

const homeSamplingCharge =
    serviceType === "Home" ? selectedHomeArea.extraCharge : 0;

const totalAmount = testsTotal + packagesTotal + homeSamplingCharge;

    const homeCollectionSnapshot =
    serviceType === "Home"
        ? {
            address: homeCollection.address.trim(),
            area: selectedHomeArea._id,
            areaName: selectedHomeArea.name,
            extraCharge: selectedHomeArea.extraCharge
        }
        : undefined;

        const bookingData = {
    bookedBy,
    patientDetails,
    serviceType,
    branch: serviceType === "Branch" ? branch : null,
    slot,
    homeCollection: homeCollectionSnapshot,
    tests: testSnapshots,
    packages: packageSnapshots,
    totalAmount,
    paymentMethod: "Cash",
    paymentStatus: "Pending"
};
let createdBooking = null;
let slotUnavailable = false;

const session = await mongoose.startSession();

try {
    await session.withTransaction(async () => {
        const reservedSlot = await Slot.findOneAndUpdate(
            {
                _id: slot,
                isActive: true,
                serviceType,
                branch: serviceType === "Branch" ? branch : null,
                $expr: {
                    $lt: ["$bookedCount", "$capacity"]
                }
            },
            {
                $inc: { bookedCount: 1 }
            },
            {
                new: true,
                session
            }
        );

        if (!reservedSlot) {
            slotUnavailable = true;
            return;
        }

        const [booking] = await Booking.create(
            [bookingData],
            { session }
        );

        createdBooking = booking;
    });
} finally {
    await session.endSession();
}

if (slotUnavailable) {
    return responseHandler(res,StatusCodes.CONFLICT,"This appointment slot is fully booked or unavailable");
}

return responseHandler(
    res,
    StatusCodes.INSERTED,
    "Booking created successfully",
    createdBooking
);
    } catch (error) {
        console.error("Create booking error:", error);

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Failed to create booking");
    }
};


module.exports = {createBooking};