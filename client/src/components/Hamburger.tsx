import { useAtom } from "jotai";
import { mobileNavAtom } from "../context/Context";

export default function Hamburger() {
  const [mobileNav, setMobileNav] = useAtom(mobileNavAtom);

  function handleMobileToggle() {
    setMobileNav((prev) => !prev);
  }

  return (
    <div className="space-y-2 sm:hidden absolute right-5 top-8" onClick={handleMobileToggle}>
      <span className="block w-8 h-1 bg-gray-600"></span>
      <span className="block w-8 h-1 bg-gray-600"></span>
      <span className="block w-8 h-1 bg-gray-600"></span>
    </div>
  );
}
