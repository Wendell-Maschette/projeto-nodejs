const customExpress = require('./config/customExpress')
const connection = require('./infrastructure/conexão')
const Tables = require('./infrastructure/tabelas')

connection.connect(error => {
    if (error) {
        console.log(error)
    } else {
        console.log('conectado com sucesso')

        Tables.init(connection)
        const app = customExpress()

        app.listen(3000, () => console.log('servidor rodando na porta 3000'))
    }
})



