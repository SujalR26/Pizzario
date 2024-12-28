import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({onSubmit,menuItem}){
    const [itemName,setItemName]=useState(menuItem?.itemName||'');
    const [description,setDescription]=useState(menuItem?.description||'');
    const [basePrice,setBasePrice]=useState(menuItem?.basePrice||'');
    const [image,setImage]=useState(menuItem?.image||'');
    const [menuImage,setMenuImage]=useState(menuItem?.image||'');
    const [sizes,setSizes]=useState(menuItem?.sizes||[]);
    const [category,setCategory]=useState(menuItem?.category||'');
    const [categories,setCategories]=useState([]);
    const [extraIngredientPrices,setExtraIngredientPrices]=useState(menuItem?.extraIngredientPrices||[]);
    async function handleImageUpdate(){
        setMenuImage(image);
        toast.success('Image uploaded successfully!!');
    }

    useEffect(()=>{
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
                setCategories(categories);
            })
        })
    },[]);
    

    return(
        <form className="mt-10 max-w-xl mx-auto" 
        onSubmit={e=>
        onSubmit(e,{
            image,itemName,description,basePrice,menuImage,sizes,extraIngredientPrices,category,
        })}>
            <div className="md:grid gap-4 items-start " style={{gridTemplateColumns:'.3fr .7fr'}}>
                <div className=" w-full">
                    {menuImage && (
                        <>
                        <img 
                        className="rounded-lg mb-1 "
                        src={menuImage} 
                        alt="image"
                        width={250}
                        height={250}>
                        </img>
                        <input type="text" value={image} onChange={e=>setImage(e.target.value)} placeholder="Enter Image URL" ></input>
                        <button className="block border rounded-lg mb-5 px-2 py-2 text-center  bg-primary text-white whitespace-nowrap" type="button" onClick={handleImageUpdate}>{image?'Update ':'Edit '}Image</button>
                        </>
                    )}
                    {!menuImage && (
                        <>
                        <div className="placeholder-avatar">
                            <div className="bg-gray-200 p-4 mb-2 rounded-lg text-center text-gray-600">No image</div>
                            <input type="text" placeholder="Enter Image URL to change" required={true} value={image} onChange={(e) => setImage(e.target.value)}></input>
                            <button type="button" className="mb-5" onClick={handleImageUpdate}>{image?'Upload ':'Edit '}Image</button>
                        </div>
                        </>
                    )}
                    
                </div>
                
                <div className="-mt-5 grow">
                    <label>Item name</label>
                    <input type="text" value={itemName} onChange={e=>setItemName(e.target.value)} required={true}></input>
                    <label>Description</label>
                    <input type="text" required={true} value={description} onChange={e=>setDescription(e.target.value)} ></input>
                    <label>Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option  disabled value="" >Select a category</option>
                        {categories.length > 0 && categories.map(c => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                        ))}
                    </select>
                    <label>Base price</label>
                    <input type="text" required={true} value={basePrice} onChange={e=>setBasePrice(e.target.value)} ></input>
                    <MenuItemPriceProps 
                    name={'Sizes'}
                    addLabel={'Add item size'}
                    props={sizes} 
                    setProps={setSizes} 
                    />
                    <MenuItemPriceProps
                    name={'Extra ingredients'}
                    addLabel={'Add ingredients price'}
                    props={extraIngredientPrices}
                    setProps={setExtraIngredientPrices}
                    />
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    );
}