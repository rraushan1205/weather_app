import { useEffect, useState } from "react";
import "./index.css";
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const handleSearch = () => {
    fetchWeatherData(city);
    setCity("");
  };
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Call the search function when Enter is pressed
    }
  };
  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e3587517dbe270ce96aebc60cf4b879a`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchWeatherData("Chandigarh");
  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  // define all data
  const weatherPanelInfo = [
    {
      name: "Humidity",
      val: weatherData.main.humidity,
      unit: "%",
      img: "https://weather-app-madza.netlify.app/_next/image?url=%2Ficons%2Fhumidity.png&w=128&q=75",
    },
    {
      name: "wind speed",
      val: weatherData.wind.speed,
      unit: "m/s",
      img: "https://weather-app-madza.netlify.app/_next/image?url=%2Ficons%2Fwind.png&w=128&q=75",
    },
    {
      name: "Wind direction",
      val: weatherData.wind.deg,
      unit: "deg",
      img: "https://weather-app-madza.netlify.app/_next/image?url=%2Ficons%2Fcompass.png&w=128&q=75",
    },
    {
      name: "Visibility",
      val: weatherData.visibility / 1000,
      unit: "Km",
      img: "https://weather-app-madza.netlify.app/_next/image?url=%2Ficons%2Fbinocular.png&w=128&q=75",
    },
    {
      name: "sunrise",
      val: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }
      ),
      unit: "",
      img: "https://weather-app-madza.netlify.app/_next/image?url=%2Ficons%2Fsunrise.png&w=128&q=75",
    },
    {
      name: "sunset",
      val: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      unit: "",
      img: "https://weather-app-madza.netlify.app/_next/image?url=%2Ficons%2Fsunset.png&w=128&q=75",
    },
  ];
  return (
    <>
      <div className="bg-slate-300 w-full h-full mx-0 my-0 px-10 py-8">
        <div className="bg-white rounded-[18px] flex shadow-lg shadow-indigo-500/40">
          <div className="flex flex-col items-center">
            <div className="font-bold text-[20px] varela px-10 pt-5">
              <span className=" ">{weatherData.name}</span>,
              <span className="font-semibold">{weatherData.sys.country}</span>
            </div>
            <div className="font-[600] text-black text-[16px] varela">
              {weatherData.weather[0].description}
            </div>
            <div className="w-[450px] h-[400px] px-10 py-5">
              <img
                src={
                  weatherData.weather[0].description === "clear sky"
                    ? "https://weather-app-madza.netlify.app/_next/image?url=%2Ficons%2F01n.svg&w=384&q=75"
                    : "https://weather-app-madza.netlify.app/_next/image?url=%2Ficons%2F09n.svg&w=384&q=75"
                }
                alt="weather icon"
              />
            </div>

            <div className="font-[600] text-[55px]">
              {weatherData.main.temp}°C
            </div>
            <div className="font-[500] text-[16px] pb-8">
              Feels Like {weatherData.main.feels_like} °C
            </div>
          </div>
          <div className="bg-[#d6d5d5ab] w-full rounded-[18px]">
            <header className="font-bold flex justify-between">
              <div className="px-5 py-5 text-[20px] flex flex-col">
                <span className="mx-3">
                  {new Date(weatherData.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </span>
                <span className="">
                  <span className="text-[10px] mr-2">Last Updated At: </span>
                  {new Date(weatherData.dt * 1000).toLocaleTimeString()}
                </span>
              </div>
              <div className="search px-5 py-5 ">
                <input
                  type="text"
                  value={city} // Bind input value to state
                  onChange={handleInputChange} // Update state on value change
                  onKeyDown={handleKeyDown} // Trigger callback on Enter key press
                  className="rounded text-[14px] placeholder:text-[14px] placeholder:px-5 font-[400] outline-none px-2 py-1"
                  placeholder="Search City.."
                />
              </div>
            </header>
            <div className="grid grid-cols-3 px-5 py-5 gap-5 justify-center">
              {weatherPanelInfo.map((info, index) => (
                <div
                  key={index}
                  className="weather-panel-item bg-white rounded-3xl px-5 py-5 "
                >
                  <h3 className="font-semibold text-[20px] flex justify-end">
                    {info.name}
                  </h3>
                  <div className="flex justify-between">
                    <img
                      className="aspect-[1/1]"
                      src={info.img}
                      alt={info.name}
                    />
                    <div className="font-semibold text-[18px] flex items-end flex-col">
                      <span className="font-bold">{info.val}</span> {info.unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
