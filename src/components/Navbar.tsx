import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className=" flex items-center justify-between px-5 bg-white w-full">
      <div className="flex items-center gap-5">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Resolution Hub Logo"
            className="w-full h-32"
          />
        </Link>
        <nav className="flex justify-between items-center gap-10">
          <Link href={"#"}>Products</Link>
          <Link href={"#features"}>Features</Link>
          <Link href={"#"}>How it works</Link>
          <Link href={"#faq"}>FAQ</Link>
        </nav>
      </div>
      <div>
        <Link
          className=" px-4 py-2 bg-orange-600 text-white font-medium rounded-2xl"
          href="/dashboard"
        >
          Start Free{" "}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
