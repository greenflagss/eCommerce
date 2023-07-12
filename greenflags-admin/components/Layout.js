import { useState } from "react";
import Nav from "./Nav";
import { useSession, signIn } from "next-auth/react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);

  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="w-screen h-screen bg-emerald-900 flex items-center">
        <div className="w-full text-center">
          <button
            className="bg-white p-2 px-4 rounded-lg"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-primary min-h-screen">
      <div
        className={(showNav ? "hidden " : "") + "block md:hidden flex gap-1 p-4"}
      >
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
