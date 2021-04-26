import React from 'react' 
import Weather from './Weather'
 
const ShowCountry = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div><b>Capital:</b> {country.capital}</div>
            <div><b>Population:</b> {country.population}</div>
                <h3>Languages</h3>
                <ul>
                    {country.languages.map(obj => <li key={obj.name}>{obj.name}</li>)}
                </ul>
            <img src={country.flag} alt={"The flag of " + country.name} height="150"></img>
            <Weather country={country} />
        </div>
    )
}

export default ShowCountry