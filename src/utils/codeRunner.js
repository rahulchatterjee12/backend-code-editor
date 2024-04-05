const { exec, spawn } = require("child_process");
const fs = require("fs");

const codeRunner = async (code, input, lang, res) => {
  if (lang === "python") {
    // Compile Python code
    command = `python3 -c "${code}"`;
    const child = exec(command);
    if (input !== "") {
      child.stdin.write(input);
      child.stdin.end();
    }
    child.stdout.on("data", (data) => {
      if (data) {
        res.status(200).json(data.toString());
        return;
      }
    });
  } else if (lang === "cpp") {
    // Compile C++ code
    fs.writeFile("src/temp/main.cpp", code, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`File main.cpp created successfully.`);
    });

    exec("g++ src/temp/main.cpp", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      const child = spawn("./a.out");
      child.stdin.write(input);
      child.stdin.end();
      child.stdout.on("data", (data) => {
        res.status(200).json(data.toString());
        // delete code files
        fs.unlink("src/temp/main.cpp", (error) => {
          if (error) {
          } else {
            console.log("File main.cpp deleted successfully");
          }
        });

        fs.unlink("a.out", (error) => {
          if (error) {
          } else {
            console.log("File a.out deleted successfully");
          }
        });
      });
    });
  } else if (lang === "c") {
    // Compile C code
    fs.writeFile("src/temp/main.c", code, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`File main.cpp created successfully.`);
    });

    exec("gcc src/temp/main.c", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      const child = spawn("./a.out");
      child.stdin.write(input);
      child.stdin.end();
      child.stdout.on("data", (data) => {
        res.status(200).json(data.toString());

        // delete code files
        fs.unlink("src/temp/main.c", (error) => {
          if (error) {
          } else {
            console.log("File main.c deleted successfully");
          }
        });

        fs.unlink("a.out", (error) => {
          if (error) {
          } else {
            console.log("File a.out deleted successfully");
          }
        });
      });
    });
  } else {
    return res.status(400).json({ error: "Invalid language specified" });
  }
  // return res.status(400).json({ error: "Something went wrong" });
};

module.exports = codeRunner;
