const express = require("express");
const Code = require("../models/Code");

const { requireAuthentication } = require("../middlewares/authCheck");
const codeRunner = require("../utils/codeRunner");

const router = express.Router();

router.get("/", requireAuthentication, async (req, res, next) => {
  try {
    const userId = req.userId;
    const codes = await Code.find({ author: userId });
    res.status(200).json(codes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", requireAuthentication, async (req, res, next) => {
  try {
    const codeId = req.params.id;
    const code = await Code.findById(codeId);

    res.status(200).json(code);
  } catch (error) {
    next(error);
  }
});

router.get("/run", requireAuthentication, async (req, res, next) => {
  try {
    const { code, input, language } = req.body;

    output = codeRunner(code, input, language, res);
  } catch (error) {
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
    next(error);
  }
});

router.patch("/update", requireAuthentication, async (req, res, next) => {
  try {
    const { filename, code, codeId, language, input, output, expected_output } =
      req.body;

    const updatedCode = await Code.updateOne(
      { _id: codeId },
      {
        filename,
        code,
        language,
        input,
        output,
        expected_output,
      }
    );
    res.status(201).json(updatedCode);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
