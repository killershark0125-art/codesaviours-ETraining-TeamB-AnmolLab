const generateBranchSlug = (name) => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const validateBranchData = (data) => {
    const errors = [];

    if (
        !data.name ||
        typeof data.name !== "string" ||
        data.name.trim().length < 2
    ) {
        errors.push("Branch name must contain at least 2 characters");
    }

    if (!data.address || typeof data.address !== "string" || !data.address.trim()) {
        errors.push("Branch address is required");
    }

    if (!data.phone || typeof data.phone !== "string" || !data.phone.trim()) {
        errors.push("Branch phone number is required");
    }

    if (!data.timings || typeof data.timings !== "string" || !data.timings.trim()) {
        errors.push("Branch timings are required");
    }

    if (
        data.isActive !== undefined &&
        typeof data.isActive !== "boolean"
    ) {
        errors.push("isActive must be true or false");
    }

    return errors;
};

module.exports = {generateBranchSlug,validateBranchData};