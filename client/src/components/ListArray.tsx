import React, { useEffect } from "react";
import Entry from "./Entry";
import { useAtom } from "jotai";
import { listAtom, loadingAtom } from "../context/Context";
import { API_BASE } from "../config/apiBase";
import axios from "axios";
import UpButton from "./UpButton";

export default function ListArray() {
  const [list, setList] = useAtom(listAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);

  async function getEntries() {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const res = await axios.get(`${API_BASE}/dashboard`, {
        signal,
        withCredentials: true,
      });
      setList(res.data.list);
      setIsLoading(false);
      return () => {
        controller.abort();
      };
    } catch (error) {
      setIsLoading(false);
    }
  }
  async function deleteEntry(id: string) {
    try {
      setIsLoading(true);
      const res = await axios.delete(`${API_BASE}/dashboard/${id}`, {
        withCredentials: true,
      });
      setList(res.data.list);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000 / 2);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <div className="w-screen h-screen relative">
      <ul className="w-full h-fit px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center items-center absolute gap-y-4">
        {list?.map((entry) => {
          return (
            <li key={entry._id} className="flex justify-center items-center  h-fit">
              {
                <Entry
                  content={entry.entry}
                  onDelete={() => deleteEntry(entry._id)}
                />
              }
            </li>
          );
        })}
      </ul>
      <UpButton />
    </div>
  );
}
