import Hero from '../components/layout/Hero';
import HomeMenu from '../components/layout/HomeMenu';
import SectionHeaders from '../components/layout/SectionHeaders';


export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu/>
      <section className='text-center my-16' id='about'>
        <SectionHeaders subHeader={'Our Story'} mainHeader={'About us'}/>
        <div className='max-w-xl mx-auto mt-4 text-gray-500 flex flex-col gap-2 text-left'>
          <p>Welcome to <span className='text-primary font-semibold text-xl'>Pizzario</span>, where passion for great food meets modern convenience. </p>
          <p><span className='font-bold'>Our mission is simple:</span> to bring you the freshest, most delicious meals at the click of a button.</p>

          <p>At the heart of our journey is a love for authentic flavors and unforgettable dining experiences. Whether it's a cheesy slice of pizza, a comforting bowl of pasta, or a quick snack to fuel your day, we believe every meal should be a moment to savor.</p>

          <h2 className='text-xl font-bold'>What sets us apart?</h2>

          <p><span className='font-semibold'>Quality Ingredients:</span> We partner with trusted suppliers to ensure every bite is bursting with freshness and flavor.</p>
          <p><span className='font-semibold'>Crafted with Care:</span> From our kitchens to your table, every dish is prepared with love and attention to detail.</p>
          <p><span className='font-semibold'>Fast & Reliable:</span> Hungry? We've got you covered. Our seamless ordering platform and swift delivery ensure your meal arrives fresh and on time.</p>
          <p>We started this journey with one goal in mind: to make great food accessible to everyone, no matter where they are. Over the years, we've grown into a community of food lovers who share our belief that good food is more than just nourishment—it's a way to connect, celebrate, and create memories.</p>

          <p>So, whether you're indulging in your favorite pizza or exploring new tastes, we're here to make your dining experience effortless and enjoyable. Thank you for letting us be part of your story—one delicious meal at a time.</p>

          <p><span className='font-semibold'>Our Promise:</span>
          Exceptional taste, unmatched convenience, and a commitment to putting you first.</p>
          
        </div>
      </section>
      <section className='text-center my-8' id='contact'>
        <SectionHeaders subHeader={"Don't Hesitate"} mainHeader={'Contact us'}/>
        <div className='mt-4 underline text-gray-600 flex flex-col gap-4'><a className='text-4xl' href='tel:+919301839393'>+91 9301839393</a>
        <a className='text-lg' href="mailto:sujalrathore26.sr@gmail.com">Email:sujalrathore26.sr@gmail.com</a>
        </div>
      </section>
      
    </>
  );
}
