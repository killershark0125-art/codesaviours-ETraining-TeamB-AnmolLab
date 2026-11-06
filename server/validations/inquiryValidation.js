
const validateInquiryData = (data) => {
    const errors = {};

    if (
        !data.name ||
        typeof data.name !== "string" ||
        data.name.trim().length < 2
    ) {
        errors.name = "Name must be at least 2 characters long";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        !data.email ||
        typeof data.email !== "string" ||
        !emailRegex.test(data.email.trim())
    ) {
        errors.email = "Please provide a valid email address";
    }

    if (
        data.phone !== undefined &&
        typeof data.phone !== "string"
    ) {
        errors.phone = "Phone must be a string";
    }

    if (
        !data.subject ||
        typeof data.subject !== "string" ||
        data.subject.trim().length < 3
    ) {
        errors.subject = "Subject must be at least 3 characters long";
    }

    if (
        !data.message ||
        typeof data.message !== "string" ||
        data.message.trim().length < 10
    ) {
        errors.message = "Message must be at least 10 characters long";
    }
    
    const allowedStatuses = ["new", "in-progress", "resolved"];

    if (
        data.status !== undefined &&
        !allowedStatuses.includes(data.status)
    ) {
        errors.status = "Invalid inquiry status";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = { validateInquiryData };
