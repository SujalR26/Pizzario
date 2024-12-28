'use client'
import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../../components/AppContext";
import toast from "react-hot-toast";
import { useProfile } from "../../components/menu/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CartPage(){
    const {data}=useProfile();
    const [phone, setPhone] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const {cartProducts,removeCartProduct,clearCart}=useContext(CartContext);
    const [showPopup,setShowPopup]=useState(false);
    const [orderData,setOrderData]=useState([]);
    let subTotal=0;
    for (const p of cartProducts){
        subTotal+=cartProductPrice(p);
    }
    let total=subTotal+50;
    function abc(){
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setPhone(data?.phone);
        setPostalCode(data?.postalCode);
        setCity(data?.city);
        setCountry(data?.country);
        setStreetAddress(data?.streetAddress);
      });
    });
    }
  useEffect(() => {
      abc();
    }, []);
    async function proceedToCheckout(e){
        e.preventDefault();
        setShowPopup(true);
        const response =await fetch('/api/orders',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                phone,streetAddress,city,postalCode,country,cartProducts,total
            })
        })
       const order=await response.json();   
       console.log(order)
       setOrderData(order);
    }
    async function afterPayment(e){
        e.preventDefault();
        
        const savingPromise=new Promise(async(resolve,reject)=>{
            const _id=orderData._id;
            const response=await fetch('/api/orders',{
                method:'PUT',
                body:JSON.stringify({_id}),
                headers:{'Content-Type':'application/json'}
            });
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
        });
        await toast.promise(savingPromise,{
            loading:'Placing your Order...',
            success:'Order placed Successfully!!!',
            error:'An error occurred'
        });
        clearCart();
        setShowPopup(false);
        redirect('/orders');
        
        
    }
    if(cartProducts.length===0){
        return(
            <>         
            <div className="text-center">
                <SectionHeaders mainHeader={'Cart'}/>
            </div>
            <div className=" gap-8 mt-8">
                <div>
                        <div className="text-center">
                            <h3 className="text-center text-xl mb-4">No products in your shopping cart.😞</h3>
                            <Link className="text-xl underline" href={'/menu'}>Add now  &raquo; </Link>
                        </div>
                        </div>
                        </div>
        </>

        );
    }
    return (
        <section className="mt-8">
            {showPopup && (
                    <div 
                    onClick={()=>setShowPopup(false)}
                    className="fixed inset-0  bg-black/75 flex items-center justify-center w-screen">
                        <div 
                        onClick={e=>e.stopPropagation()}
                        className="bg-white p-4 rounded-lg max-w-md max-h-[95vh] overflow-y-scroll ">
                            <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={afterPayment}>
                        <label>Phone No.</label>
                        <input
                        type="tel"
                        disabled={true}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone no."
                        ></input>
                        <label>Street address</label>
                        <input
                        type="text"
                        disabled={true}
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Street address"
                        ></input>
                        <div className="flex gap-2 ">
                            <div>
                                <label>Pin Code</label>
                                <input
                                type="text"
                                disabled={true}
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                placeholder="Postal code"
                                ></input>
                            </div>
                            <div>
                                <label>City</label>
                                <input
                                type="text"
                                value={city}
                                disabled={true}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                                ></input>
                            </div>
                        </div>
                        <label>Country</label>
                        <input
                        type="text"
                        value={country}
                        disabled={true}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                        ></input>
                        <button type="submit" >Pay &#8377;{subTotal+50}</button>
                        <button type="button" className="mt-2" onClick={e=>setShowPopup(false)}>Cancel</button>
                    </form>
                </div>
                        </div>
                        </div>
            )}
            <div className="text-center">
                <SectionHeaders mainHeader={'Cart'}/>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                    {cartProducts.length>0 &&cartProducts.map((product,idx)=>(
                        <div key={idx} className="flex gap-4  items-center border-b py-2">
                            <div className="w-24">
                                <img width={240} height={240} src={product.image} ></img>
                            </div>
                            <div className="grow">
                                <h3 className="capitalize font-semibold">{product.itemName}</h3>
                                {product.size && (
                                    <div className="text-sm text-gray-900 capitalize">
                                        Size:<span>{product.size.name}</span>
                                    </div>
                                )}
                                {product.extras.length>0 && (
                                    <div className="text-sm text-gray-500 capitalize">
                                        {product.extras.map((extra,indx)=>(
                                            <div key={indx}>{extra.name} &#8377;{extra.price}</div>
                                        ))}
                                    </div>
                                ) }
                            </div>
                            <div className="text-lg font-semibold">
                                &#8377;{cartProductPrice(product)}
                            </div>
                            <div className="ml-1">
                                <button 
                                onClick={()=>{
                                    removeCartProduct(idx)
                                }}
                                type="button" 
                                className="px-2 py-1 "><i className="ri-delete-bin-line"></i></button>
                            </div>
                        </div>
                    ))    
                    }
                    <div className="py-4 text-right pr-12 flex text-lg gap-1 justify-end items-center">
                        <div className="text-gray-500">
                            Subtotal:<br/>
                            Delivery charge:<br/>
                            Total:
                        </div>
                        <div className="text-lg font-semibold pl-2 ">
                            &#8377;{subTotal}<br/>  
                            &#8377;50<br/>
                            &#8377;{total}
                            </div>
                    </div>
                    
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <label>Phone No.</label>
                        <input
                        type="tel"
                        required={true}
                        value={phone || ''}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone no."
                        ></input>
                        <label>Street address</label>
                        <input
                        type="text"
                        required={true}
                        value={streetAddress || ''}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Street address"
                        ></input>
                        <div className="flex gap-2">
                            <div className="grow">
                                <label>Pin Code</label>
                                <input
                                type="text"
                                required={true}
                                value={postalCode || ''}
                                onChange={(e) => setPostalCode(e.target.value)}
                                placeholder="Postal code"
                                ></input>
                            </div>
                            <div className="grow">
                                <label>City</label>
                                <input
                                type="text"
                                required={true}
                                value={city || ''}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                                ></input>
                            </div>
                        </div>
                        <label>Country</label>
                        <input
                        type="text"
                        required={true}
                        value={country || ''}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                        ></input>
                        <button type="submit">Pay &#8377;{total}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}