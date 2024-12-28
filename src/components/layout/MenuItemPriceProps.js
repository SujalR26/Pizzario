import { useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";

export default function MenuItemPriceProps({name,addLabel,props,setProps}){

    const [isOpen,setIsOpen]=useState(false);



    function addProp(){
        setProps(oldProps=>{
            return [...oldProps,{
                name:'',
                price:'0'
            }]
        })
    }

    function removeProp(idxToRemove){
        setProps(prev=>prev.filter((v,index)=>index!==idxToRemove));
    }

    function editProp(e,idx,prop){
        const newValue=e.target.value;
        setProps(prevProps=>{
            const newProps=[...prevProps];
            newProps[idx][prop]=newValue;
            return newProps;
        })
    }

    return (
        <div className="bg-gray-200 p-2 rounded-lg mb-2">
                <button 
                onClick={()=>setIsOpen(prev=>!prev)}
                className=" inline-flex items-center gap-1 font-semibold text-base p-2 border-0 " type="button">
                    {isOpen && (
                        <ChevronUp className="w-4 h-4"/>
                    )}
                    {!isOpen && (
                        <ChevronDown className="w-4 h-4"></ChevronDown>
                    )}
                    <span>{name}</span>
                    <span>({props?.length})</span>
                </button>
                <div className={isOpen?'block':'hidden'}>
                    {props?.length>0 && props.map((size,idx)=>(
                        <div key={idx} className="flex gap-2 items-center">
                            <div>
                                <label>Name</label>
                                <input type="text" placeholder="Name" value={size.name} onChange={e=>editProp(e,idx,'name')}></input>
                            </div>
                        <div>
                            <label>Extra price</label>
                            <input type="text" placeholder="Extra price" value={size.price} onChange={e=>editProp(e,idx,'price')}></input>
                        </div>
                    <div>
                        <button type="button" onClick={()=>removeProp(idx)} className="bg-white mt-3 px-2 py-1.5"><i className="ri-delete-bin-6-line font-normal"></i></button>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={addProp}
                className="bg-white font-medium text-base">
                <i className="ri-add-line"></i>
                {addLabel}
            </button>
                </div>
        
        </div>
    );
}