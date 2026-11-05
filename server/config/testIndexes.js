const Test = require("../models/test");

const createTestIndexes = async () => {
  await Test.collection.createIndex({
    name: "text",
    description: "text",
  });

  await Test.collection.createIndex({
    category: 1,
    isActive: 1,
  });

  await Test.collection.createIndex({
    isActive: 1,
    name: 1,
  });

  console.log("Test indexes created successfully");
};

module.exports = createTestIndexes;
