'use strict';
const fs = require('fs'),
  webpack = require('webpack')

module.exports = function (response) {
  const config = response.config;
  const pack = response.package;
  const packagePath = response.packagePath;
  const versionAction = process.argv[2];
  let version = pack.version.split('.');

  if (['nova', 'evo', 'bug', 'test'].indexOf(versionAction) < 0) {
    throw 'Versao "' + versionAction + '" nao encontrada';
  }

  if (versionAction != 'test') {
    let newVersion = parseInt(version[0]);
    let evoVersion = parseInt(version[1]);
    let bugVersion = parseInt(version[2]);

    switch (versionAction) {
      case 'nova':
        newVersion++;
        evoVersion = 0;
        bugVersion = 0;
        break;
      case 'evo':
      default:
        evoVersion++;
        bugVersion = 0;
        break;
      case 'bug':
        bugVersion++;
        break;
    }
    version = newVersion + '.' + evoVersion + '.' + bugVersion;
    pack.version = version;

    console.log('Gerando versao: ' + version);

    fs.writeFile(packagePath, JSON.stringify(pack, null, 2), function (err) {
      if (err)
        console.log('erro', err);
    });
  } else {
    console.log('Gerando versao de teste');
  }

  webpack(config, function () {
    console.log('Compactacao webpack finalizada');
  });
}