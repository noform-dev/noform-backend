const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = 4000

const db = [
  { id: 'qwhfuaos', name: 'Lucas', lastName: 'Prieto', detail: 'hola que tl sarasa' },
  { id: 'qwhfuaos', name: 'Leandro', lastName: 'sarasdasd', detail: 'hola que tl sarasa' },
  { id: 'qwhfuaos', name: 'Drope', lastName: 'sarasa2', detail: 'hola que tl sarasa' },
  { id: 'qwhfuaos', name: 'Miru', lastName: 'sarasa', detail: 'hola que tl sarasa' },
]

const agregar = item => db.push(item)
const buscar = () => db

app.use(bodyParser.json())

app.get('/hola/:name', (req, res) => {
  const name = req.params.name
  res.status(200).send(`Hola ${name}`)
})

app.get('/submitions/:id', (req, res) => {
  // ir a buscar a la base de datos
  // form has: name, lastname, email, phone, detail
  const result = buscar()

  //devolver
  res.status(200).send(result)
})

app.post('/submitions', (req, res) => {
  // recibir datos del body del request
  const item = req.body
  // guardar los datos en la base de datos
  agregar(item)
  // Enviar un OK
  res.status(200).send()
})

app.listen(PORT, () => {
  console.log(`Server is running, port: ${PORT}`)
})