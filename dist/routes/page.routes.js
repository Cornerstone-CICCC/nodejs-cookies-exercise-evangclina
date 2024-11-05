"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const pageRouter = (0, express_1.Router)();
//in memory data base
let users = [
    { username: "admin", password: "admin12345" }
];
//routes
//home
pageRouter.get('/', (req, res) => {
    res.status(200).render("index");
});
//login
pageRouter.get('/login', (req, res) => {
    res.status(200).render('login');
});
pageRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    const found = users.find((user) => user.username === username && user.password === password);
    if (found) {
        res.cookie("authToken", "authenticated", {
            maxAge: 3 * 60 * 1000, //3 minutes
            httpOnly: true,
            signed: true
        });
        res.cookie("user_info", JSON.stringify({
            username: found.username
        }), {
            maxAge: 3 * 60 * 1000,
            httpOnly: true
        });
        res.redirect("/my-profile");
    }
    else {
        res.redirect("/login");
    }
});
//my profile 
pageRouter.get('/my-profile', auth_1.checkAuth, (req, res) => {
    const { username } = JSON.parse(req.cookies.user_info);
    res.status(200).render("my_profile", { username });
});
//logout 
pageRouter.get('/logout', (req, res) => {
    res.clearCookie("user_info");
    res.clearCookie('authToken');
    res.status(200).redirect("/");
});
//fallback
pageRouter.use((req, res) => {
    res.status(404).render("404");
});
exports.default = pageRouter;
