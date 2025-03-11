import { useState, useEffect } from "react";
import "../App.css";

const CountryList = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({key: null, direction: 'ascending'});

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountriesData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCountryData();
  }, []);

//   Shorting function
const shortCountries = (key) => {
    let direction = 'ascending';
    if(sortConfig.key === key && sortConfig.direction === 'ascending'){
        direction = 'descending';
    }

    setSortConfig({key, direction});

    setCountriesData((prevData) => {
        const shortedData = [...prevData].sort((a, b) => {
          let comparison = 0;

          if (key === "name"){
            comparison = a.name.common.localeCompare(b.name.common);
          } else if (key === "population") {
            comparison = (a.population || 0) - (b.population || 0);
          } else if (key === "capital") {
            comparison = (a.capital?.[0] || "").localeCompare(b.capital?.[0] || "");
          }
          return direction === 'ascending' ? comparison : -comparison;
        })
        return shortedData;
    })

}

//   filter countries based on search queary..
  const filteredCountries = countriesData.filter(country => {
    const countryName = country.name.common.toLowerCase();
    const capitalName = (country.capital?.[0] || " ").toLowerCase();
    return (
        countryName.includes(searchQuery.toLowerCase()) ||
        capitalName.includes(searchQuery.toLocaleLowerCase())
    ); 
  })

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error:</div>;
  }

  return (
    <div>
      <header>
        <h1>World Countries Data</h1>
        <p className="subtitle">
          Currently, we have {countriesData.length} countries
        </p>
      </header>
      <main>
        <div className="control">
        <input
          type="text"
          placeholder="Search countries by name, city and languages"
          className="search-input" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="buttons">
          <button className="name" onClick={() => shortCountries("name")}>
            Name
          </button>
          <button className="capital" onClick={() => shortCountries("capital")}>
            Capital
          </button>
          <button
            className="population"
            onClick={() => shortCountries("population")}
        >
            Population
          </button>
        </div>
        </div>
        <div className="countries-wrapper">
            {filteredCountries.map((country) => (
                <div key={country.cca3} className="country">
                    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width='50'/>
                    <div className="country_name">{country.name.common}</div>
                    <div>Capital: {country.capital}</div>
                    <div>Population: {country.population}</div>
                </div>
            ))
            }
        </div>
      </main>
    </div>
  );
};

export default CountryList;
