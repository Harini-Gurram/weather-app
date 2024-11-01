import React, { useEffect, useState } from "react";
import {
  WiDaySunny,
  WiDayCloudy,
  WiDayRain,
  WiDayShowers,
  WiFog,
  WiHumidity,
  WiStrongWind,
  WiUmbrella,
} from "weather-icons-react";
import "./style.css";

const api = {
  key: "41031a75add0c9e558b6a45dfc4db55d",
  base: "https://api.openweathermap.org/data/2.5/",
};
function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: "/Images/clouds.jfif",
  });
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const handleClick = () => {
    fetch(`${api.base}weather?q=${name}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && name !== "") {
      // setSearching(true);
      handleClick();
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="inp">
          <input
            type="search"
            placeholder="Enter city name"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        {typeof data.main !== "undefined" ? (
          <div className="winfo">
            <br></br>
            <h3>{data.name}</h3>

            {data.weather[0].main === "Clouds" ? (
              <WiDayCloudy size={150} color={"white"} />
            ) : data.weather[0].main === "Clear" ? (
              <WiDaySunny size={150} color={"white"} />
            ) : data.weather[0].main === "Rain" ? (
              <WiDayRain size={150} color={"white"} />
            ) : data.weather[0].main === "Mist" || "Fog" ? (
              <WiFog size={150} color={"white"} />
            ) : data.weather[0].main === "Haze" ? (
              <WiDayShowers size={150} color={"white"} />
            ) : (
              ""
            )}

            <br></br>
            <br></br>
            <h2>{Math.round(data.main.temp)}°C</h2>
            <p>{data.weather[0].description}</p>
            <div className="details">
              <div className="col">
                <WiHumidity size={80} color={"white"} />
                <div className="humidity">
                  <p>{Math.round(data.main.humidity)}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <WiStrongWind size={80} />
                <div className="wind">
                  <p>{Math.round(data.wind.speed)}km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="winfo">
            <br></br>
            <h3>{name || " "}</h3>
            <WiUmbrella size={150} color={"white"} />
            <br></br>
            <br></br>
            <h2>---------------</h2>
            <p>Please enter proper city name</p>
            <div className="details">
              <div className="col">
                <WiHumidity
                  size={80}
                  color={"white"}
                  style={{ opacity: "0" }}
                />
                <div className="humidity" style={{ opacity: "0" }}>
                  <p>%</p>
                  <p>Humidity</p>
                </div>
              </div>
              {/* <div className="col">
                  <WiStrongWind size={80} />
                  <div className="wind">
                
                    <p>Wind</p>
                  </div>
                </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
