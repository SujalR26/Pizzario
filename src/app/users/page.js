'use client'
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/menu/UseProfile";
import Link from "next/link";

export default function UsersPage(){

    const [users,setUsers]=useState([]);
    const {loading:profileLoading,data:profileData}=useProfile();

    useEffect(()=>{
        fetch('/api/users').then(resp=>{
            resp.json().then(usersData=>{
                setUsers(usersData);
            })
        })
    },[]);


    if(profileLoading){
        return 'Loading info...';
    }
    if(!profileData.admin){
        return 'Not an admin';
    }

    return (
        <section className=" mt-4 max-w-xl mx-auto">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                {users.length>0 && users.map((user,idx)=>(
                    <div
                    key={idx}
                    className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex gap-4 items-center">
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 grow">
                            <div className="text-gray-800">
                                {user.name && (
                                    <span>{user.name}</span>
                                )}
                                {!user.name && (
                                    <span className="italic ">No name</span>
                                )}
                            </div>
                            <span className="text-gray-500">{user.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={'/users/'+user._id}>Edit</Link>
                        </div>
                    </div>
                ) )}
            </div>
        </section>
    );
}