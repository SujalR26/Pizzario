'use client';
import Image from "next/image";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";
import MenuItem from "../menu/MenuItem";

export default function HomeMenu(){
    const [bestSellers,setBestSellers]=useState([]);
    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
            res.json().then(menuItems=>{
                //getting last 3 menu items
                setBestSellers(menuItems.slice(-3));
            })
        })
    },[])

    return (
        <section>
            <div className="absolute left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[70px] text-left -z-10">
                    <Image src={'/salad12.JPG'} width={109} height={189} alt="salad" />
                </div>
                <div className=" absolute -top-[100px] right-0 -z-10">
                    <Image src={'/salad11.JPG'} width={109} height={189} alt="salad" />
                </div>
                
            </div>
            <div className="text-center mb-4">
                <SectionHeaders 
                subHeader={'check out'} 
                mainHeader={'Our Best Sellers'}/>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                {bestSellers?.length>0 && bestSellers.map(item=>(
                    <MenuItem key={item._id} {...item}/>
                    // <MenuItem {...item}/>
                ))}
            </div>
            
        </section>
    )
}