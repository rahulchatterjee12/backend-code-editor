const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    code: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    language: { type: String, require: true },
    input: { type: String, require: true },
    output: { type: String },
    expected_output: { type: String },
  },
  { timestamps: true }
);

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
