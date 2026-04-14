"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = authenticationMiddleware;
exports.restrictToAuthenticatedUser = restrictToAuthenticatedUser;
const token_1 = require("../auth/utils/token");
function authenticationMiddleware() {
    return function (req, res, next) {
        const header = req.headers['authorization'];
        // If there's no Authorization header, continue without authenticating.
        // Important: return here so we don't run the Bearer checks below.
        if (!header)
            return next();
        // Expect format: "Bearer <token>"
        if (!header?.startsWith('Bearer ')) {
            return res.status(400).json({ error: 'authorization header must start with "Bearer " followed by the token' });
        }
        const token = header.split(' ')[1];
        if (!token)
            return res.status(400).json({ error: 'authorization header must include a token after "Bearer"' });
        const user = (0, token_1.verifyUserToken)(token);
        // @ts-ignore
        req.user = user;
        return next();
    };
}
function restrictToAuthenticatedUser() {
    return function (req, res, next) {
        // @ts-ignore
        if (!req.user)
            return res.status(401).json({ error: 'Authentication Required' });
        return next();
    };
}
//# sourceMappingURL=auth-middleware.js.map