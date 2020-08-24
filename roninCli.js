const usage = require( './usage.js' )
const createCmd = require( './cmds/create' )

const commands = [ 
  '-h', 
  '--help', 
  'help', 

  'version' 
] 

const validCommands = [ 'create', ...commands ]

async function main() {
  if( process.argv.length < 3 ) {
    usage.printAndExit()
  }

  const command = process.argv[2]
  const args = process.argv.slice( 3, process.argv.length )

  if( !validCommands.includes( command ) ) {
    console.log( `ronin: '${command}' is not a ronin command.` )
    console.log( `See 'ronin --help'` )
    process.exit()
  }

  try {
    switch (command) {
      case 'create':
        await createCmd.run( args )
        break;
      
      case 'version':
        usage.printVersoinAndExit()
        break;

      case '-h': 
      case '--help':
      case 'help': 
      default:
        usage.printAndExit()
        break;
    }
  } catch( error ) {
    console.error( `ERROR: ${error.message}` )
  }

}

module.exports = main