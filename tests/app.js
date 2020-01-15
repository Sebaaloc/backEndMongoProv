const fs = require('fs');
const path = require('path');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// __dirname obtains the current file path
const normalizedPath = path.join(__dirname, '.');

// Reads all the files within the root folder of the file
const includeFile = file => {
  if (fs.lstatSync(`${normalizedPath}/${file}`).isDirectory()) {
    fs.readdirSync(`${normalizedPath}/${file}`).forEach(inFile => {
      includeFile(`./${file}/${inFile}`);
    });
  } else {
    require(`./${file}`);
  }
};

/*
Reads and executes every file found in includeFile to be able to run all tests.
The test script will read this file and it will allow every test to be performed
*/
fs.readdirSync(normalizedPath).forEach(file => {
  includeFile(file);
});
