"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      {!isAdmin && (
        <h1
        style={{
          color: "#FE5D26",                  
          fontSize:"40px", 
          backgroundColor: "white",        
          borderRadius: "8px",    
          marginTop:"-20px",
          marginBottom:"-20px"
        }}
      >
        Profile
      </h1>
      )}
      {isAdmin && (
        <>
          <Link 
            className={path==='/profile'?'active':''} 
            href={"/profile"}>
            Profile
          </Link>
          <Link 
            className={path==='/categories'?'active':''} 
            href={"/categories"}>
            Categories
          </Link>
          <Link 
            className={path.includes('/menu-items')?'active':''} 
            href={"/menu-items"}>
            Menu Items
          </Link>
          <Link 
            className={path.includes('/users')?'active':''}  
            href={"/users"}>
            Users
          </Link>
          <Link 
            className={path==='/orders-admin'?'active':''}  
            href={"/orders-admin"}>
            Orders
          </Link>
        </>
      )}
    </div>
  );
}
