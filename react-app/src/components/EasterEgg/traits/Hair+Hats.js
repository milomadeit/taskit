import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setHairHats } from "../../../store/traits"; 
import "./traits.css";
import BackwardsRainbowCap from "../../assets/Hair+Hats/BackwardsRainbowCap.png";
import BasicFedora from "../../assets/Hair+Hats/BasicFedora.png";
import BlueBeret from "../../assets/Hair+Hats/BlueBeret.png";
import BowlCut from "../../assets/Hair+Hats/BowlCut.png";
import BowlCutRed from "../../assets/Hair+Hats/BowlCutRed.png";
import CommonHat from "../../assets/Hair+Hats/CommonHat.png";
import CowboyHat from "../../assets/Hair+Hats/CowboyHat.png";
import Crown from "../../assets/Hair+Hats/Crown.png";
import FishingHat from "../../assets/Hair+Hats/FishingHat.png";
import FlameOn from "../../assets/Hair+Hats/FlameOn.png";
import FloatyHat from "../../assets/Hair+Hats/FloatyHat.png";
import GreenBeret from "../../assets/Hair+Hats/GreenBeret.png";
import GreenFro from "../../assets/Hair+Hats/GreenFro.png";
import GreenWave from "../../assets/Hair+Hats/GreenWave.png";
import Hardhat from "../../assets/Hair+Hats/Hardhat.png";
import Horn from "../../assets/Hair+Hats/Horn.png";
import JokinPurp from "../../assets/Hair+Hats/JokinPurp.png";
import LongBlonde from "../../assets/Hair+Hats/LongBlonde.png";
import NoHat from "../../assets/Hair+Hats/NoHat.png";
import OrangeFro from "../../assets/Hair+Hats/OrangeFro.png";
import PilotCap from "../../assets/Hair+Hats/PilotCap.png";
import PurpleShortHair from "../../assets/Hair+Hats/PurpleShortHair.png";
import RedCap from "../../assets/Hair+Hats/RedCap.png";
import RedXCap from "../../assets/Hair+Hats/RedXCap.png";
import Santa from "../../assets/Hair+Hats/Santa.png";
import SpinnerCap from "../../assets/Hair+Hats/SpinnerCap.png";
import TopHat from "../../assets/Hair+Hats/TopHat.png";
import Xcap from "../../assets/Hair+Hats/Xcap.png";

function HairHats() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const hairHatTypes = [
    { image: NoHat, name: 'None' },
    { image: BackwardsRainbowCap, name: 'Rainbow Cap' },
    { image: BasicFedora, name: 'Basic Fedora' },
    { image: BlueBeret, name: 'Blue Beret' },
    { image: BowlCut, name: 'Bowl Cut (Classic)' },
    { image: BowlCutRed, name: 'Bowl Cut (Red)' },
    { image: CommonHat, name: 'Common Hat' },
    { image: CowboyHat, name: 'Cowboy Hat' },
    { image: Crown, name: 'Crown' },
    { image: FishingHat, name: 'Fishing Hat' },
    { image: FlameOn, name: 'Flame On!' },
    { image: FloatyHat, name: 'Floaty Hat' },
    { image: GreenBeret, name: 'Green Beret' },
    { image: GreenFro, name: 'Green Fro' },
    { image: GreenWave, name: 'Green Wave' },
    { image: Hardhat, name: 'Hardhat' },
    { image: Horn, name: 'Horns' },
    { image: JokinPurp, name: 'Jokin Purp' },
    { image: LongBlonde, name: 'Long Blonde' },
    { image: OrangeFro, name: 'Orange Fro' },
    { image: PilotCap, name: 'Pilot Cap' },
    { image: PurpleShortHair, name: 'Purple Hair' },
    { image: RedCap, name: 'Red Ballcap' },
    { image: RedXCap, name: 'X Cap (Red)' },
    { image: Santa, name: 'Santa' },
    { image: SpinnerCap, name: 'Spinner' },
    { image: TopHat, name: 'Top Hat' },
    { image: Xcap, name: 'X Cap (Black)' },
  ];

  return (
    <div>
      <h2 className='traitName' onClick={() => setIsVisible(!isVisible)}>
        Hair+Hats
      </h2>
      {isVisible && (
        <div className='Container'>
        {hairHatTypes.map((hairHat, index) => (
         <div className="trait-div">
           <img
              key={index}
              src={hairHat.image}
              alt={`${hairHat.name} thumbnail`}
              className='Thumbnail'
              onClick={() => dispatch(setHairHats({image: hairHat.image, name: hairHat.name}))}
            />
            <p className="accessory-name">{hairHat.name}</p>
         </div>
        ))}
      </div>

      )}
    </div>

  );
}

export default HairHats;
