/** file: index.js
 * 
 * author: Matthew Hyland
 * desc: 
 * 
 */

const { execSync } = require("child_process");
function BranchEnforce() {}

function getCurrentBranch(){
  const command = "git branch --show-current";
  const branch  = execSync(command);
  return branch.toString
}

function getAllCommitsOnBranch(destinationBranch) {

  const command = " git cherry -v develop";
   let vars  = execSync(command);
   console.log(vars.toString());
}


async function main() {
  process.exitCode = 0; // initalize exit code
  //checkHelp();
  //args = GetArgsAndValidate(process.argv);
  console.log(getCurrentBranch());
}

main();