const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = 
  `mongodb+srv://fullstack:${password}@cluster0.rw0y3.mongodb.net/phonebook-app?retryWrites=true&w=majority`
  
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
  name: String, 
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

//person.save().then(res => {
  const name = process.argv[3]
  if (!process.argv[3] && !process.argv[4]) {
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
  } else {
    person.save().then(res => {
      console.log(`added ${name} to phonebook`)
      mongoose.connection.close()
    })
  }
//})

