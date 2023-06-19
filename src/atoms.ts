import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark", // unique ID
  default: true, // default value
});
