import { useState } from "react";

export default function DeleteButton({label,onDelete,className}){
    const [showConfirm,setShowConfirm]=useState(false);


    if(showConfirm){
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-black/75 h-full">
                <div className="bg-white p-4 rounded-lg">
                    <div className="my-1 p-1">
                        Are you sure you want to delete?
                    </div>
                    <div className="flex gap-2">
                        <button type="button" className="hover:bg-gray-200" onClick={()=>setShowConfirm(false)}>Cancel</button>
                        <button type="button" className="text-red-600 font-semibold hover:bg-red-600 hover:text-white transition-all duration-300" onClick={()=>{
                            onDelete();
                            setShowConfirm(false);
                        }}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }


    return(
        <button type="button" className={className} onClick={()=>setShowConfirm(true)}><i className="ri-delete-bin-line"></i><span>{label}</span></button>    
    );
}