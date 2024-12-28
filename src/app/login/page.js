"use client"
import {signIn} from 'next-auth/react';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loginInProgress,setLoginInProgress]=useState(false);

    async function googleLogin(){
        setLoginInProgress(true);
        await signIn('google',{callbackUrl:'/'});
        setLoginInProgress(false);
    }
    async function handleFormSubmit(e){
        e.preventDefault();
        setLoginInProgress(true);
        await signIn('credentials',{email,password,callbackUrl:'/'});
        setLoginInProgress(false)
    }
    return(
        <section className="mt-4" >
            <h1 className="text-center text-primary text-4xl mb-2">Login</h1>
            <form className="block max-w-xs mx-auto mt-5" onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Enter your Email" value={email} name="email" onChange={e=>setEmail(e.target.value)} disabled={loginInProgress}></input>
                <input type="password" placeholder="Enter a Password" value={password} name="password" onChange={e=>setPassword(e.target.value)} disabled={loginInProgress}></input>
                <button type="submit" disabled={loginInProgress}>Login</button>
                <div className="my-4 text-center flex items-center justify-center">
                    <span className="flex-1 border-t border-gray-300"></span>
                    <span className="mx-4 text-gray-500">or</span>
                    <span className="flex-1 border-t border-gray-300"></span>
                </div>
                <button type='button'
                onClick={googleLogin}
                className="flex gap-4 justify-center items-center ">
                    <Image src={'/google.png'} alt="" width={24} height={24}></Image>    
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t p-4">
                    Don't have an account? <Link className="underline text-primary" href={'/register'}>Register here &raquo;</Link>
                </div>
            </form>
            <div>
                
            </div>
        </section>
    );
}