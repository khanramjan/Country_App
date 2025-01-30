import React, { useEffect, useState } from "react";
import Search from "./components/Search";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterdData, setFilterdData] = useState(data);

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw Error("Network response was not ok");
      }
      const result = await res.json();
      setData(result);
      setFilterdData(result);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData("https://restcountries.com/v3.1/all");
  }, []);
  const handleRemoveCountry = (name) => {
    const newData = filterdData.filter((country) => country.name.common !== name);
    setFilterdData(newData);
  }
 const handleSearch = (searchCountry) => {
    const newData = data.filter((country) => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()));
    setFilterdData(newData);
  }

  return (
    
    <div className="bg-gray-200 p-4 min-h-screen">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

        {/* Search Component */}
      <Search onSearch={handleSearch}/>

      {/* Grid Container */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {filterdData.map((country) => (
          <div
            key={country.cca3}
            className="bg-white p-3 rounded-md shadow-md flex flex-col items-center text-center"
            onClick={() => {
            
            }}
          >
            {/* Country Flag */}
            <img
              src={country.flags.png}
              alt={country.name.common}
              className="w-20 h-12 object-cover rounded border border-black"
            />
            
            {/* Country Info */}
            <h2 className="text-sm font-semibold mt-2">{country.name.common}</h2>
            <p className="text-xs">
              <strong>Capital:</strong> {country.capital ? country.capital.join(", ") : "N/A"}
            </p>
            <p className="text-xs">
              <strong>Region:</strong> {country.region}
            </p>
            <button className="text-xs border-solid bg-red-500 px-2 py-1 mt-1 rounded-md" onClick={()=>{
              handleRemoveCountry(country.name.common)
            }}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
