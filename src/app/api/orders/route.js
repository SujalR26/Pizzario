import mongoose, { mongo } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/app/models/Order";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);

    const {phone,streetAddress,city,postalCode,country,cartProducts,total}=await req.json();
    const session=await getServerSession(authOptions);
    const userEmail=session?.user?.email;
    const orderDoc=await Order.create({
        userEmail,phone,streetAddress,city,postalCode,country,cartProducts,paid:false,total
    });
    return Response.json(orderDoc);
}   

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL);
    const {_id}=await req.json();
    await Order.updateOne({_id},{paid:true});
    return Response.json(true);
}

export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
    const session=await getServerSession(authOptions);
    const userEmail=session?.user?.email;
    return Response.json(
        await Order.find({userEmail})
    )
}
