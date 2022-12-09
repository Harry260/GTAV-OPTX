import os, { type } from "os";
import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import settingsXml from "./settings-xml.js";

var config = {
  tier: 3,
  callback: console.log,
  filepath: "",
};

const options = {
  ignoreAttributes: false,
  format: true,
};

function createSettingsFile() {
  fs.readFile(config.filepath, "utf8", function (err, xmlDataStr) {
    if (err) {
      config.callback(false);
    }

    const parser = new XMLParser(options);
    let SettingObj = parser.parse(xmlDataStr);
    var videoCard = SettingObj.Settings.VideoCardDescription;

    let NewSettingsObj = parser.parse(settingsXml[config.tier]);
    NewSettingsObj.Settings.VideoCardDescription = videoCard;

    const builder = new XMLBuilder(options);
    const output = builder.build(NewSettingsObj);

    fs.writeFile(config.filepath, output, function (err) {
      if (err) {
        config.callback(false);
      } else {
        config.callback(true);
      }
    });
    fs.writeFile(config.filepath + ".backup.xml", xmlDataStr, () => {});
  });
}

function checkPath(path) {
  if (fs.existsSync(path)) {
    config.filepath = path;
    createSettingsFile();
  } else {
    console.log(
      chalk.red("Couldn't find the GTA V settings path."),
      `Type ${chalk.blue("A")} to abort or type the path to ${chalk.blue(
        "settings.xml"
      )} file`
    );

    AskPath();
  }
}

function AskPath() {
  inquirer
    .prompt([
      {
        type: "message",
        name: "path",
        message: `Path to ${chalk.blue("settings.xml")}: `,
      },
    ])
    .then((answers) => {
      if (answers.path.toLowerCase() === "a") {
        callback(false);
      } else {
        checkPath(answers.path);
      }
    });
}

export default function createSettings(tier = 3, callback = console.log) {
  var home = os.homedir();
  var path = home + "\\Documents\\Rockstar Games\\GTA V\\settings.xml";
  config.tier = tier;
  config.callback = callback;
  checkPath(path);
}
