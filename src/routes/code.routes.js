const express = require("express");
const Code = require("../models/Code");
const User = require("../models/User");

const { requireAuthentication } = require("../middlewares/authCheck");
const CustomError = require("../config/errors/CustomError");

const router = express.Router();

router.get("/", requireAuthentication, async (req, res, next) => {
  try {
    const userId = req.userId;
    const codes = await Code.find({ author: userId });
    res.json(codes);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/create", requireAuthentication, async (req, res, next) => {
  try {
    const { filename, code, userId, language, input, output, expected_output } =
      req.body;

    const newCode = new Code({
      filename,
      code,
      author: userId,
      language,
      input,
      output,
      expected_output,
    });

    await newCode.save();
    res.status(201).json(newCode);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch("/update", requireAuthentication, async (req, res, next) => {
  try {
    const {
      filename,
      code,
      userId,
      codeId,
      language,
      input,
      output,
      expected_output,
    } = req.body;

    const updatedCode = await Code.updateOne(
      { id: codeId },
      {
        filename,
        code,
        author: userId,
        language,
        input,
        output,
        expected_output,
      },
      (err, user) => {
        if (err) return next(err);
      }
    );

    await updatedCode.save();
    res.status(201).json(updatedCode);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
