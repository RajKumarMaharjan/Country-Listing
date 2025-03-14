import React from 'react';

const ChartBar = ({ filteredCountries }) => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const randomCountries = shuffleArray([...filteredCountries]).slice(0, 15);

  return (
    <div className="chart-bar">
      {randomCountries.map((country) => {
        const maxPopulation = Math.max(...randomCountries.map(c => c.population || 0));
        const barWidth = (country.population / maxPopulation) * 100;

        return (
          <div key={country.cca3} className="population-bar-wrapper">
            <span className="country-label">{country.name.common}</span>
            <div className="population-bar-container">
              <div 
                className="population-bar"
                style={{
                  width: `${barWidth}%`,
                  backgroundColor: "orange",
                  height: "24px",
                  borderRadius: "5px"
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChartBar;