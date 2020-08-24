function stripBeginningDashes( arg ) {
  if( arg.startsWith( '--' ) ) {
    arg = arg.substring(2)
  }

  if( arg.startsWith( '-' ) ) {
    arg = arg.substring(1)
  }

  return arg
}

function parseArgs( optionDefinitions, args ) {
  let options = {}
  
  args.forEach( arg => {
    arg = stripBeginningDashes( arg )

    optionDefinitions.forEach( option => {
      if( arg === option.name || arg === option.alias ) {
        options[ option.name ] = true
      }  
    })
  })

  return options
}

module.exports = {
  parse: parseArgs
}