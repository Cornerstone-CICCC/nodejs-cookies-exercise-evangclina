"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginAuth = exports.checkAuth = void 0;
// Check authentication for my account
const checkAuth = (req, res, next) => {
    const { authToken } = req.signedCookies;
    if (authToken === 'authenticated') {
        next();
    }
    else {
        res.redirect('/login');
    }
};
exports.checkAuth = checkAuth;
const checkLoginAuth = (req, res, next) => {
    const { authToken } = req.signedCookies;
    if (authToken === "authenticated") {
        res.redirect("/my-account");
    }
    else {
        next();
    }
};
exports.checkLoginAuth = checkLoginAuth;
