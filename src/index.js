/** file: index.js
 * 
 * author: Matthew Hyland
 * desc: 
 * 
 */

const { execSync } = require("child_process");

import { checkHelp } from "./helper";
import { GetArgsAndValidate } from "./getArgs";
function BranchEnforce() {}

function getCurrentBranch(){

}

function getAllCommitsOnBranch(destinationBranch) {

  const command = " git cherry -v develop";
   let vars  = execSync(command);
   console.log(vars.toString());
}


async function main() {
  process.exitCode = 0; // initalize exit code
  checkHelp();

  args = GetArgsAndValidate(process.argv);
  console.log(args);

  getAllCommitsOnBranch("develop")
}

main();