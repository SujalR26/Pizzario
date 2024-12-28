import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";

export default function MenuItem(menuItem){
    const {
        image,itemName,description,basePrice,sizes,extraIngredientPrices,
    }=menuItem;
    
    const [selectedSize,setSelectedSize]=useState(sizes?.[0] || null);
    const [selectedExtras,setSelectedExtras]=useState([]);
    const [showPopup,setShowPopup]=useState(false);
    const {addToCart}=useContext(CartContext);

    function handleAddToCartButtonClick(){

        const hasOptions=sizes.length>0 || extraIngredientPrices.length>0

        if(hasOptions && !showPopup){
            setShowPopup(true);
            return;
        }

        addToCart(menuItem,selectedSize,selectedExtras);
        
        setTimeout(()=>{
            toast.success('Added to Cart!',{
                position:'top-right'
            });
            setShowPopup(false);
        },600);
        

    }

    function handleExtraThingClick(e,extra){
        const checked=e.target.checked;
        if(checked){
            setSelectedExtras(prev=>[...prev,extra]);
        }
        else{
            setSelectedExtras(prev=>{
                return prev.filter(e=>e.name!==extra.name);
            })
        }
    }   
    let selectedPrice=basePrice;
    if(selectedSize){
        selectedPrice+=selectedSize.price;
    }
    if(selectedExtras?.length>0){
        for(const extra of selectedExtras){
            selectedPrice+=extra.price;
        }
    }
    return(
            <>
                {showPopup && (
                    <div 
                    onClick={()=>setShowPopup(false)}
                    className="fixed inset-0  bg-black/75 flex items-center justify-center">
                        <div 
                        onClick={e=>e.stopPropagation()}
                        className="bg-white p-4 rounded-lg max-w-md max-h-[95vh] overflow-y-scroll ">
                            <img 
                            src={image || '/public/Pizza.webp'} 
                            alt={itemName||'Pizza'} 
                            width={300} 
                            height={200} 
                            className="mx-auto"></img>
                            <h2 className="text-lg font-bold text-center mb-2">{itemName}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                            {sizes?.length>0 && (
                                <div className=" py-2">
                                    <h3 className="text-center text-gray-700">Pick your Size</h3>
                                    {sizes.map((size,idx)=>(
                                        <label key={idx} className="flex items-center gap-1 p-3 rounded-md mb-1 border capitalize">
                                            <input 
                                            onChange={()=>setSelectedSize(size)}
                                            checked={selectedSize?.name===size.name}
                                            type="radio" 
                                            name="size"/>{size.name} &#8377;{basePrice+size.price}
                                        </label>
                                    ))}
                                </div>    
                            )}
                            {
                                extraIngredientPrices?.length>0 && (
                                    <div className=" py-2">
                                    <h3 className="text-center text-gray-700">Any Extras?? </h3>
                                    {extraIngredientPrices.map((extra,idx)=>(
                                        <label key={idx} className="flex items-center gap-1 p-3 rounded-md mb-1 border capitalize">
                                            <input 
                                            onChange={(e)=>handleExtraThingClick(e,extra)}
                                            type="checkbox" 
                                            
                                            name={extra.name}/>{extra.name} &#8377;{extra.price}
                                        </label>
                                    ))}
                                </div>
                                )
                            }
                                <button 
                                onClick={handleAddToCartButtonClick}
                                className="bg-primary rounded-xl text-white hover:text-primary hover:bg-white transition-all duration-300 sticky bottom-0 ">Add to cart &#8377;{selectedPrice}</button>
                            
                            
                            <button onClick={()=>setShowPopup(false)} className="mt-2">Cancel</button>
                        </div>
                    </div>
                )}
                <MenuItemTile 
                onAddToCart={handleAddToCartButtonClick} 
                {...menuItem}/>
            </>
    );
}