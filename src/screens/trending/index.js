import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Trending() {
  const [trendingData, setTrendingData] = useState(null);

  useEffect(() => {
    APIKit.get("trending").then((response) => {
      setTrendingData(response.data);
    }).catch((error) => {
      console.error("Error fetching trending data:", error);
    });
  }, []);

  const navigate = useNavigate();

  const playTrack = (trackId) => {
    // You can implement the functionality to play the selected track here
    console.log("Playing track with ID:", trackId);
  };

  return (
    <div className="screen-container">
      <div className="trending-body">
        {trendingData?.map((item) => (
          <div className="trending-item" key={item.id}>
            <img
              src={item.imageUrl ? item.imageUrl : null}
              className="trending-image"
              alt="Trending-Art"
            />
            <p className="trending-title">{item.name}</p>
            <p className="trending-subtitle">{item.artist}</p>
            <div className="trending-fade" onClick={() => playTrack(item.id)}>
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
