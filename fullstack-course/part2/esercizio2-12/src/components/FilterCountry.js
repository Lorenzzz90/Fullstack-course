import React from 'react' 
import ShowCountry from './ShowCountry'


const FilterCountry = ({ countries, country, setCountry }) => {


    const handleClick = (e) => {
        e.preventDefault()
        setCountry(e.target.value)
    }
    
    const filterCountries = () => {
        return (
            countries.filter(obj => obj.name.toLowerCase().includes(country.toLowerCase()))
        )
    }
    
    if (filterCountries().length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if (filterCountries().length > 1) {
        return (
            <table>
                <tbody>
                    {filterCountries().map(obj => {
                    return(
                        <tr key={obj.name}>
                            <th>{obj.name}</th>
                            <th><button value={obj.name} onClick={handleClick}>show</button></th>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
           
        )
    }
    else if (filterCountries().length === 1) {
        return(
           <ShowCountry country={filterCountries()[0]} />
        )
    }
    else {
        return <div>No matches</div>
    }
          
}

export default FilterCountry