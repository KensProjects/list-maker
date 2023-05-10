import React, { FormEvent } from "react";
import { useAtom } from "jotai";
import { usernameAtom, passwordAtom, messageAtom } from "../context/Context";

export default function AuthForm({
  type,
  onSubmit,
  error,
}: {
  type: string;
  onSubmit: (e: FormEvent<Element>) => void;
  error: string;
}) {
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [message, setMessage] = useAtom(messageAtom);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-between py-8 items-center border-2 border-black w-96 h-auto gap-8 mt-20"
      >
        <h1 className="text-2xl font-medium">{type}</h1>
        <p className="text-red-600 text-xl font-bold">{error}</p>
        <div className=" gap-2 flex flex-col justify-center items-start w-3/4">
          <label htmlFor="username" className="text-xl">Username:</label>
          <input
            className="w-full border-none ring p-2 rounded-md"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            id="username"
            name="username"
            onClick={() => setMessage("")}
            minLength={1}
            maxLength={12}
          />
        </div>
        <div className=" gap-2 flex flex-col justify-center items-start w-3/4">
          <label htmlFor="password" className="text-xl">Password:</label>
          <input
            className="w-full border-none ring p-2 rounded-md"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id="password"
            name="password"
            onClick={() => setMessage("")}
          />
        </div>
        <button
          type="submit"
          className="bg-violet-400 hover:bg-violet-300 h-12 w-36 rounded-lg"
        >
          Submit
        </button>
      </form>
    </>
  );
}
