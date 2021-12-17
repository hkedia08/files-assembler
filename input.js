#!/usr/bin/env node
// this tell the enviornment
//shebang syntax for node stack overflow
// agrv[0]- node
// argv[1]- main.js
let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");
let types = require("./utility");
let command = inputArr[0];

switch (command) {
  case "tree":
    treeObj.treeKey(inputArr[1]);
    break;
  case "organize":
    organizeObj.organizeKey(inputArr[1]);
    break;
  case "help":
    helpObj.helpKey();
    break;
  default:
    console.log("Please enter the correct command");
}
