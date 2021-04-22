import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FilterCountry from './components/FilterCountry'


function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  

  const handleChangeCountry = (effect) => {
    setCountry(effect.target.value)
  }

  return (
    <div>
      Find countries <input 
        value={country}
        onChange={handleChangeCountry}
      />
      <FilterCountry country={country} countries={countries} setCountry={setCountry}/>
    </div>
  )
}

export default App;
