module.exports = function (req, res, next) {
    // Vercel does not keep user context, so always set default.
    req.userId = req.headers["x-user-id"] || "692640588cfc3fdbd5d05e58";
    next();
};
