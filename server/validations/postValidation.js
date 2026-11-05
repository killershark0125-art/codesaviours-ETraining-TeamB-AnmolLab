const generatePostSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

const validatePostData = (data) => {
    const errors = [];

    if (!data.title || typeof data.title !== "string" || data.title.trim().length < 3) {
        errors.push("Title must be at least 3 characters long");
    }

    if (!data.excerpt || typeof data.excerpt !== "string" || !data.excerpt.trim()) {
        errors.push("Excerpt is required");
    }

    if (!data.content || typeof data.content !== "string" || !data.content.trim()) {
        errors.push("Content is required");
    }

    if (
        data.coverImage !== undefined &&
        typeof data.coverImage !== "string"
    ) {
        errors.push("Cover image must be a string");
    }

    if (
        data.author !== undefined &&
        typeof data.author !== "string"
    ) {
        errors.push("Author must be a string");
    }

    if (
        data.isPublished !== undefined &&
        typeof data.isPublished !== "boolean"
    ) {
        errors.push("isPublished must be true or false");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {generatePostSlug,validatePostData};