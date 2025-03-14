import { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return alert("Masukkan nama kota!");

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/weather?city=${city}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setWeather(null);
      } else {
        setWeather(data);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Gagal mengambil data cuaca.");
    }

    setLoading(false);
  };

//   return (
//     <div>
//       <h1>Cek Cuaca</h1>
//       <input type="text" placeholder="Masukkan kota" value={city} onChange={(e) => setCity(e.target.value)} />
//       <button onClick={getWeather} disabled={loading}>
//         {loading ? "Loading..." : "Cek"}
//       </button>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {weather && (
//         <div>
//           <h2>Cuaca di {weather.city}</h2>
//           <p>Temperatur: {weather.temperature}°C</p>
//         </div>
//       )}
//     </div>
//   );
return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center text-black">
        <h1 className="text-2xl font-bold mb-4">Cek Cuaca</h1>
        <input
          type="text"
          placeholder="Masukkan kota"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          onClick={getWeather}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "mulai"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {weather && (
          <div className="mt-4 p-4 bg-blue-100 rounded-lg text-black">
            <h2 className="text-xl font-semibold">Cuaca di {weather.city}</h2>
            <p className="text-lg">Temperatur: {weather.temperature}°C</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;