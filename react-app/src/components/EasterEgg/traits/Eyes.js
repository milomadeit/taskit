import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEyes } from "../../../store/traits";
import "./traits.css";
import ThreeDGlasses from "../../assets/Eyes+Eyewear/3DGlasses.png";
import BikerGoggles from "../../assets/Eyes+Eyewear/BikerGoggles.png";
import CyclopsEye from "../../assets/Eyes+Eyewear/CyclopsEye.png";
import EngineeringGoggles from "../../assets/Eyes+Eyewear/EngineeringGoggles.png";
import FashShadesWhite from "../../assets/Eyes+Eyewear/FashShadesWhite.png";
import FutureShades from "../../assets/Eyes+Eyewear/FutureShades.png";
import GalacticVision from "../../assets/Eyes+Eyewear/GalacticVision.png";
import HavanaShades from "../../assets/Eyes+Eyewear/HavanaShades.png";
import IdcShades from "../../assets/Eyes+Eyewear/IdcShades.png";
import MutantEyes from "../../assets/Eyes+Eyewear/MutantEyes.png";
import PowerUp from "../../assets/Eyes+Eyewear/PowerUp.png";
import SnowboardGoggles from "../../assets/Eyes+Eyewear/SnowboardGoggles.png";
import StonedClops from "../../assets/Eyes+Eyewear/StonedClops.png";
import StonerGlasses from "../../assets/Eyes+Eyewear/StonerGlasses.png";
import TechVisor from "../../assets/Eyes+Eyewear/TechVisor.png";
import Uncaring from "../../assets/Eyes+Eyewear/Uncaring.png";
import Undead from "../../assets/Eyes+Eyewear/Undead.png";

function Eyes() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const eyeTypes = [
    { image: ThreeDGlasses, name: '3D Glasses' },
    { image: BikerGoggles, name: 'Biker Goggles' },
    { image: CyclopsEye, name: 'Cyclops Eye' },
    { image: EngineeringGoggles, name: 'Engineer Goggles' },
    { image: FashShadesWhite, name: 'WT Fash Shades' },
    { image: FutureShades, name: 'Future Shades' },
    { image: GalacticVision, name: 'Galactic Vision' },
    { image: HavanaShades, name: 'Havana Shades' },
    { image: IdcShades, name: 'IDC Shades' },
    { image: MutantEyes, name: 'Mutant Eyes' },
    { image: PowerUp, name: 'Power Up' },
    { image: SnowboardGoggles, name: 'Snowboard Goggs' },
    { image: StonedClops, name: 'Stoned Clops' },
    { image: StonerGlasses, name: 'Stoner Glasses' },
    { image: TechVisor, name: 'Tech Visor' },
    { image: Uncaring, name: 'Uncaring' },
    { image: Undead, name: 'Undead' },
  ];

  return (
    <div>
      <h2 className='traitName' onClick={() => setIsVisible(!isVisible)}>
        Eyes+Eyewear
      </h2>
      {isVisible && (
        <div className='Container'>
          {eyeTypes.map((eyes, index) => (
            <div className="trait-div">
              <img
                key={index}
                src={eyes.image}
                alt={`${eyes.name} thumbnail`}
                className='Thumbnail'
                onClick={() => dispatch(setEyes({image: eyes.image, name: eyes.name}))}
              />
              <p className="accessory-name">{eyes.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Eyes;
