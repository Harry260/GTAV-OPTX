import chalk from "chalk";
import boxen from "boxen";

const introText = `                                       )   (               )  
 (        *   )    (                ( /(   )\\ )  *   )  ( /(  
 )\\ )   ' )  /(    )\\      (   (    )\\()) (()/(' )  /(  )\\()) 
(()/(    ( )(_))((((_)(    )\\  )\\  ((_)\\   /(_))( )(_))((_)\  
 /(_))_ (_(_())  )\\ _ )\\  ((_)((_)   ((_) (_)) (_(_()) __((_) 
(_)) __||_   _|  (_)_\\(_) \\ \\ / /   / _ \\ | _ \\|_   _| \\ \\/ / 
  | (_ |  | |     / _ \\    \\ V /   | (_) ||  _/  | |    >  <  
   \\___|  |_|    /_/ \\_\\    \\_/     \\___/ |_|    |_|   /_/\\_\\`;

const caption = `Optimize/Boost your GTA V FPS according to your PC configuration!\nMade by ${chalk.blue(
  "Harry"
)} (https://github.com/Harry260)`;

console.log(chalk.green(introText));
console.log("\r\n");
console.log(boxen(caption), "\r\n");
