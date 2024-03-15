import dotenv from 'dotenv' // Load environment variables from .env file

import mongoose from 'mongoose';

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema for Person model
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

// Create Person model
const Person = mongoose.model('Person', personSchema);

// 1. Create and Save a Record of a Model
const createAndSavePerson = (done) => {
    const person = new Person({
      name: "John Doe",
      age: 30,
      favoriteFoods: ["Pizza", "Burger"]
    });
  
    person.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // 2. Create Many Records with model.create()
  const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // 3. Use model.find() to Search Your Database
  const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // 4. Use model.findOne() to Return a Single Matching Document from Your Database
  const findOnePersonByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // 5. Use model.findById() to Search Your Database By _id
  const findPersonById = (personId, done) => {
    Person.findById(personId, function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // 6. Perform Classic Updates by Running Find, Edit, then Save
  const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, function(err, person) {
      if (err) return console.error(err);
      person.favoriteFoods.push(foodToAdd);
      person.save(function(err, updatedPerson) {
        if (err) return console.error(err);
        done(null, updatedPerson);
      });
    });
  };
  
  // 7. Perform New Updates on a Document Using model.findOneAndUpdate()
  const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // 8. Delete One Document Using model.findByIdAndRemove
  const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // 9. MongoDB and Mongoose - Delete Many Documents with model.remove()
  const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({ name: nameToRemove }, function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // 10. Chain Search Query Helpers to Narrow Search Results
  const queryChain = (done) => {
    const foodToSearch = "burrito";
    Person.find({ favoriteFoods: foodToSearch })
          .sort('name')
          .limit(2)
          .select('-age')
          .exec(function(err, data) {
            if (err) return console.error(err);
            done(null, data);
          });
  };
  
  // Export functions for testing
  module.exports = {
    createAndSavePerson,
    createManyPeople,
    findPeopleByName,
    findOnePersonByFood,
    findPersonById,
    findEditThenSave,
    findAndUpdate,
    removeById,
    removeManyPeople,
    queryChain
  };
  