const pegaArquivo = require('../index');

const arrayResult = [
    {
        FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
    }
]

describe('pegaArquivo::', () => {
    it('Deve retornar se é uma função', () => {
        expect(typeof pegaArquivo).toBe('function');
    })
    it('Deve retornar array com resultados', async () => {
        const resultado = await pegaArquivo('test/arquivos/texto1.md')
        expect(resultado).toEqual(arrayResult)
    })   
    it('Deve retornar mensagem "não há links"', async () => {
        const resultado = await pegaArquivo('test/arquivos/texto1_semlinks.md')
        expect(resultado).toBe('Não há links');
    })  
    it('Deve lançar um erro na falta de arquivo', () => {
        async function capturaErro() {
          await pegaArquivo('C:/Users/bianc/Desktop/Biblioteca/test/arquivos')
          expect(capturaErro).toThrowError(/não há arquivo no caminho/)
        }
    })
})


// //   it('deve lançar um erro na falta de arquivo', async () => {
//     await expect(pegaArquivo('C:/Users/bianc/Desktop/markdown/test/arquivos')).rejects.toThrow(/não há arquivo no caminho/)
//   })

// it('deve resolver a função com sucesso', async () => {
//     await expect(pegaArquivo('test/arquivos/texto1.md')).resolves.toEqual(arrayResult)
//   })

// resolves.toBe() - resolves.not.toBe()