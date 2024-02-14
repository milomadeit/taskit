import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBodyType } from "../../../store/traits";
import "./traits.css";
import Basic1 from "../../assets/Body/Basic1.png";
import Basic2 from "../../assets/Body/Basic2.png";
import Bear from "../../assets/Body/Bear.png";
import Cat from "../../assets/Body/Cat.png";
import Cyclops from "../../assets/Body/Cyclops.png";
import Hellboy from "../../assets/Body/Hellboy.png";
import Monke from "../../assets/Body/Monke.png";
import Mutant from "../../assets/Body/Mutant.png";
import Reptile from "../../assets/Body/Reptile.png";
import Statue from "../../assets/Body/Statue.png";
import Zombie from "../../assets/Body/Zombie.png";

function BodyType() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const bodyTypes = [
    { image: Basic1, name: 'Basic Bod 1' },
    { image: Basic2, name: 'Basic Bod 2' },
    { image: Bear, name: 'Bear' },
    { image: Cat, name: 'Cat' },
    { image: Cyclops, name: 'Cyclops' },
    { image: Hellboy, name: 'Hellboy' },
    { image: Monke, name: 'Monke' },
    { image: Mutant, name: 'Mutant' },
    { image: Reptile, name: 'Reptile' },
    { image: Statue, name: 'Statue' },
    { image: Zombie, name: 'Zombie' },
  ];

  return (
    <div>
      <h2 className='traitName' onClick={() => setIsVisible(!isVisible)}>
        BodyTypes
      </h2>
      {isVisible && (
        <div className='Container'>
          {bodyTypes.map((bt, index) => (
            <div className="trait-div">
              <img
                key={index}
                src={bt.image}
                alt={`${bt.name} thumbnail`}
                className='Thumbnail'
                onClick={() => dispatch(setBodyType({image: bt.image, name: bt.name}))}
              />
              <p className="accessory-name">{bt.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BodyType;
