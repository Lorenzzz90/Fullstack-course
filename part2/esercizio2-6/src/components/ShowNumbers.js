import React from 'react'
import personService from '../services/Persons'

const ShowNumbers = ({ filter, persons, setPersons }) => {
  const renderPerson = (person) => {
    return (
    <div key={person.name}>
      {person.name} {person.number} <button value={person._id} onClick={handleDeleteButton}>delete</button>
    </div>
    )}

  /*const handleDeleteButton = (e) => {
    const id = parseInt(e.target.value, 10)
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }*/

  const handleDeleteButton = (e) => {
    const personId = e.target.value
    const p = persons.find(x => x._id === personId)
    const result = window.confirm(`Delete ${p.name} ?`)
    if (result) {
      personService
      .deletePerson(personId)
      .then(() => {
        setPersons(persons.filter(p => p._id !== personId))
      })
    }
  }

    if (!filter) {
      return persons.map(renderPerson) 
    }
    else {
      const filteredPersons = persons.filter(obj => obj.name.toLowerCase().includes(filter.toLowerCase()))
      return filteredPersons.map(renderPerson) 
    }
  } 

export default ShowNumbers