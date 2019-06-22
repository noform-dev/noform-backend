const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const PORT = 4000

const db = { asd: { asd: [] } }

const agregar = (key, name, item) => {
  if(!db[key]) {
    db[key] = {}
  }
  if(!db[key][name]) {
    db[key][name] = []
  }
  db[key][name].push(item)
}

const buscar = (key, name) => {
  if (db[key] && db[key][name]) {
    return db[key][name]
  } else {
    return []
  }
}

app.use(bodyParser.json())
app.use(cors())

app.get('/hola/:name', (req, res) => {
  const name = req.params.name
  res.status(200).send(`Hola ${name}`)
})

app.get('/submitions/:name', (req, res) => {
  const { name } = req.params
  const { authorization: key } = req.headers
  // ir a buscar a la base de datos
  // form has: name, lastname, email, phone, detail
  const result = buscar(key, name)

  //devolver
  res.status(200).send(result)
})

app.post('/submitions/:name', (req, res) => {
  const { name } = req.params
  const { authorization: key } = req.headers
  // recibir datos del body del request
  const item = req.body
  // guardar los datos en la base de datos
  agregar(key, name, item)
  // Enviar un OK
  res.status(200).send()
})

app.listen(PORT, () => {
  console.log(`Server is running, port: ${PORT}`)
})