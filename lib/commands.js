import fs from "fs";
import chalk from "chalk";

var commands = {
  1: `-borderless
-FrameQueueLimit 0
-DX11`,
  2: `-noquanttransform
-borderless
-FrameQueueLimit 1
-DX11
-disableHyperthreading`,
  3: `-noquanttransform
-fullscreen
-FrameQueueLimit 1
-DX10
-cityDensity 0.3
-anisotropicQualityLevel 0
-grassQuality 0
-hdr
-lodScale 0.0
-noInGameDOF
-particalQuality 0
-pedLodBias 0.0
-postFX 0
-reflectionQuality 0
-shaderQuality 0
-vehicleLodBias 0.0`,
};

export default function writeCommandFile(gf, level, callback = console.log) {
  console.log("Set Game directory to: ", chalk.gray(gf), "\n");
  fs.writeFile(gf + "/commandline.txt", commands[level], function (err) {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
}
