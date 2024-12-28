export default function AddToCartButton({hasSizesOrExtras,onClick,basePrice,image}){

   

    return (
        <button 
            type="button"
            onClick={onClick}
            className="mt-2 bg-primary text-white rounded-full px-8 py-2 hover:bg-white hover:text-primary transition-all duration-300">
            {(hasSizesOrExtras) ? (
            <span>From &#8377;{basePrice}</span>
            ):(
            <span>Add to cart &#8377;{basePrice} </span>
            )}
        </button>
    );
}