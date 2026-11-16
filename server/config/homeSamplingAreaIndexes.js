const HomeSamplingArea = require("../models/homeSamplingArea");

const createHomeSamplingAreaIndexes = async () => {
    await HomeSamplingArea.collection.createIndex(
        { name: 1 },
        {
            unique: true,
            name: "name_1"
        }
    );

    console.log("Home sampling area indexes created successfully");
};

module.exports = createHomeSamplingAreaIndexes;