import { useAtom } from "jotai";
import { entryAtom, listAtom, loadingAtom } from "../context/Context";
import { FormEvent } from "react";
import axios from "axios";
import { API_BASE } from "../config/apiBase";

export default function ListSubmit() {
  const [entry, setEntry] = useAtom(entryAtom);
  const [list, setList] = useAtom(listAtom);
  const [isLoading, setIsLoading] = useAtom(loadingAtom);

  async function postEntry(e: FormEvent) {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await axios.post(
        `${API_BASE}/dashboard`,
        {
          entry: entry,
        },
        { withCredentials: true }
      );
      setList(res.data.list);
      setEntry("");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000 / 2);
    } catch (error) {
      setIsLoading(false);
    }
  }
  return (
    <form
      onSubmit={postEntry}
      className="flex flex-col border border-black w-60 items-center justify-center rounded-md overflow-hidden mt-8 bg-white"
    >
      <label htmlFor="entry">Entry:</label>
      <textarea
        className="border border-black p-2 w-full h-full"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        name="entry"
        id="entry"
        required
        maxLength={80}
        rows={5}
        cols={20}
      />
      <button
        type="submit"
        className="bg-green-300 hover:bg-green-200 h-fit w-full py-2 border border-black"
      >
        Submit
      </button>
    </form>
  );
}
