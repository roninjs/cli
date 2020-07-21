let usage = `usage: ronin [command] <options>`

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

module.exports = {
  print,
  printAndExit,
  getUsage
}