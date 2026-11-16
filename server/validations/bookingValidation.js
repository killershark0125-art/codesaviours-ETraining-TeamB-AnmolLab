
const mongoose = require("mongoose");

const validateBooking = (data) => {
    const {patientDetails,serviceType,branch,slot,tests,packages,homeCollection} = data;

    if (!patientDetails || typeof patientDetails !== "object") {
        return "Patient details are required";
    }

    const { fullName, phone, age, gender } = patientDetails;

    if (!fullName || !fullName.trim()) {
        return "Patient name is required";
    }

    if (!phone || !phone.trim()) {
        return "Patient phone number is required";
    }

    if (!Number.isInteger(age) || age < 0) {
        return "A valid patient age is required";
    }

    if (!["Male", "Female", "Other"].includes(gender)) {
        return "A valid gender is required";
    }

    if (!["Branch", "Home"].includes(serviceType)) {
        return "Service type must be Branch or Home";
    }

    if (serviceType === "Branch") {
        if (!branch || !mongoose.Types.ObjectId.isValid(branch)) {
            return "A valid branch ID is required";
        }
    }

    if (serviceType === "Home" && branch) {
        return "Home service must not have a branch ID";
    }

    if (!slot || !mongoose.Types.ObjectId.isValid(slot)) {
        return "A valid appointment slot ID is required";
    }

    if (
        (!Array.isArray(tests) || tests.length === 0) &&
        (!Array.isArray(packages) || packages.length === 0)
    ) {
        return "Select at least one test or package";
    }

    if (!Array.isArray(tests) || !Array.isArray(packages)) {
        return "Tests and packages must be arrays";
    }

    for (const testId of tests) {
        if (!mongoose.Types.ObjectId.isValid(testId)) {
            return "Invalid test ID";
        }
    }

    for (const packageId of packages) {
        if (!mongoose.Types.ObjectId.isValid(packageId)) {
            return "Invalid package ID";
        }
    }

    if (serviceType === "Home") {
        if (!homeCollection || typeof homeCollection !== "object") {
            return "Home collection details are required";
        }

        if (!homeCollection.address || !homeCollection.address.trim()) {
            return "Home collection address is required";
        }

       if (
    !homeCollection.area ||
    !mongoose.Types.ObjectId.isValid(homeCollection.area)
) {
    return "A valid home sampling area ID is required";
}
    }

    return null;
};

module.exports = validateBooking;
