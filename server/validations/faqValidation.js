
const validateFAQData = (data) => {
    const errors = {};

    if (!data.question || typeof data.question !== "string" || data.question.trim().length < 5) {
        errors.question = "Question must be at least 5 characters long";
    }

    if (!data.answer || typeof data.answer !== "string" || data.answer.trim().length < 2) {
        errors.answer = "Answer must be at least 2 characters long";
    }

    if (
        data.isActive !== undefined &&
        typeof data.isActive !== "boolean"
    ) {
        errors.isActive = "isActive must be true or false";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = { validateFAQData };
