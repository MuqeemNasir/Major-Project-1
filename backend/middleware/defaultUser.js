    module.exports = function (req, res, next) {
        // If userId not attached by auth middleware,
        // fallback to your default ID for Vercel
        if (!req.userId) {
            req.userId = "692640588cfc3fdbd5d05e58"; 
        }
        next();
    };
