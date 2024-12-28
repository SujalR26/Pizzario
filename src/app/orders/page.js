"use client";
import Link from "next/link";
import { cartProductPrice } from "../../components/AppContext";
import SectionHeaders from "../../components/layout/SectionHeaders";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api/orders").then((res) => {
      res.json().then((data) => {
        console.log(data);
        setOrders(data);
      });
    });
  }, []);
  if(orders?.length===0){
    return(
      <section className="mt-8 mb-24 max-w-xl mx-auto">
        <div className="text-center mt-8">
          <SectionHeaders mainHeader={"My Orders"} />
        </div>
        <div className="text-xl text-center mt-4">
          No orders Placed.😞
        </div>
        <div className="text-xl text-center mt-2">
          <Link href={'/menu'} className="underline">Order now &raquo;😍</Link>
        </div>
        </section>
    );
  }
  return (
    <section className="mt-8 max-w-xl mx-auto">
      <div className="text-center">
        <SectionHeaders mainHeader={"My Orders"} />
      </div>
      <div>
        <div className=" gap-8 mt-8">
          <div>
            {orders?.length > 0 &&
              orders.map((order, idx) => (
                <div key={order._id}>
                  <div className="text-primary text-lg italic font-semibold mt-4">
                    {"Order #" + (idx + 1)}
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
                    <div className="py-4 text-right justify-between flex text-lg gap-1 items-center">
                        <div className="flex ">
                            <div className="text-gray-500">
                                Placed:
                            </div>
                            <div className="text-lg font-semibold pl-2 ">
                                {new Date(order.createdAt).toLocaleString()}
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <div className="text-gray-500">
                                Delivery charge:<br/>
                                Total:
                            </div>
                            <div className="text-lg font-semibold pl-2 ">
                                &#8377;50<br/>
                                &#8377;{order.total}
                            </div>
                        </div>
                    </div>
                        <div className="flex justify-end -mt-3 mb-4 ml-2"> 
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
