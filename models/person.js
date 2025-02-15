const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

const phoneValidation = /^(?:\d{2,3})-\d{5,}$/

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: { 
        type: String,
        minlength: 8,
        required: [true, ''],
        validate: {
            validator: function(v) {
                return phoneValidation.test(v)
            },
            message: props => `${props.value} is not a valid phone number! The correct form is for example 09-1234556 or 040-22334455.`
        }
    }
    })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)