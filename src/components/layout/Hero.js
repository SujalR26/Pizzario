import Image from "next/image";
import Right from "../icons/Right";
import Link from 'next/link'; 
// import pizza from "../../../public/pizza.png"
export default function Hero(){
    return (
        <section className="hero md:mt-4">
            <div className="py-8 md:py-12">
                <h1 className="text-5xl font-semibold">Everything<br></br> is better<br/> with a <span className="text-primary">Pizza</span> </h1>
                <p className="my-6 text-gray-500 font-medium text-sm">Every slice of pizza is like a celebration of life's little victories—a cheesy, saucy reward for just making it through the day.</p>
                <div className="flex gap-4 text-sm">
                    <Link href={'/menu'} className="bg-primary uppercase flex gap-2 text-white px-4 py-2 rounded-full  items-center justify-center">Order now 
                        <Right></Right>
                    </Link>
                    <button className="text-gray-500 flex gap-2 py-2 rounded-full items-center border-0">Learn more <Right></Right></button>
                </div>
            </div>
            <div className="relative hidden md:block">
            <Image src={'/Pizza.webp'} layout="fill" objectFit="contain"  alt={'Pizza'}></Image>
            </div>
        </section>
    );
}
