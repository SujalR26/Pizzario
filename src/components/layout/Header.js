"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { CartContext } from "../AppContext";
import Bars3 from "../icons/Bars3";

function AuthLinks({status,userName}){
  if(status==='authenticated'){
    return (
        <>
          <Link
            className="items-center gap-1 text-lg"
            href={"/profile"}
          >
            <i className="ri-user-3-fill"></i>
            {userName}
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-primary text-base text-white px-6 py-2 rounded-full whitespace-nowrap"
          >
            Logout <i className="ri-logout-box-r-line"></i>
          </button>
        </>
    );
  }
      if (status === "unauthenticated"){
        return (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              href={"/register"}
              className="bg-primary text-white px-6 py-2 rounded-full"
            >
              Register
            </Link>
          </>
        );
      }
}



export default function Header() {
  const session = useSession();
  const userData = session.data?.user;
  const status = session.status;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen,setMobileNavOpen]=useState(false);
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <header>
      <div className="flex justify-between md:hidden items-center">
          <Link href={"/"}>
            <img
              className="max-h-16 w-auto "
              // style={{ maxWidth: "200px", minWidth: "50px" }}
              src="/Pizzario.png"
              alt="Pizzario"
            ></img>
          </Link>
          <div className="flex gap-6 items-center">
            <Link href={"/cart"} className="relative">
              <i className="ri-shopping-cart-2-line text-2xl"></i>
              <span className="absolute -top-2 -right-3 bg-primary text-white text-xs p-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            </Link>
            <button className="p-1" onClick={()=>setMobileNavOpen(!mobileNavOpen)}>
              <Bars3/>
            </button>
          </div>
      </div>
      {mobileNavOpen && (
        <div onClick={()=>setMobileNavOpen(false)} className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col items-center gap-2  ">
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
          <Link href={"/orders"}>Orders</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}
      
      <div className="hidden md:flex  items-center justify-between gap-2">
        <nav className="flex items-center gap-6 text-gray-500 font-semibold">
          <Link href={"/"}>
            <img
              className="max-h-20 w-auto md:max-h-16 sm:max-h-12 "
              style={{ maxWidth: "200px", minWidth: "50px" }}
              src="/Pizzario.png"
              alt="Pizzario"
            ></img>
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
          <Link href={"/orders"}>Orders</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName}/>
          <Link href={"/cart"} className="relative">
            <i className="ri-shopping-cart-2-line text-xl"></i>
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs p-1 rounded-full leading-3">
              {cartProducts.length}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
