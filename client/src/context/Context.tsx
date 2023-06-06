import { atom } from "jotai";

type TEntry = {
  entry: string;
  _id: string;
};

export const entryAtom = atom<string>("");

export const listAtom = atom<TEntry[] | null>([]);

export const usernameAtom = atom("");

export const passwordAtom = atom("");

export const loggedAtom = atom(false);

export const loadingAtom = atom(false);

export const messageAtom = atom("");

export const mobileNavAtom = atom(false)
