const fs = require("fs");
const cors = require("cors");
const express = require("express");
const PythonShell = require("python-shell").PythonShell;

const PORT = 80;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/python", (req, res) => {
  fs.writeFileSync("test.py", req.body.code);

  const testCases = {
    one: [1, 2, 3],
    two: [2, 2, 4],
    three: [2, -2, 0],
  };

  const promises = [];
  const testCaseResults = [];

  Object.keys(testCases).map((key) => {
    promises.push(
      new Promise((resolve, reject) => {
        PythonShell.run(
          "test.py",
          {
            mode: "text",
            pythonOptions: ["-u"],
            args: testCases[key],
          },
          function (err, results) {
            if (err) {
              reject();
              throw err;
            }
            console.log(results);
            testCaseResults.push(results[0]);
            resolve(true);
          }
        );
      })
    );
  });

  Promise.all(promises).then(() => {
    res.json({ testCaseResults });
  });
});
