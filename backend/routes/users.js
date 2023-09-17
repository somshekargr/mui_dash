const express = require("express");
const { getAll, getById } = require("../data/user");
const { checkAuth } = require("../util/auth");
const router = express.Router();

router.use(checkAuth);

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const users = await getAll();
    res.json({ users: users });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  console.log(req.token);
  try {
    const user = await getById(req.params.id);
    res.json({ user: user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
