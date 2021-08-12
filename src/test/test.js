'use strict';
const fs = require('fs'),
  webpack = require('webpack')

module.exports = function (response) {
  const config = response.config;
  const pack = response.package;
  const packagePath = response.packagePath;
  const versionAction = process.argv[2];
  let test = pack.test.split('.');

  if (['nova', 'evo', 'bug'].indexOf(versionAction) < 0) {
    throw 'Versao "' + versionAction + '" nao encontrada';
  }

  let newVersion = parseInt(test[0]);
  let evoVersion = parseInt(test[1]);
  let bugVersion = parseInt(test[2]);

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
  test = newVersion + '.' + evoVersion + '.' + bugVersion;
  pack.test = test;

  console.log('Gerando versao teste: ' + test);

  fs.writeFile(packagePath, JSON.stringify(pack, null, 2), function (err) {
    if (err)
      console.log('erro', err);
  });

  webpack(config, function () {
    console.log('Compactacao webpack finalizada');
  });
}