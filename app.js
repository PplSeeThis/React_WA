function App() {
    const [city, setCity] = React.useState('');
    const [weather, setWeather] = React.useState(null);
    const [error, setError] = React.useState('');

    // !!! IMPORTANT: Insert your API key from OpenWeatherMap here !!!
    const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

    const getWeather = async () => {
        if (!city) {
            setError('Please enter a city name.');
            return;
        }
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            
            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            setWeather(data);
            setError('');
        } catch (err) {
            setError('City not found or network error.');
            setWeather(null);
        }
    };

    return (
        <div className="weather-app">
            <h1>Weather</h1>
            <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter a city"
            />
            <button onClick={getWeather}>Get Weather</button>

            {error && <p style={{color: 'red'}}>{error}</p>}
            
            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <p>Temperature: {Math.round(weather.main.temp)}°C</p>
                    <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
                    <p>Description: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
