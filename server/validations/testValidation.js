
const generateTestSlug = (name) => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
};

const validateTestData = (data) => {
    const errors = [];

    if (typeof data.name !== "string" || !data.name.trim()) {
        errors.push("Test name is required");
    }

    if (!data.category) {
        errors.push("Test category is required");
    }

    if (
        data.price !== undefined &&
        data.price !== null &&
        (typeof data.price !== "number" || data.price < 0)
    ) {
        errors.push("Price must be a non-negative number");
    }

    if (
        data.priceStatus !== undefined &&
        !["pending", "confirmed"].includes(data.priceStatus)
    ) {
        errors.push("Price status must be pending or confirmed");
    }

    if (data.priceStatus === "confirmed" && data.price == null) {
        errors.push("A confirmed price must have a price value");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {generateTestSlug,validateTestData};
