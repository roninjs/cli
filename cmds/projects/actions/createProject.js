const fs = require( 'fs' )
const fse = require( 'fs-extra' )
const fp = require( 'fs' ).promises
const path = require( 'path' )
const { exec } = require( 'child_process' )

const fsPromises = fs.promises

async function createProject( args ) {
  const wd = getWorkingDir( args )

  console.info( `creating project at: ${wd}` )
  //
  //  Server Template
  //
  const serverPath = `${wd}/server`
  await downloadServerTemplate( serverPath )
  await unzipServerTemplate( serverPath )
  await executeNpm( serverPath )
  //
  //  Frontend Template
  //
  const uiPath = `${wd}/ui`
  await downloadUITemplate( uiPath )
  await unzipUITemplate( uiPath )
  await executeNpm( uiPath )
  
  console.info( '\nDone.' )
  console.info( `\nRun the following command to start your server: \n\n  cd ${wd} \n  npm start\n` )
  
}

function getWorkingDir( args ) {
  if( !args || !args.length ) {
    throw new Error( 'Please enter a path where you want to create the project.' )
  }

  const wd = args[0]
  console.log( wd )
  if( !fs.existsSync( wd ) ) {
    if( !fs.mkdirSync( wd, { recursive: true } ) ) {
      throw new Error( `unable to create ${wd}` )
    }
  }

  if( !fs.mkdirSync( `${wd}/server`, { recursive: true } ) ) {
    throw new Error( `unable to create ${wd}/server` )
  }

  if( !fs.mkdirSync( `${wd}/ui`, { recursive: true } ) ) {
    throw new Error( `unable to create ${wd}/ui` )
  }

  return wd
}

async function downloadServerTemplate( target ) {
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

async function downloadUITemplate( target ) {
  return new Promise( (resolve, reject) => {
    console.log( `downloading ui template...` )

    exec('curl -LJO https://github.com/roninjs/ui-template/archive/master.zip',{ cwd: target }, (error, stdout, stderr) => {
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

function unzipUITemplate( target ) {
  return new Promise( (resolve, reject) => {
    
    console.log( `unpacking template files...` )

    exec('unzip ui-template-master.zip && cp -r ui-template-master/ . && rm -R ui-template-master && rm -R ui-template-master.zip',{ cwd: target }, (error, stdout, stderr) => {
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

module.exports = createProject