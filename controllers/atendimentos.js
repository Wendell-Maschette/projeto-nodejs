const Costumer = require('../models/atendimentos')

module.exports = app => {

    app.get('/atendimentos', (req, res) => {
        Costumer.list(res)
    })
    
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Costumer.getId(id, res)
    })

    app.post('/atendimentos', (req, res) => {
       const costumer = req.body

       Costumer.addCostumer(costumer, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body

        Costumer.updateCostumer(id, values, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Costumer.deleteCostumer(id, res)
    })
}