import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import axios from "axios";
import "./App.css";

function App() {
  const [surfSpots, setSurfSpots] = useState([]);
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", // Replace with your API base URL
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });

  const fetchSurfSpots = async () => {
    try {
      const response = await axiosInstance.get("/spots");
      if (surfSpots.length === 0) {
        setSurfSpots(response.data);
        console.log(response.data);
        
      }
    } catch (error) {
      console.error("Error fetching surf spots:", error);
    }
  };

  fetchSurfSpots();
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
      </section>
      <h1>Current Surf Spots</h1>
      <div>
        {surfSpots.length > 0 ? (
          <ul>
            {surfSpots.map((spot, index) => (
              <li key={index}>{spot.name}</li>
            ))}
          </ul>
        ) : (
          <p>No surf spots available.</p>
        )}
      </div>
    </>
  );
}

export default App;
