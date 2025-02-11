const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
require('dotenv').config()
const app = express()
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
const PORT = process.env.PORT

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
    const numberOfPersons = persons.length
    const requestTime = new Date()
    response.send(`
        <p>Phonebook has info for ${numberOfPersons} people</p>
        <p>${requestTime}</p>
        `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ error: "Name or number is missing "})
    }
    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ error: "This person is already added "})
    }
    const newId = Math.floor(Math.random() * 10000)
    const newPerson = {
        id: newId,
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newPerson)
    response.json(newPerson)
  })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})