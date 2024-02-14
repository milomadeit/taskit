import React from "react";
import MainImage from '../MainImage/MainImage'
import Backgrounds from "../traits/Backgrounds";
import BodyType from "../traits/Body";
import Eyes from "../traits/Eyes";
import HairHats from "../traits/Hair+Hats";
import Outfits from "../traits/Outfits";
import Accessories from "../traits/Accessories";
import "./index.css";

function EasterEgg() {
  return (
    <div className='main-div'>
      <div className='traitsMaster'>
        <section className='Sections'><Backgrounds /></section>
        <section className='Sections'><BodyType /></section>
        <section className='Sections'><Eyes /></section>
        <section className='Sections'><HairHats /></section>
        <section className='Sections'><Outfits /></section>
        <section className='Sections'><Accessories /></section>
      </div>

      <div className='mainImage'>
        <MainImage />
      </div>
    </div>
  );
}

export default EasterEgg;