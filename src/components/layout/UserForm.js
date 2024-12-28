'use client'
import { useState } from "react";
import toast from "react-hot-toast";

export default function UserForm({user,onSave}){
    

    async function handleImageUpdate(e) {
    e.preventDefault(); 
    const updatePromise = fetch("/api/upload", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }), 
    }).then(async (response) => {
      if (response.ok) {
        return await response.json().then((data) => {
        //   session.data.user.image=data.image;
        //   abc();
        setUserImage(image);
        setImage("")
        
        });
      }
      throw new Error("Failed to update image");
    });
  
    await toast.promise(updatePromise, {
      loading: "Updating image...",
      success: "Image updated!",
      error: "Image update failed.",
    });
  }
    
    return (
        <div>Hello</div>
    );
}