require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')
const morgan = require('morgan')
const { response } = require('express')

const people = []

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
//app.use(morgan('tiny'))

morgan.token("json", (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(":method :url => :status :res[content-length] - :response-time ms :json"))

app.get('/info', (req, res) => {
  const reqTime = new Date()
  Person.find({}).then(people => {
    res.send(`<p>Phonebook has info for ${people.length} people</p><p>${reqTime}</p>`)
  })
})

app.get('/api/people', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

/*app.get('/api/people/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = people.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})*/

app.get('/api/people/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

/*app.delete('/api/people/:id', (req, res) => {
  const id = Number(req.params.id)
  people = people.filter(person => person.id !== id)

  res.status(204).end()
})*/

app.delete('/api/people/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(err => next(err))  
})

/*const generatedId = () => {
  const randomId = Math.floor(Math.random() * 1000000)
  return randomId
}*/

app.put('/api/people/:id', (req, res, next) => {
  const body = req.body
  const person = people.find(person => person.id === req.params.id)
  const changedPerson = { ...person, number: body.number}

  Person.findByIdAndUpdate(req.params.id, changedPerson)
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.post('/api/people', (req, res, next) => {
  const body = req.body
  const existing = people.find(person => person.name === body.name)

  /*if(!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  } else if (existing) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }*/

  const person = new Person({
    name: body.name,
    number: body.number,
    //id: generatedId()
  })
  //people = people.concat(person)

  person
  .save()
  .then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormattedPerson => {
    res.json(savedAndFormattedPerson)
  })
  .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ err: 'unknown endpoint' })
}

// handler or requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ err: 'malinformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ err: err.message })
  }
  next(err)
}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})