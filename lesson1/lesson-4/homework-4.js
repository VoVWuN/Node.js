
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import readline from "readline";
import inquirer from "inquirer";

const currentDirectory = process.cwd();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  crlfDelay: Infinity,
});

rl.question("please enter the path to the file: ", (filePath) => {
  // const readStream = fs.createReadStream(path.join(__dirname, filePath), {
  //   encoding: "utf8",
  // });

  const dirName = path.join(currentDirectory, filePath);

  getFiles(dirName);
});

rl.question("Enter search request: ", (searchRequest) => {
  getDataFromRequest(searchRequest);
});

const getDataFromRequest = (searchRequest) => {
  rl.on("line", (line) => {
    if (line.includes(searchRequest)) {
      colors.red(line);
    }
    console.log(line);
  });
};

// Ниже рабочий код 

const getFiles = (dirPath) => {
  return fsp
    .readdir(dirPath, { withFileTypes: true })
    .then((list) => {
      return inquirer.prompt([
        {
          name: "fileName",
          type: "list",
          message: "Choose file: ",
          choices: list,
        },
        {
          name: "searchRequest",
          type: "input",
          message: "Enter search request: ",
        },
      ]);
    })
    .then(async ({ fileName, searchRequest }) => {
      const fullPathToFile = path.join(dirPath, fileName);
      const src = await fsp.stat(fullPathToFile);
      if (!src.isFile()) {
        return getFiles(fullPathToFile);
      }

      const readStream = fs.createReadStream(
        path.join(fullPathToFile),
        "utf-8",
      );

      const rl = readline.createInterface({
        input: readStream,
        output: process.stdout,
        crlfDelay: Infinity,
        terminal: false,
      });

      rl.on("line", (line) => {
        if (line.includes(searchRequest)) {
          console.log(line);
        }
      });
    });
};

// readStream.on("data", (data) => process.stdin.on(data));

// rl.on("line", (line) => {
//   console.log(line);

//   // requests.forEach((ip) => {
//   //   const nameOfFile = `${ip}_request.log`;
//   //   const writeStream = fs.createWriteStream(nameOfFile, {
//   //     flags: "a",
//   //   });
//   //   if (line.includes(ip)) {
//   //     writeStream.write(line + "\n");
//   //   }
//   //   // rl.close();
//   // });
// });

rl.on("close", () => process.exit(0));