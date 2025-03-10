import { useState, useEffect } from "react";
import "../App.css";

const CountryList = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        />
        <div className="buttons">
          <button className="name">
            Name
          </button>
          <button className="capital">
            Capital
          </button>
          <button
            className="population"
        >
            Population
          </button>
        </div>
        </div>
        <div className="countries-wrapper">
            {countriesData.map((country) => (
                <div key={country.cca3} className="country">
                    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width='50'/>
                    <div>{country.name.common}</div>
                </div>
            ))
            }
        </div>
      </main>
    </div>
  );
};

export default CountryList;
