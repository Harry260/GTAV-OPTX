import { execSync } from "child_process";

export default function setHPET(callback = console.log) {
  try {
    execSync("bcdedit /deletevalue useplatformclock", {
      encoding: "utf-8",
    });
  } catch {
    callback(true);
  }
}
