"use strict";const fs=require("fs"),webpack=require("webpack");module.exports=function(e){const o=e.config,a=e.package,s=e.packagePath,n=e.packageBackend,r=process.argv[2];let c,t=a.version.split(".");if(n&&fs.existsSync(n)&&(c=JSON.parse(fs.readFileSync(n).toString())),["nova","evo","bug","test"].indexOf(r)<0)throw'Versao "'+r+'" nao encontrada';if("test"!=r){let e=parseInt(t[0]),o=parseInt(t[1]),i=parseInt(t[2]);switch(r){case"nova":e++,o=0,i=0;break;case"evo":default:o++,i=0;break;case"bug":i++}t=e+"."+o+"."+i,a.version=t,c&&(c.version=t,fs.writeFileSync(n,JSON.stringify(c,null,2),(function(e){e&&console.log("erro",e)}))),console.log("Package alterado para versão: "+t),fs.writeFileSync(s,JSON.stringify(a,null,2),(function(e){e&&console.log("erro",e)})),console.log("Gerando versao: "+t)}else console.log("Gerando versao de teste");webpack(o,(function(){console.log("Compactacao webpack finalizada")}))};