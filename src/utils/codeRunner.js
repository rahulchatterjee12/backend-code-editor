const { exec, spawn, execFile } = require("child_process");
const fs = require("fs");

const codeRunner = async (code, input, lang, res) => {
  if (lang === "python") {
    // Compile Python code
    fs.writeFile("src/temp/main.py", code, (err) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
    });
    const child = spawn("python3", ["src/temp/main.py"]);
    child.stdin.write(input);
    child.stdin.end();
    child.stdout.on("data", (data) => {
      res.status(200).json(data.toString());
      // delete code files
      fs.unlink("src/temp/main.cpp", (error) => {
        if (error) {
          res.status(400).json({ error: error });
        } else {
          console.log("File main.cpp deleted successfully");
        }
      });
    });
  } else if (lang === "javascript") {
    // Compile Java Script code
    fs.writeFile("src/temp/main.js", code, (err) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
    });
    const child = execFile(
      "node",
      ["src/temp/main.js"],
      (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          res.status(400).json(error);
        }
        if (stderr) {
          res.status(400).json(stderr);
        }
        res.status(200).json(stdout);
        fs.unlink("src/temp/main.js", (err) => {
          if (err) {
          } else {
            console.log("File main.js deleted successfully");
          }
        });
      }
    );
  } else if (lang === "cpp") {
    // Compile C++ code
    fs.writeFile("src/temp/main.cpp", code, (err) => {
      if (err) {
        res.status(400).json(err);
        return;
      }
      console.log(`File main.cpp created successfully.`);
    });

    exec("g++ src/temp/main.cpp", (error, stdout, stderr) => {
      if (error) {
        res.status(400).json(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        res.status(400).json(`stderr: ${stderr}`);
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
};

module.exports = codeRunner;
