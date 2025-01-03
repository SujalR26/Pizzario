'use client'
import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "../../components/layout/SectionHeaders";
import { useEffect, useState } from "react";

export default function MenuPage(){
    const [categories,setCategories]=useState([]);
    const [menuItems,setMenuItems]=useState([]);
    useEffect(()=>{
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
                setCategories(categories);
            });
        });
        fetch('/api/menu-items').then(res=>{
            res.json().then(menuItems=>{
                setMenuItems(menuItems);
            })
        })
    },[])

    return (
        <section className="mt-4">
            {categories.length>0 && categories.map(c=>(
                <div key={c._id}>
                    <div className="text-center">
                        <SectionHeaders mainHeader={c.name}/>
                    </div>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mt-6 mb-12 ">
                        {menuItems?.filter(m=>m.category===c._id).map(item=>(
                            <MenuItem key={item._id} {...item}/>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}