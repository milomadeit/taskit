import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOutfits } from "../../../store/traits";
import "./traits.css";
import AmongUHoodie from "../../assets/Outfits/AmongUHoodie.png";
import BlackSuit from "../../assets/Outfits/BlackSuit.png";
import BlueDenim from "../../assets/Outfits/BlueDenim.png";
import BlueJumpsuit from "../../assets/Outfits/BlueJumpsuit.png";
import FireTee from "../../assets/Outfits/FireTee.png";
import FroggySuit from "../../assets/Outfits/FroggySuit.png";
import IcyTee from "../../assets/Outfits/IcyTee.png";
import LongTrench from "../../assets/Outfits/LongTrench.png";
import LoveTank from "../../assets/Outfits/LoveTank.png";
import MorphSuit from "../../assets/Outfits/MorphSuit.png";
import NoOutfit from "../../assets/Outfits/NoOutfit.png";
import OrangeJacket from "../../assets/Outfits/OrangeJacket.png";
import Parka from "../../assets/Outfits/Parka.png";
import PinkJumpsuit from "../../assets/Outfits/PinkJumpsuit.png";
import PinkLoveHoodie from "../../assets/Outfits/PinkLoveHoodie.png";
import RacerSuitBlue from "../../assets/Outfits/RacerSuitBlue.png";
import Raptor from "../../assets/Outfits/Raptor.png";
import RedJumper from "../../assets/Outfits/RedJumper.png";
import RedRexSuit from "../../assets/Outfits/RedRexSuit.png";
import SkullHoodie from "../../assets/Outfits/SkullHoodie.png";
import Slatsuki from "../../assets/Outfits/Slatsuki.png";
import SummerTank from "../../assets/Outfits/SummerTank.png";
import TechHoodie from "../../assets/Outfits/TechHoodie.png";
import TechSuit from "../../assets/Outfits/TechSuit.png";
import WashedDenim from "../../assets/Outfits/WashedDenim.png";
import WhiteTux from "../../assets/Outfits/WhiteTux.png";

function Outfits() {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const outfitType = [
    { image: NoOutfit, name: 'None' },
    { image: AmongUHoodie, name: 'AmongU Hoodie' },
    { image: BlackSuit, name: 'Black Suit' },
    { image: BlueDenim, name: 'Blue Denim' },
    { image: BlueJumpsuit, name: 'Jumpsuit (White)' },
    { image: FireTee, name: 'Fire Tee' },
    { image: FroggySuit, name: 'RIBBIT Suit' },
    { image: IcyTee, name: 'Icy Tee' },
    { image: LongTrench, name: 'Long Trench' },
    { image: LoveTank, name: 'Love Tank' },
    { image: MorphSuit, name: 'Morph Suit' },
    { image: OrangeJacket, name: 'Orange Jacket' },
    { image: Parka, name: 'Parka' },
    { image: PinkJumpsuit, name: 'Jumpsuit (Pink)' },
    { image: PinkLoveHoodie, name: 'Love Hoodie' },
    { image: RacerSuitBlue, name: 'Racer Suit' },
    { image: Raptor, name: 'Raptor' },
    { image: RedJumper, name: 'Red Jumper' },
    { image: RedRexSuit, name: 'Red Rex' },
    { image: SkullHoodie, name: 'Skull Hoodie' },
    { image: Slatsuki, name: 'Slatsuki' },
    { image: SummerTank, name: 'Summer Tank' },
    { image: TechHoodie, name: 'Dev Hoodie' },
    { image: TechSuit, name: 'Tech Suit' },
    { image: WashedDenim, name: 'Washed Denim' },
    { image: WhiteTux, name: 'White Tux' },
  ];

  return (
    <div>
      <h2 className='traitName' onClick={() => setIsVisible(!isVisible)}>
        Outfits
      </h2>
      {isVisible && (
        <div className='Container'>
          {outfitType.map((outfit, index) => (
            <div className="trait-div">
              <img
                key={index}
                src={outfit.image}
                alt={`${outfit.name} thumbnail`}
                className='Thumbnail'
                onClick={() => dispatch(setOutfits({image: outfit.image, name: outfit.name}))}
              />
              <p className="accessory-name">{outfit.name}</p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Outfits;
