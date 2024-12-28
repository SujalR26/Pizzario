'use client'
import { useProfile } from "../../components/menu/UseProfile";
import UserTabs from "../../components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Right from "../../components/icons/Right";

export default function MenuItemsPage(){
    const [menuItems,setMenuItems]=useState([]);
    const {loading:profileLoading,data:profileData}=useProfile();
    useEffect(()=>{
      fetch('/api/menu-items').then(res=>{
        res.json().then(menuItems=>{
          setMenuItems(menuItems);
        });
      })
    },[]);
    if(profileLoading){
        return 'Loading info...';
    }
    if(!profileData.admin){
        return 'Not an admin';
    }
    return(
      <section className="mt-4 max-w-xl mx-auto">
        <UserTabs isAdmin={true}/>
        <div className="mt-8 flex justify-center">
            <Link
            className=" flex justify-center  bg-primary px-2 py-2 rounded-lg text-white hover:text-primary hover:bg-white border transition-all duration-300 whitespace-nowrap"
            href={'/menu-items/new'}>Create new menu item<Right></Right></Link>
        </div>
        <div>
          <h2 className="text-sm text-gray-500 mt-4">Edit menu item</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 ">
            {menuItems?.length>0 && menuItems.map((item,idx)=>(
              <Link key={idx} href={'/menu-items/edit/'+item._id} className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all duration-200">
                <div className="relative flex justify-center">
                  <img src={item.image} className="mix-blend-multiply mb-1 " width={200} height={200}></img>
                </div>
                <div className="text-center font-bold ">
                  {item.itemName}
                </div>
              </Link >
            ))}
          </div>
          
        </div>
      </section>
    );
}