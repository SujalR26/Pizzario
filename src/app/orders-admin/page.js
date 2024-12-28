"use client";
import UserTabs from "../../components/layout/UserTabs";
import { cartProductPrice } from "../../components/AppContext";
import SectionHeaders from "../../components/layout/SectionHeaders";
import { useEffect, useState } from "react";
import DeleteButton from "../../components/DeleteButton";
import toast from "react-hot-toast";
import Link from "next/link";
import { useProfile } from "../../components/menu/UseProfile";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const {loading:profileLoading,data:profileData}=useProfile();
  function fetchOrders(){
    fetch('/api/orders-admin').then(res=>{
      res.json().then(data=>{
          setOrders(data);
      })
  })
  }

  useEffect(() => {
    fetchOrders();
  }, []);
  async function handleDeleteClick(_id){
    const promise=new Promise(async(resolve,reject)=>{
        const response=await fetch('/api/orders-admin?_id='+_id,{
            method:'DELETE',
        });
        if(response.ok){
            resolve();
        }
        else{
            reject();
        }


        toast.promise(promise,{
            loading:'Deleting Order...',
            success:'Order deleted successfully',
            error:'Some error occurred'
        });
        fetchOrders();
    })
    
}
if(profileLoading){
  return 'Loading info...';
}
if(!profileData.admin){
  return 'Not an admin';
}
if(orders.length===0){
  return(
    <section className="mt-8 mb-24 max-w-xl mx-auto">
        <div>
            <UserTabs isAdmin={true}/>
        </div>
      <div className="text-center mt-8">
        <SectionHeaders mainHeader={"All Orders"} />
      </div>
      <div className="text-xl text-center mt-4">
        No orders to show here.😞
      </div>
      {/* <div className="text-xl text-center mt-2">
        <Link href={'/menu'} className="underline">Order now &raquo;😍</Link>
      </div> */}
      </section>
  );
}

  return (
    <section className="mt-8 mb-24 max-w-xl mx-auto">
        <div>
            <UserTabs isAdmin={true}/>
        </div>
      <div className="text-center mt-8">
        <SectionHeaders mainHeader={"All Orders"} />
      </div>
      <div>
        <div className=" gap-8 my-8 ">
          <div>
            {orders.length > 0 &&
              orders.map((order, idx) => (
                <div key={order._id} className="my-4 border-b border-black">
                <div className="flex justify-between items-center text-center">
                    <div className="text-primary text-xl italic font-semibold my-2">
                        {"Order #" + (idx + 1)}
                    </div>
                    <div >
                        <DeleteButton label={''} onDelete={()=>handleDeleteClick(order._id)}  className="border-0 text-2xl text-primary"/>
                    </div>
                </div>
                  {/* <div >{order.total}</div>
                                    <div>{order.cartProducts[0].itemName}</div> */}
                  {order.cartProducts.length > 0 &&
                    order.cartProducts.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4  items-center border-b py-2"
                      >
                        <div className="w-24">
                          <img
                            width={240}
                            height={240}
                            src={product.image}
                          ></img>
                        </div>
                        <div className="grow">
                          <h3 className="capitalize font-semibold">
                            {product.itemName}
                          </h3>
                          {product.size && (
                            <div className="text-sm text-gray-900 capitalize">
                              Size:<span>{product.size.name}</span>
                            </div>
                          )}
                          {product.extras.length > 0 && (
                            <div className="text-sm text-gray-500 capitalize">
                              {product.extras.map((extra, indx) => (
                                <div key={indx}>
                                  {extra.name} &#8377;{extra.price}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-lg font-semibold">
                          &#8377;{cartProductPrice(product)}
                        </div>
                      </div>
                    ))}
                    <div className="py-4  justify-between flex flex-wrap text-lg  gap-1 items-center">
                        <div className="flex  justify-between">
                            <div className="text-gray-500 md:text-right">
                                Placed:<br/>
                                Ordered By:
                            </div>
                            <div className="text-lg font-semibold pl-2 ">
                                {new Date(order.createdAt).toLocaleString()}<br/>
                                {order.userEmail||order.phone}
                            </div>
                        </div>
                        <div className="flex items-center justify-end md:text-right">
                            <div className="text-gray-500">
                                Delivery charge:<br/>
                                Total Amount:
                            </div>
                            <div className="text-lg font-semibold pl-2 ">
                                &#8377;50<br/>
                                &#8377;{order.total}
                            </div>
                        </div>
                    </div>
                        <div className="flex md:justify-end -mt-3 mb-4 md:ml-2"> 
                          {order.paid && (
                            <div className="bg-green-500 py-2 px-4 rounded-lg text-white ">
                              Paid
                            </div>
                          )}
                          {!order.paid && (
                            <div className="bg-red-500 py-2 px-4 rounded-lg text-white ">
                              Not Paid
                            </div>
                          )}
                        </div>
                </div>
                
              ))}
              
          </div>
        </div>
      </div>
    </section>
  );
}
