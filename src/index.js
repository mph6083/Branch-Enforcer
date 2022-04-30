const { execSync } = require("child_process");
import { help } from "./help";

function BranchEnforce() {}


function isHelperFunction(args){
  //if requesting help
  if (
    args[2] == "-h" ||
    args[2] == "-help" ||
    args[2] == "--h" ||
    args[2] == "--help" ||
    args[2] == "-u" ||
    args[2] == "-usage" ||
    args[2] == "--u" ||
    args[2] == "--usage"
  ) {
    printHelpFunction();
    process.exit(0);
  }
}

function printHelpFunction() {
  console.log()

  console.log("\x1b[32m",
`
██████╗ ██████╗  █████╗ ███╗   ██╗ ██████╗██╗  ██╗    ███████╗███╗   ██╗███████╗ ██████╗ ██████╗  ██████╗███████╗██████╗ 
██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔════╝██║  ██║    ██╔════╝████╗  ██║██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗
██████╔╝██████╔╝███████║██╔██╗ ██║██║     ███████║    █████╗  ██╔██╗ ██║█████╗  ██║   ██║██████╔╝██║     █████╗  ██████╔╝
██╔══██╗██╔══██╗██╔══██║██║╚██╗██║██║     ██╔══██║    ██╔══╝  ██║╚██╗██║██╔══╝  ██║   ██║██╔══██╗██║     ██╔══╝  ██╔══██╗
██████╔╝██║  ██║██║  ██║██║ ╚████║╚██████╗██║  ██║    ███████╗██║ ╚████║██║     ╚██████╔╝██║  ██║╚██████╗███████╗██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═══╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝  ╚═╝`
  )
  console.log('\x1b[33m%s',"\t\t\t\tEnforcing Branch Destinations and Naming Conventions!" );
  console.log()
  console.log('\x1b[96m%s',"┌──────────────────┬────────────────────────────┬──────────────┐")
  console.log("│",'\x1b[35m',"   Command    ",'\x1b[96m',"│",'\x1b[35m',"       Description      ",'\x1b[96m',"│ ",'\x1b[35m',"necessity",'\x1b[96m',"│")
  console.log("├──────────────────┼────────────────────────────┼──────────────┤")
  console.log("│",'\x1b[33m',"--SourceBranch",'\x1b[96m',"│",'\x1b[37m',"  Branch being merged   ",'\x1b[96m',"│",'\x1b[91m'," Required ",'\x1b[96m',"│")
  console.log("├──────────────────┼────────────────────────────┼──────────────┤")
  console.log("│",'\x1b[33m',"--DestBranch",'\x1b[96m',"  │",'\x1b[37m',"Merge destination Branch",'\x1b[96m',"│",'\x1b[91m'," Required ",'\x1b[96m',"│")
  console.log("└──────────────────┴────────────────────────────┴──────────────┘")

}

function splitByEqual(argument) {
  const argumentSplitEqual = argument.split("=");
  if(argumentSplitEqual.length > 1){ //if in -(-)argument=value
    let argument = argumentSplitEqual[0];
    argumentSplitEqual.shift()
    let argumentData = argumentSplitEqual.join("=");
    return [true, argument,argumentData]
  }
  return [false, argument,undefined]
}

function GetArgsAndValidate(args) {
  isHelperFunction(args);

  const programArguments = {};
  for(let i = 2; i < args.length; i ++){
    let isFlag = false;

    let argument = args[i];
    let argumentData;

    if(argument[0] == '-' ){ // single dash format
      argument = argument.substring(1);
      if(argument[0] == '-'){ //double dash format (flag)
        argument = argument.substring(1);
        isFlag = true;
      }
      const argumentSplitEqual = argument.split("=");
      if(argumentSplitEqual.length > 1){ //if in -(-)argument=value
        argument = argumentSplitEqual[0];
        argumentSplitEqual.shift()
        argumentData = argumentSplitEqual.join("=");
      }
      // is an argument 
      else if(!isFlag){ // if a parameter grab the next argument
        argumentData = args[i + 1];
        i++;
      }
      else {
        argumentData = true;
      }

      if(programArguments.hasOwnProperty(argument) == true){
        process.exitCode = 1;
        console.error("ERROR: Argument " + argument + " is set more than once.");
      }
      if(argumentData == undefined){
        process.exitCode = 1;
        console.error("ERROR: Parameter " + argument + " has no inputed value.");
      }
      programArguments[argument] = argumentData;
    }
    else if(splitByEqual(argument)[0]){
      let nil;
      [nil,argument,argumentData] = splitByEqual(argument);
      if(programArguments.hasOwnProperty(argument) == true){
        process.exitCode = 1;
        console.error("ERROR: Argument " + argument + " is set more than once.");
      }
      programArguments[argument] = argumentData;
    }
    else {
      process.exitCode = 1;
      console.error("ERROR: Argument " + argument + " is not in the correct form (this may be becuase of a previous formatting error)");
    }
  }

  if(process.exitCode == 1){
    process.exit(process.exitCode)
  }

  return programArguments;

}
function getCurrentBranch(){

}

function getAllCommitsOnBranch(destinationBranch) {

  const command = " git cherry -v develop ";
   let vars  = execSync(command);
   console.log(vars.toString());
}
async function main() {
  process.exitCode = 0; // initalize exit code
  help();

  args = GetArgsAndValidate(process.argv);
  console.log(args);

  getAllCommitsOnBranch("develop")
}

main();