const FAQ = require("../models/faq");
const Test = require("../models/test");
const Category = require("../models/category");
const Package = require("../models/package");
const Branch = require("../models/branch");

const getActiveFAQs = async () => {
    return await FAQ.find({ isActive: true })
        .select("question answer")
        .lean();
};

const searchTests = async (searchTerm) => {
    if (typeof searchTerm !== "string" || !searchTerm.trim()) {
        return [];
    }

    const escapedSearch = searchTerm.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

    return await Test.find({
        isActive: true,
        $or: [
            { name: { $regex: escapedSearch, $options: "i" } },
            { code: { $regex: escapedSearch, $options: "i" } }
        ]
    })
        .select(
            "name code description sampleType preparationInstructions turnaroundTime price priceStatus"
        )
        .populate("category", "name")
        .limit(10)
        .lean();
};


const getActivePackages = async () => {
    return await Package.find({ isActive: true })
        .select(
            "name slug description includedTests originalPrice packagePrice savings"
        )
        .populate({
            path: "includedTests",
            match: { isActive: true },
            select:
                "name code description sampleType preparationInstructions turnaroundTime price priceStatus"
        })
        .lean();
};

const getActiveBranches = async () => {
    return await Branch.find({ isActive: true })
        .select(
            "name slug address phone timings mapEmbedUrl directionsUrl"
        )
        .lean();
};

const getChatbotKnowledge = async (searchTerm = "") => {
    const [faqs,tests,packages,branches] = await Promise.all([
        getActiveFAQs(),
        searchTests(searchTerm),
        getActivePackages(),
        getActiveBranches()
    ]);

    return {faqs,tests,packages,branches};
};

module.exports = {getActiveFAQs,searchTests,getActivePackages,getActiveBranches,getChatbotKnowledge};