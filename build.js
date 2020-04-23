'use strict';
const fs = require('fs'),
  webpack = require("webpack"),
  xml2js = require('xml2js'),
  parser = new xml2js.Parser(),
  xmlBuilder = new xml2js.Builder();

module.exports = function (response) {
  const config = response.config;
  const pomPath = response.pomPath;
  const pack = response.package;
  const packagePath = response.packagePath;

  fs.readFile(pomPath, function (_, data) {
    parser.parseString(data, function (_, parsedPom) {
      let version = parsedPom.project.version[0];
      let name = parsedPom.project.name[0];
      const versionAction = process.argv[2];

      if (['nova', 'evo', 'bug', 'test'].indexOf(versionAction) < 0) {
        throw 'Versao "' + versionAction + '" nao encontrada';
      }

      if (versionAction != 'test') {
        let versionSplit = version.split('.');
        let newVersion = parseInt(versionSplit[0]);
        let evoVersion = parseInt(versionSplit[1]);
        let bugVersion = parseInt(versionSplit[2]);

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
        parsedPom.project.version[0] = version;
        pack.version = version;
        pack.name = name;

        console.log('Gerando versao: ' + version);

        const xmlPom = xmlBuilder.buildObject(parsedPom);

        fs.writeFile(pomPath, xmlPom, function (err) {
          if (err)
            console.log('erro', err);
        });

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
    });
  });
}