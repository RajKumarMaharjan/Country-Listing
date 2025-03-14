import React from 'react';

const CountryCard = ({ filteredCountries }) => {

  return (
    <div className="countries-wrapper">
    {filteredCountries.map((country) => (
        <div key={country.cca3} className="country">
            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width='50'/>
            <div className="country_name">{country.name.common}</div>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population.toLocaleString()}</div>
            <div>Language: {country?.languages ? Object.values(country.languages).join(", ") : "N/A"}</div>
        </div>
    ))
    }
</div>
  );
};

export default CountryCard;