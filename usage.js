const version = '1.0.0'

let usage = `
Usage: ronin OPTIONS COMMAND

Command-line tool for Ronin.js framework

Commands:
  create    Create a starting application
  help      Display this screen
  version   Show Ronin CLI version info

Run 'ronin COMMAND --help' for more information on a command.`

function print() {
  console.log( usage )
}

function printAndExit( err ) {
  if( err ) console.error( err )

  console.log( usage )
  process.exit()
}

function getUsage() {
  return usages
}

function printVersoinAndExit() {
  console.log( `Ronin CLI version ${version}` )
}

module.exports = {
  print,
  printAndExit,
  printVersoinAndExit,
  getUsage
}