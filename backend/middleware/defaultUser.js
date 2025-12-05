module.exports = function (req, res, next) {

    // Try to capture any ID that appears after "/user/"
    const match = req.url.match(/\/user\/([^\/\?]+)/);

    if (match) {
        req.userId = match[1]; // Extracted from URL manually
    }

    // If still missing, insert your default user ID
    if (!req.userId) {
        req.userId = "692640588cfc3fdbd5d05e58";
    }

    next();
};
