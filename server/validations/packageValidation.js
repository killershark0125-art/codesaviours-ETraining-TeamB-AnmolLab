
const generatePackageSlug = (name) => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const validatePackageData = (data) => {
    const errors = [];

    if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
        errors.push("Package name must contain at least 2 characters");
    }

    if (!Array.isArray(data.includedTests) || data.includedTests.length === 0) {
        errors.push("At least one test must be included");
    }

    if (data.discountPercentage !== undefined) {
        const discount = Number(data.discountPercentage);

        if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
            errors.push("Discount percentage must be between 0 and 100");
        }
    }

    if (
        data.isActive !== undefined &&
        typeof data.isActive !== "boolean"
    ) {
        errors.push("isActive must be true or false");
    }

    return errors;
};

module.exports = {generatePackageSlug,validatePackageData};
