const moment = require('moment')

const costumer = require('../controllers/atendimentos')
const connection = require('../infrastructure/conexão')

class Costumer {
    addCostumer(costumer, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(costumer.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dateIsValid = moment(data).isSameOrAfter(dataCriacao)
        const clientIsValid = costumer.cliente.length>=5

        const validations = [
            {
                nome: 'data',
                valido: dateIsValid,
                mensagem: 'data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clientIsValid,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const errors = validations.filter(field => !field.valido)
        const existErrors = errors.length

        if (existErrors) {
            res.status(400).json(errors)
        } else {

            const costumerDated = { ...costumer, dataCriacao, data }


            const sql = 'INSERT INTO Atendimentos SET ?'

            connection.query(sql, costumerDated, (error, results) => {
                if (error) {
                    res.status(400).json(error)
                } else {
                    res.status(201).json(costumer)
                }
            })

        }
    }

    list(res) {
        const sql = 'SELECT * FROM Atendimentos'

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results)
            }
        })
    }

    getId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        connection.query(sql, (error, results) => {
            const costumer = results[0]

            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(costumer)
            }
        })
    }

    updateCostumer(id, values, res){
        if(values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        connection.query(sql, [values, id], (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({...values, id})
            }
        })
    }

    deleteCostumer(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        connection.query(sql, id, (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Costumer