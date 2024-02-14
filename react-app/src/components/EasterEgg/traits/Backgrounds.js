import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBackground } from "../../../store/traits";
import "./traits.css";
import Concrete from "../../assets/Background/Concrete.png";
import Lavender from "../../assets/Background/Lavender.png";
import Mint from "../../assets/Background/Mint.png";
import OrangeCream from "../../assets/Background/OrangeCream.png";
import Peach from "../../assets/Background/Peach.png";
import Sky from "../../assets/Background/Sky.png";

function Backgrounds() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  //Image mapping
  const backgrounds = [
    { image: Concrete, name: "Concrete" },
    { image: Lavender, name: "Lavender" },
    { image: Mint, name: "Mint" },
    { image: OrangeCream, name: "Orange" },
    { image: Peach, name: "Peach" },
    { image: Sky, name: "Sky" },
    // Add more as needed
  ];

  return (
    <div>
      <h2 className='traitName' onClick={() => setIsVisible(!isVisible)}>
        Backgrounds
      </h2>
      {isVisible && (
        <div className='Container'>
          {backgrounds.map((bg, index) => (
            <div className="trait-div">
              <img
                key={index}
                src={bg.image}
                alt={`${bg.name} thumbnail`}
                className='Thumbnail'
                onClick={() => dispatch(setBackground({image: bg.image, name: bg.name}))}
              />
              <p className="accessory-name">{bg.name}</p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Backgrounds;
