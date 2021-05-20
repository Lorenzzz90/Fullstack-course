import React, { useEffect, useState } from 'react'
import SearchFilter from './components/SearchFilter'
import PersonForm from './components/PersonForm'
import ShowNumbers from './components/ShowNumbers'
import personService from './services/Persons'
import Notification from './components/Notifications'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ isError, setError ] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      }
    , [])

  const addName = (event) => {
    event.preventDefault()
    const newObject = {name: newName, number: newNumber}
    const alreadyExistName = persons.find(obj => obj.name === newName)
    if (alreadyExistName) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        personService
          .updatePerson(alreadyExistName._id, newObject)
          .then(updatedPerson => setPersons(persons.map(person => person._id !== alreadyExistName._id ? person : updatedPerson)))
          .then(
            setMessage(`Updated ${newObject.name}`),
            setTimeout(() => {
              setMessage(null)
            }, 5000))
          .then(() => {
            setNewName("")
            setNewNumber("")
            console.log('qua')
          })
          .catch(error => {
            const strError = error.response.data.error
            setError(true)
            setMessage(strError)
            setTimeout(() => {
              setMessage(null)
              setError(false)
            }, 5000) 
          })
      }
    }
    else if (persons.find(obj => obj.number === newNumber)) {
      window.alert(`${newNumber} is already added to phonebook`)
    }
    else{
      personService
        .addPerson(newObject)
        .then(newPerson => setPersons(persons.concat(newPerson)))
        .then(
          setMessage(`Added ${newObject.name}`),
          setTimeout(() => {
            setMessage(null)
            setError(false)
          }, 5000)
          )
        .then(() => {
          setNewName("")
          setNewNumber("")
        })
        .catch(error => {
          const strError = error.response.data.error
          setError(true)
          setMessage(strError)
          setTimeout(() => {
            setMessage(null)
            setError(false)
          }, 5000) 
        })
        
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />

      <SearchFilter
        filter={filter}
        handler={handleFilter}
      />
      
      <h3>add a new</h3>

      <PersonForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numberss</h3>
        <ShowNumbers
          filter={filter} 
          persons={persons}
          setPersons={setPersons}
        />
    </div>
  )
}

export default App
