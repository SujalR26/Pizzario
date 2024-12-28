"use client"
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function RegisterPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [creatingUser,setCreatingUser]=useState(false);
    const [userCreated,setUserCreated]=useState(false);
    const [error,setError]=useState(false);
    async function handleFormSubmit(e){
        e.preventDefault();
        setCreatingUser(true);
        setError(false);
        const response= await fetch('../api/register',{method:'POST',body:JSON.stringify({email,password}),headers:{'Content-Type':'application/json'}});
        if(!response.ok){
            setError(true);
        }
        else{
            setUserCreated(true);
            setEmail('');
            setPassword('');
        }
            setCreatingUser(false);
    }
    return(
        <section className="mt-4" >
            <h1 className="text-center text-primary text-4xl mb-2">Register</h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created.<br/> Now you can <Link className="underline text-primary" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error &&(
                <div className="my-4 text-center">
                An error has occurred.<br/>
                Please try again later
            </div>
            )}
            <form className="block max-w-xs mx-auto mt-5" onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Enter your Email" value={email} onChange={e=>setEmail(e.target.value)} disabled={creatingUser}></input>
                <input type="password" placeholder="Enter a Password" value={password} onChange={e=>setPassword(e.target.value)} disabled={creatingUser}></input>
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center flex items-center justify-center">
                    <span className="flex-1 border-t border-gray-300"></span>
                    <span className="mx-4 text-gray-500">or</span>
                    <span className="flex-1 border-t border-gray-300"></span>
                </div>
                <button 
                onClick={()=>signIn('google',{callbackUrl:'/'})}
                className="flex gap-4 justify-center items-center ">
                    <Image src={'/google.png'} alt="" width={24} height={24}></Image>    
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t p-4">
                    Already have an account? <Link className="underline text-primary" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
            <div>
                
            </div>
        </section>
    );
}