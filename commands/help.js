function HelpFn() {
  console.log(`List of All the commands:
  1. node input.js tree "directoryPath"
  2. node input.js organize "directoryPath"
  3. node input.js help`);
}

module.exports = {
  helpKey: HelpFn,
};
