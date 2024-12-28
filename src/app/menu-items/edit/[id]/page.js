'use client'
import { useProfile } from "../../../../components/menu/UseProfile";
import UserTabs from "../../../../components/layout/UserTabs";
import { useEffect, useState } from "react";   
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "../../../../components/icons/Left";
import { redirect, useParams } from "next/navigation";
import MenuItemForm from "../../../../components/layout/MenuItem";
import DeleteButton from "@/components/DeleteButton";


export default function EditMenuItemPage(){
    const {id}=useParams();
    const [redirectedToItems,setRedirectedToItems]=useState(false);
    const [menuImage,setMenuImage]=useState('');
    const [menuItem,setMenuItem]=useState(null);
    const {loading:profileLoading,data:profileData}=useProfile();

    useEffect(()=>{
        fetch('/api/menu-items').then(response=>{
            response.json().then(items=>{
                const item=items.find(i=>i._id===id);
                setMenuItem(item);
            });
        })
    },[]);



    async function handleFormSubmit(e,data) {
        e.preventDefault(); 
        if(!data.image){
            setImage(menuImage);
        }
        data={...data,_id:id};
        const savingPromise=new Promise(async(resolve,reject)=>{
            const response=await fetch('/api/menu-items',{
                method:'PUT',
                body:JSON.stringify(data),
                headers:{'Content-Type':'application/json'}
            });
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
        });
        await toast.promise(savingPromise,{
            loading:'Saving this item',
            success:'Saved!!!',
            error:'An error has occurred'
        });
        setRedirectedToItems(true);
    }

    async function handleDeleteClick(){
        const promise=new Promise(async(resolve,reject)=>{
            const response=await fetch('/api/menu-items?_id='+id,{
                method:'DELETE'
            });
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
        });
        toast.promise(promise,{
            loading:'Deleting...',
            success:'Item deleted Successfully!',
            error:'Some error occurred'
        });
        setRedirectedToItems(true);
    }


    async function handleImageUpdate(e){
        setMenuImage('');
        toast.success('Image uploaded successfully!!');
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
            <Link className="flex  justify-center items-center bg-primary px-2 py-2 rounded-lg text-white hover:text-primary whitespace-nowrap hover:bg-white border transition-all duration-300 " href={'/menu-items'}><Left></Left> Show all menu items</Link>
        </div>  
        <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
        <div className="md:max-w-md md:pl-14 md:ml-auto mt-2 ">
            <DeleteButton label={'Delete this item'} onDelete={handleDeleteClick} className="text-red-600 font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-1"/>
            {/* <button type="button" className="text-red-600 font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-1" onClick={handleDeleteClick}><i className="ri-delete-bin-line"></i><span>Delete this item</span></button>*/}
        </div>
        </section>  
    );
}