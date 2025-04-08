import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
function Header() {
  const { user, isSignedIn } = useUser();
  const navigation = useNavigate();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <img
        src="/logo.svg"
        className="cursor-pointer"
        alt=""
        onClick={() => navigation("/")}
      />
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button variant="outline" className="text-[#5417d7] font-bold">
              {" "}
              Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button className="bg-[#5417d7] hover:bg-[#3e0fb3]">
            Get Started
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
