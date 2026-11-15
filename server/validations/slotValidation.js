const mongoose = require("mongoose");
const Branch = require("../models/branch");
const Slot = require("../models/slot");


const validateSlot = async (data) => {
    const {serviceType,branch,date,startTime,endTime,capacity} = data;

    if (!["Branch", "Home"].includes(serviceType)) {
        return "Service type must be Branch or Home";
    }

    if (serviceType === "Branch") {
        if (!branch || !mongoose.Types.ObjectId.isValid(branch)) {
            return "A valid branch ID is required for branch service";
        }

        const existingBranch = await Branch.findOne({
            _id: branch,
            isActive: true
        });

        if (!existingBranch) {
            return "Branch not found or inactive";
        }
    }

    if (serviceType === "Home" && branch) {
        return "Home service must not have a branch ID";
    }
    const slotDate = new Date(date);

    if (!date || Number.isNaN(slotDate.getTime())) {
        return "A valid slot date is required";
    }
    
const today = new Date();
today.setUTCHours(0, 0, 0, 0);

slotDate.setUTCHours(0, 0, 0, 0);

if (slotDate < today) {
    return "Slot date cannot be in the past";
}

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

   if (
    typeof startTime !== "string" ||
    typeof endTime !== "string" ||
    !timeRegex.test(startTime) ||
    !timeRegex.test(endTime)
) {
    return "Time must be in HH:mm format";
}

    if (endTime <= startTime) {
        return "End time must be later than start time";
    }

    if (!Number.isInteger(capacity) || capacity < 1) {
        return "Capacity must be a positive integer";
    }
    const existingSlot = await Slot.findOne({
    serviceType,
    branch: serviceType === "Branch" ? branch : null,
    date: slotDate,
    isActive: true,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime }
});

if (existingSlot) {
    return "This time overlaps with an existing active slot";
}
    return null;
};

module.exports = validateSlot;