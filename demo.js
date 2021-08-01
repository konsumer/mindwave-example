const inquirer = require('inquirer')
const Mindwave = require('mindwave')

const SerialPort = require('serialport')

async function getSerialPort () {
  const { port } = await inquirer.prompt([
    {
      name: 'port',
      type: 'list',
      message: 'What serial port is your mindwave headset on?',
      choices: (await SerialPort.list()).map(p => p.path)
    }
  ])
  return port
}

const mw = new Mindwave()

mw.on('eeg', (eeg) => {
  console.log('eeg', eeg)
})

mw.on('signal', (signal) => {
  console.log('signal', signal)
})

mw.on('attention', (attention) => {
  console.log('attention', attention)
})

mw.on('meditation', (meditation) => {
  console.log('meditation', meditation)
})

mw.on('blink', (blink) => {
  console.log('blink', blink)
})

getSerialPort().then(port => {
  mw.connect(port)
})
