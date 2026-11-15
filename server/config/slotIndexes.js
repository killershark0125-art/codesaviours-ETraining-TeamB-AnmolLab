const Slot = require("../models/slot");

const createSlotIndexes = async () => {
    await Slot.collection.createIndex(
        {
            serviceType: 1,
            branch: 1,
            date: 1,
            startTime: 1,
            endTime: 1
        },
        {
            unique: true,
            name: "unique_slot_per_service_branch_date_time"
        }
    );

    console.log("Slot indexes created successfully");
};

module.exports = createSlotIndexes;