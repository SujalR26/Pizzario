'use client'
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/menu/UseProfile";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage(){
    const [categoryName,setCategoryName]=useState('');
    const [categories,setCategories]=useState([]);
    const {loading:profileLoading,data:profileData}=useProfile();
    const [editedCategory,setEditedCategory]=useState(null);

    useEffect(()=>{
        fetchCategories();
    },[]);

    function fetchCategories(){
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
                setCategories(categories);
            })
        });
    }

    async function handleCategorySubmit(e){
        e.preventDefault();
        const creationPromise=new Promise(async (resolve,reject)=>{
            const data={name:categoryName};
            if(editedCategory){
                data._id=editedCategory._id;
            }
            const response = await fetch('/api/categories',{
                method:editedCategory?'PUT':'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data),
            });
            fetchCategories();
            setCategoryName('');
            setEditedCategory(null);
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
        });
        await toast.promise(creationPromise,{
            loading:editedCategory?'Updating Category...':'Creating new category...',
            success:editedCategory?'Category edited':'Category created',
            error:'An error has occured'
        });
        

    }

   

    if(profileLoading){
        return 'Loading info...';
    }
    if(!profileData.admin){
        redirect('/login');
    }
    
    async function handleDeleteClick(_id){
        const promise=new Promise(async(resolve,reject)=>{
            const response=await fetch('/api/categories?_id='+_id,{
                method:'DELETE',
            });
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }


            toast.promise(promise,{
                loading:'Deleting category...',
                success:'Deleted successfully',
                error:'Some error occurred'
            });
            fetchCategories();
        })
        
    }
    
    return(
        <section className="mt-4 max-w-xl mx-auto">
            <UserTabs isAdmin={true}></UserTabs>
            <form className="mt-4" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end ">
                    <div className="grow">
                        <label>
                            {editedCategory?'Update Category':'New Category name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>  
                        <input 
                            className="py-2" 
                            type="text"
                            value={categoryName}
                            onChange={e=>{setCategoryName(e.target.value)}}></input>
                    </div>
                    <div className="mb-2 flex gap-2">
                        <button className=" text-base px-4" type="submit">{editedCategory?'Update':'Create'}</button>
                        {editedCategory &&(
                        <button type="button" onClick={()=>{
                            setEditedCategory(null)
                            setCategoryName('')}} className=" text-base px-4">Cancel</button>)}
                    </div>
                </div>  
            </form>     
            <div >
                <h2 className="mt-4  text-gray-500  text-sm">Existing Categories:</h2>
                {categories?.length>0 && categories.map((c,idx)=>(
                    <div 
                    key={idx}
                    
                    className=" font-medium rounded-xl py-2 px-4 flex justify-between border items-center bg-gray-100  gap-1 mb-1 ">
                        <span 
                        className="grow ">{c.name}</span> 
                        <div className="flex gap-2 items-center ">
                            <button type="button" className="px-2 py-1 border flex gap-1 border-gray-400 text-sm rounded-lg cursor-pointer items-center"
                            onClick={()=>{
                                setEditedCategory(c);
                                setCategoryName(c.name);
                                }
                            }><i className="ri-pencil-fill"></i>Edit </button>
                            {/* <button
                            onClick={()=>handleDeleteClick(c._id)} 
                            type="button"
                            className="px-2 py-1 border border-gray-400 flex gap-1 text-sm rounded-lg cursor-pointer"><i className="ri-delete-bin-line items-center"></i>Delete</button>  */}
                            <DeleteButton label={'Delete'} onDelete={()=>handleDeleteClick(c._id)} className="px-2 py-1 border border-gray-400 flex gap-1 text-sm rounded-lg cursor-pointer items-center "/>
                        </div>

                    </div>
                ))}
            </div>   
        </section>
    );
}