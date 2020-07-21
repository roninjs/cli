const fs = require( 'fs' )
const fse = require( 'fs-extra' )
const path = require( 'path' )
const { exec } = require( 'child_process' )

const fsPromises = fs.promises

async function getWorkingDir( args ) {
  if( !args || !args.length ) {
    throw new Error( 'Please enter a path where you want to create the project.' )
  }

  return args[0]
}

async function copyProjectFiles( target ) {
  
  try {
    await fsPromises.access( target, fs.constants.F_OK )

  } catch( error ) {
    throw new Error( `The path does not exisit. '${target}'` )
  }

  return new Promise( (resolve, reject) => {
    console.log( `executeNpm: ${target}` )


    exec('curl -LJO https://github.com/roninjs/roninjs/archive/master.zip',{ cwd: target }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject( error )
      }

      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);

      return resolve()
    })
  })

  // try {
  //   const templatePath = path.join( __dirname, '../', '/templates' )

  //   await fse.copy( templatePath, target )

  // } catch (err) {
  //   console.error(err)
  // }

}

function executeNpm( target ) {
  return new Promise( (resolve, reject) => {
    console.log( `executeNpm: ${target}` )


    exec('npm install',{ cwd: target }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject( error )
      }

      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);

      return resolve()
    })
  })
}

async function createProject( args ) {
  const wd = await getWorkingDir( args )

  console.info( `creating project at: ${wd}` )

  await copyProjectFiles( wd )
  // await executeNpm( wd )
  console.log( 'here' )
  
}

module.exports = createProject