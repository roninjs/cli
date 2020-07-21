const createProject = require( './actions/createProject' )

async function create( args ) {
  
  try {
    const result = await createProject( args )
  } catch( error ) {
    console.error( error )
  }
  
}

module.exports = {
  create
}