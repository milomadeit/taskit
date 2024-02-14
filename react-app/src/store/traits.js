import { createSlice } from "@reduxjs/toolkit";
import Lavender from "../components/assets/Background/Lavender.png";
import Cat from "../components/assets/Body/Cat.png";
import MutantEyes from "../components/assets/Eyes+Eyewear/MutantEyes.png";
import NoHat from "../components/assets/Hair+Hats/NoHat.png";
import NoOutfit from "../components/assets/Outfits/NoOutfit.png";
import None from "../components/assets/Accessories/None.png"
export const traitsSlice = createSlice({
  name: "traits",
  initialState: {
    background: {image: Lavender, name: 'Lavender'},
    bodyType: {image: Cat, name: 'Cat'},
    eyes_eyewear: { image: MutantEyes, name: 'Mutant Eyes' },
    hair_hats: { image: NoHat, name: 'None' },
    outfits: { image: NoOutfit, name: 'None' },
    accessories: { image: None, name: 'None' },
  },
  reducers: {
    setBackground: (state, action) => {
      state.background = action.payload;
    },
    setBodyType: (state, action) => {
      state.bodyType = action.payload;
    },
    setEyes: (state, action) => {
      state.eyes_eyewear = action.payload;
    },
    setHairHats: (state, action) => {
      state.hair_hats = action.payload;
    },
    setOutfits: (state, action) => {
      state.outfits = action.payload;
    },
    setAccessories: (state, action) => {
      state.accessories = action.payload;
    },
  },
});

export const {
  setBackground,
  setBodyType,
  setEyes,
  setHairHats,
  setOutfits,
  setAccessories,
} = traitsSlice.actions;
export default traitsSlice.reducer;
