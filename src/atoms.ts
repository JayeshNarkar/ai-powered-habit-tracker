import { atom } from "recoil";

export const SelectedDateAtom = atom<Date>({
  key: "SelectedDate",
  default: new Date(),
});
