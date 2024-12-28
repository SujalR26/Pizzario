'use client'
import { useProfile } from "../../../components/menu/UseProfile";
import UserTabs from "../../../components/layout/UserTabs";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "../../../components/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "../../../components/layout/MenuItem";

export default function NewMenuItemPage(){
    const [redirectedToItems,setRedirectedToItems]=useState(false);
    const {loading:profileLoading,data:profileData}=useProfile();


    async function handleFormSubmit(e,data) {
        e.preventDefault(); 
        const savingPromise=new Promise(async(resolve,reject)=>{
            const response=await fetch('/api/menu-items',{
                method:'POST',
                body:JSON.stringify(data),
                headers:{'Content-Type': 'application/json'}
            });
            console.log(response);
            if(response.ok){
                resolve();
            }
            else{
                const errorMessage = await response.text();
                console.log(errorMessage);
                reject(new Error(errorMessage || 'Failed to save the menu item'));
                // reject();
            }
        });
        await toast.promise(savingPromise,{
            loading:'Saving this item',
            success:'Saved!!!',
            error:'An error has occurred'
        });
        setRedirectedToItems(true);
    }
    if(redirectedToItems){
        return redirect('/menu-items');
    }   
    if(profileLoading){
        return 'Loading info...';
    }
    if(!profileData.admin){
        return 'Not an admin';
    }
    return(
        <section className="mt-4 max-w-xl mx-auto">
        <UserTabs isAdmin={true}></UserTabs>
        <div className=" mt-8 mx-auto flex justify-center">
            <Link className="flex justify-center items-center bg-primary px-2 py-2 rounded-lg text-white hover:text-primary whitespace-nowrap hover:bg-white border transition-all duration-300" href={'/menu-items'}><Left></Left> Show all menu items</Link>
        </div>
        <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
      </section>  
    );
}