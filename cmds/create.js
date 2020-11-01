const fs = require( 'fs' )
const fse = require( 'fs-extra' )
const fp = require( 'fs' ).promises
const path = require( 'path' )
const { exec } = require( 'child_process' )
const argsUtil = require( './args-util' )

const fsPromises = fs.promises

const optionDefinitions = [
  { name: "noServer" },
  { name: "noUI" },
  { name: "help", alias: "h" } 
]

let usage = `
Usage: ronin create [OPTIONS] PATH

Create a Ronin.js application

Options:
      --noServer      Do not include a server project
      --noUI          Do not include an UI project
  -h, --help          Display this screen
`

function help() {
  console.log( usage )
  process.exit()
}

async function run( args ) {
  if( !args || args.length < 1 ) {
    return help()
  }

  const options = argsUtil.parse( optionDefinitions, args )
  if( options.help ) {
    return help()
  }

  if( args[ args.length-1 ].startsWith( '-' ) ) {
    console.error( '"ronin create" requires a PATH' )
    return help()
  }

  const wd = getWorkingDir( args[ args.length-1 ] )

  console.info( `creating project at: ${wd}` )
  //
  //  Server Template
  //
  if( !options.noServer ) {
    const serverPath = `${wd}/server`
    await downloadServerTemplate( serverPath )
    await unzipServerTemplate( serverPath )
    await executeNpm( serverPath )
  }
  //
  //  Frontend Template
  //
  if( !options.noUI ) {
    const uiPath = `${wd}/ui`
    await downloadUITemplate( uiPath )
    await unzipUITemplate( uiPath )
    await executeNpm( uiPath )
  }
  
  console.info( '\nDone.' )
  
}

function getWorkingDir( wd ) {
  if( !fs.existsSync( wd ) ) {
    if( !fs.mkdirSync( wd, { recursive: true } ) ) {
      throw new Error( `unable to create ${wd}` )
    }
  }

  return wd
}

async function downloadServerTemplate( target ) {
  return new Promise( (resolve, reject) => {
    console.log( `downloading template...` )

    if( !fs.mkdirSync( `${target}`, { recursive: true } ) ) {
      throw new Error( `unable to create ${target}` )
    }

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

    if( !fs.mkdirSync( `${target}`, { recursive: true } ) ) {
      throw new Error( `unable to create ${target}` )
    }

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

module.exports = {
  run
}