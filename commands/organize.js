let fs = require("fs");
let path = require("path");
function organizeFn(dirPath) {
  let destPath;
  // console.log("Organize command implemented for ", dirPath);
  // 1.input-> directory path given
  if (dirPath == undefined) {
    // to make it global
    destPath = process.cwd();
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      //2. create -> organized_files-> directory
      destPath = path.join(dirPath, "organized_folder");
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
      }
    } else {
      console.log("kindly enter the path");
      return;
    }
  }
  organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
  //3. indentify categories of all the files present in that input directory
  // this only gives names not path
  let childNames = fs.readdirSync(src);
  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    // console.log(childNames[i]);
    if (isFile) {
      // console.log(childNames[i]);
      // console.log(childAddress);
      let category = getCategory(childNames[i]);
      // console.log(childNames[i], "belongs to ", category, " category");
      //4. copy/ cut files in that organized directory inside of any category folder
      sendFile(childAddress, dest, category);
    }
  }
}

function getCategory(name) {
  let ext = path.extname(name);
  // console.log(ext);
  // to remove dot
  ext = ext.slice(1);
  // console.log(ext);
  for (let type in types) {
    let cTypeArr = types[type];
    for (let i = 0; i < cTypeArr.length; i++) {
      if (ext == cTypeArr[i]) {
        return type;
      }
    }
  }
  return "others";
}

function sendFile(srcFilePath, dest, category) {
  // this will only make the path
  let categoryPath = path.join(dest, category);
  if (fs.existsSync(categoryPath) == false) {
    fs.mkdirSync(categoryPath);
  }
  // for copy make same name file
  let fileName = path.basename(srcFilePath);
  let destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(srcFilePath, destFilePath);
  fs.unlinkSync(srcFilePath);
  console.log(fileName, "is copied to ", category);
}

module.exports = {
  organizeKey: organizeFn,
};
