const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

function extraiLinks(texto) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResultados = [];
  let temp;
  while ((temp = regex.exec(texto)) !== null) {
    arrayResultados.push({ [temp[1]]: temp[2] })
  }
  return arrayResultados.length === 0 ? 'Não há links' : arrayResultados;
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, 'Não há arquivo no caminho'));
}

async function pegaArquivo(caminhoDoArquivo) {
  const encoding = 'utf-8';
  try {
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
    return extraiLinks(texto);
  } catch(erro) {
    trataErro(erro);
  }
}

// function pegaArquivo(caminhoDoArquivo){
//   const encoding = 'utf-8';
//   fs.promises
//   .readFile(caminhoDoArquivo, encoding)
//   .then((texto) => console.log(texto)) //depois que lê o arquivo executa o que está no método then
//   .catch((erro) => trataErro(erro))
// }

// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = 'utf-8';
//   fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//     if(erro) {
//       trataErro(erro);
//     }
//     console.log(chalk.green(texto));
//   })
// }

// finally {
//   console.log(chalk.yellow('Operação Concluída'));
// }

//pegaArquivo('./arquivos/texto1.md');

// async function pegaArquivo(caminho) {
//   const caminhoAbsoluto = path.join("__dirname", '..', caminho);
//   const encoding = 'utf-8';
//   try {
//     const arquivos = await fs.promises.readdir(caminhoAbsoluto, { encoding });
//     const result = await Promise.all(arquivos.map(async (arquivo) => {
//       const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
//       const texto = await fs.promises.readFile(localArquivo, encoding);
//       return extraiLinks(texto);
//     }));
//     return result;
//   } catch (erro) {
//     return trataErro(erro);
//   }
//  }
// package.json "cli": "node cli.js ./arquivos"

module.exports = pegaArquivo;