import { useAtom } from "jotai";
import { mobileNavAtom } from "../context/Context";
export default function UpButton() {
  
  const [mobileNav] = useAtom(mobileNavAtom);

  if (mobileNav) return null;

  return (
    <a
      href="#top"
      id="jump-button"
      className="border-2 border-black w-fit h-fit p-1 absolute bottom-3 right-3 cursor-pointer z-50"
    >
      <img src='/up-arrow.svg' alt="jump" width={20} height={20} />
    </a>
  );
}
