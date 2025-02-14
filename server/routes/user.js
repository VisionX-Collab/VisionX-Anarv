const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/profile", async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not logged in" });

  const user = await User.findById(req.user.id);
  res.json(user);
});

module.exports = router;