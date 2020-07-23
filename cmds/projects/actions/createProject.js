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

async function downloadServerTemplate( target ) {
  
  try {
    await fsPromises.access( target, fs.constants.F_OK )

  } catch( error ) {
    throw new Error( `The path does not exisit. '${target}'` )
  }

  return new Promise( (resolve, reject) => {
    console.log( `downloading template...` )


    exec('curl -LJO https://github.com/roninjs/server-template/archive/master.zip',{ cwd: target }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject( error )
      }

      return resolve()
    })
  })

}

function unzipServerTemplate( target ) {
  return new Promise( (resolve, reject) => {
    
    console.log( `unpacking template files...` )

    exec('unzip server-template-master.zip && cp -r server-template-master/ . && rm -R server-template-master && rm -R server-template-master.zip',{ cwd: target }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject( error )
      }

      return resolve()
    })

  })
}

function executeNpm( target ) {
  return new Promise( (resolve, reject) => {
    console.log( `installing dependencies: ${target}` )


    exec('npm install',{ cwd: target }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject( error )
      }

      return resolve()
    })
  })
}

async function createProject( args ) {
  const wd = await getWorkingDir( args )

  console.info( `creating project at: ${wd}` )

  await downloadServerTemplate( wd )
  await unzipServerTemplate( wd )
  await executeNpm( wd )
  
  console.info( '\nDone.' )
  console.info( `\nRun the following command to start your server: \n\n  cd ${wd} \n  npm start\n` )
  
}

module.exports = createProject