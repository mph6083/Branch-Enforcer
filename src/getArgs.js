
export function GetArgsAndValidate(args) {
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
  