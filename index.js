const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
//app.use(morgan('tiny'))

morgan.token("json", (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(":method :url => :status :res[content-length] - :response-time ms :json"))

let persons = 
[
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  },
]

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.get('/info', (req, res) => {
  const numberOfPeople = persons.length
  console.log(numberOfPeople)
  const reqTime = new Date()
  res.send(`<p>Phonebook has info for ${numberOfPeople} persons</p><p>${reqTime}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const generatedId = () => {
  const randomId = Math.floor(Math.random() * 1000000)
  return randomId
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  const existing = persons.find(person => person.name === body.name)
  if(!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  } else if (existing) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generatedId()
  }
  persons = persons.concat(person)

  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})