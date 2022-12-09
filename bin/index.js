#! /usr/bin/env node

import dialog from "node-file-dialog";
import chalk from "chalk";
import boxen from "boxen";

import {
  createSettings,
  createValues,
  setHPET,
  writeCommandFile,
} from "../lib/index.js";

import inquirer from "inquirer";
import "./intro.js";

const config = { type: "directory" };

var optimizationConfig = {
  opt: ["Settings", "Registry", "Disable HPET"],
  tier: 2,
  level: 1,
};
var gameFolder = "";
var procCount = false;
var procCountDone = 0;

inquirer
  .prompt([
    {
      type: "checkbox",
      name: "opt-list",
      message: "Check all the optimization you want to do right now",
      choices: ["Settings", "Registry", "Disable HPET"],
      checked: true,
    },
    {
      type: "rawlist",
      name: "pc-tier",
      message: "What's your PC configuration?",
      choices: ["Ultra-Low-End", "Low-End", "Mid-End", "High-End"],
    },
    {
      type: "rawlist",
      name: "config-level",
      message: "Which optimization would you use?",
      choices: [
        "Recomended for Most PCs",
        "Good PC but shutters",
        "Best FPS with low visual",
      ],
    },
  ])

  .then(
    (answers) => {
      var pc_tier = answers["pc-tier"];
      var pc_opt = answers["opt-list"];
      var pc_level = answers["config-level"];

      if (pc_opt.length) {
        optimizationConfig.opt = pc_opt;
      }

      if (pc_tier === "Low-End") {
        optimizationConfig.tier = 2;
      } else if (pc_tier === "Ultra-Low-End") {
        optimizationConfig.tier = 1;
      } else if (pc_tier === "High-End") {
        optimizationConfig.tier = 4;
      } else {
        optimizationConfig.tier = 3;
      }

      if (pc_level === "Good PC but shutters") {
        optimizationConfig.level = 2;
      } else if (pc_level === "Best FPS with low visual") {
        optimizationConfig.level = 3;
      } else {
        optimizationConfig.level = 1;
      }

      console.log(
        "\nNow, you have to choose your game directory to continue. Press any key to go on!"
      );

      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once("data", function () {
        dialog(config)
          .then(async (dir) => {
            gameFolder = dir[0];

            procCount = optimizationConfig.opt.length + 1;

            writeCommandFile(gameFolder, optimizationConfig.level, (t) => {
              logStatus(t, "Creating commndline file ");
            });

            if (optimizationConfig.opt.includes("Settings")) {
              createSettings(optimizationConfig.tier, (t) => {
                logStatus(t, "Editing Settings Configuration");
              });
            }
            if (optimizationConfig.opt.includes("Registry")) {
              await createValues(optimizationConfig, (t) => {
                logStatus(t, "Creating Registry Values");
              });
            }
            if (optimizationConfig.opt.includes("Disable HPET")) {
              setHPET((t) => {
                logStatus(t, "Disabling HPET");
              });
            }
          })
          .catch((err) => {
            console.log("No directory was selected! Aborting..");
            process.exit();
          });
      });
    },
    function (err) {
      console.log("we died! %s", err);
    }
  );

function logStatus(s, t) {
  procCountDone = procCountDone + 1;
  s ? (s = chalk.green("Success")) : chalk.red("Failed!");
  console.log(chalk.gray(procCountDone + "/" + procCount) + " " + t + ": " + s);
  checkProcCount();
}

function checkProcCount() {
  if (procCountDone === procCount) {
    console.log(
      "\n" +
        chalk.yellow(
          boxen(
            "If this really helped you, please consider buying me a coffee :) https://buymeacoffee.com/harrytom"
          )
        )
    );
    process.exit();
  }
}
