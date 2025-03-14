export default async function handler(req, res) {
    const city = req.query.city;
  
    try {
      const cityRes = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`);
      const cityData = await cityRes.json();
  
      const { lat, lon } = cityData[0];
  
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const weatherData = await weatherRes.json();
  
      res.status(200).json({
        city,
        temperature: weatherData.current_weather.temperature,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      res.status(500).json({ error: "Fail" });
    }
}