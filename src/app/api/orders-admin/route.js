import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "../../../app/models/Order";

export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
    const session=await getServerSession(authOptions);
    const userEmail=session?.user?.email;
    return Response.json(
        await Order.find({})
    )
}

export async function DELETE(req){
    mongoose.connect(process.env.MONGO_URL);
    const url =new URL(req.url);
    const _id=url.searchParams.get('_id');
    await Order.deleteOne({_id});
    return Response.json(true);
}