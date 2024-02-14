import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAccessories } from "../../../store/traits";
import "./traits.css";
import BlueLasers from "../../assets/Accessories/BlueLasers.png";
import ChinStrap from "../../assets/Accessories/ChinStrap.png";
import DestroyerLasers from "../../assets/Accessories/DestroyerLasers.png";
import GalacticPuke from "../../assets/Accessories/GalacticPuke.png";
import GrandpasPipe from "../../assets/Accessories/GrandpasPipe.png";
import LongBeard from "../../assets/Accessories/LongBeard.png";
import MoustacheBeard from "../../assets/Accessories/MoustacheBeard.png";
import None from "../../assets/Accessories/None.png";
import RainbowPuke from "../../assets/Accessories/RainbowPuke.png";

function Accessories() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const accessoryType = [
    { image: None, name: 'None'},
    { image: BlueLasers, name: 'Blue Lasers'},
    { image: ChinStrap, name: 'Chin Strap'},
    { image: DestroyerLasers, name: 'Destroyer Lasers'},
    { image: GalacticPuke, name: 'Galactic Puke'},
    { image: GrandpasPipe, name: "Grandpa's Pipe"},
    { image: LongBeard, name: 'Long Beard'},
    { image: MoustacheBeard, name: 'Moustache Beard'},
    { image: RainbowPuke, name: 'Rainbow Puke'},
  ];

  return (
    <div>
      <h2 className='traitName' onClick={() => setIsVisible(!isVisible)}>
        Accessories
      </h2>
      {isVisible && (
        <div className='Container'>
          {accessoryType.map((accessory, index) => (
            <div className="trait-div">
              <img
                key={index}
                src={accessory.image}
                alt={`${accessory.name} thumbnail`}
                className='Thumbnail'
                onClick={() => dispatch(setAccessories({image: accessory.image, name: accessory.name}))}
              />
              <p className="accessory-name">{accessory.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Accessories;
