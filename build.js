"use strict";const fs=require("fs"),webpack=require("webpack");module.exports=function(e){const o=e.config,a=e.package,s=e.packagePath,n=process.argv[2];let r=a.version.split(".");if(["nova","evo","bug","test"].indexOf(n)<0)throw'Versao "'+n+'" nao encontrada';if("test"!=n){let e=parseInt(r[0]),o=parseInt(r[1]),t=parseInt(r[2]);switch(n){case"nova":e++,o=0,t=0;break;case"evo":default:o++,t=0;break;case"bug":t++}r=e+"."+o+"."+t,a.version=r,console.log("Package alterado para versão: "+r),fs.writeFileSync(s,JSON.stringify(a,null,2),(function(e){e&&console.log("erro",e)})),console.log("Gerando versao: "+r)}else console.log("Gerando versao de teste");webpack(o,(function(){console.log("Compactacao webpack finalizada")}))};