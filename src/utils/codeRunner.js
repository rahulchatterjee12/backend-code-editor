const { exec } = require("child_process");

const codeRunner = (code, input, lang) => {
  let command;
  switch (lang) {
    case "python":
      command = `python3 -c "${code}"`;
      break;
    case "cpp":
      // Compile C++ code first
      command = `g++ -o temp/cpp_exec temp/cpp_exec.cpp && ./temp/cpp_exec`;
      break;
    case "c":
      // Compile C code first
      command = `gcc -o temp/c_exec temp/c_exec.c && ./temp/c_exec`;
      break;
    case "javascript":
      // For JavaScript, simply execute the code with Node.js
      command = `node -e "${code}"`;
      break;
    default:
      return res.status(400).json({ error: "Invalid language specified" });
  }

  let output;

  const child = exec(command);

  if (input) {
    child.stdin.write(input);
  }

  child.stdout.on("data", (data) => {
    if (data) {
      console.log(data);
      return data;
    }
  });

  child.stdout.on("error", (error) => {
    if (error) return error;
  });
};

module.exports = codeRunner;
