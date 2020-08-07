const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = 
  `mongodb+srv://admin-kirsi:${password}@cluster0.tfs18.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
  name: String, 
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: "Arto Hellas",
  number: "040-123456",
})

person.save().then(res => {
  console.log('person saved!')
  mongoose.connection.close()
})