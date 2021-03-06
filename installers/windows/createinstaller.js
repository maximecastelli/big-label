const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'big-label-win32-x64/'),
    authors: 'Maxime Castelli',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'big-label.exe',
    setupExe: 'big-label-installer.exe',
    setupIcon: path.join(rootPath, 'icon.ico')
  })
}
