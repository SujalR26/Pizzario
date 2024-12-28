import AddToCartButton from "./AddToCartButton";

export default function MenuItemTile({onAddToCart,...item}){
    const {image,description,itemName,basePrice,sizes,extraIngredientPrices}=item;
    const hasSizesOrExtras=sizes?.length>0 || extraIngredientPrices?.length>0

    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all ">
                    <div>
                        <img src={image||'/public/Pizza.webp'} alt="pizza" className="max-h-24 mx-auto block "></img>
                    </div>
                    <h4 className="font-semibold my-3 text-xl">{itemName}</h4>
                    <p className="text-gray-500 text-sm max-h-16 line-clamp-3">{description}</p>
                    <AddToCartButton 
                    hasSizesOrExtras={hasSizesOrExtras} 
                    onClick={onAddToCart}
                    basePrice={basePrice}
                    image={image||'/public/Pizza.webp'}
                    />
                </div>
    )
}