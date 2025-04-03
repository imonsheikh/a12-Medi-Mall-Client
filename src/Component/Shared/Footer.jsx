import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa6';
import navLogo from '../../assets/navLogo.png';
import { FaInstagramSquare } from 'react-icons/fa';

const Footer = () => {
  return (
<div className=' bg-custom-custom'>
<footer className="footer justify-between px-4  mb-2 mx-auto pt-16 pb-10 rounded-2xl lg:px-64    text-base-content">
      <aside className=''> 
      <img className=" w-[200px] lg:w-[300px]" src={navLogo} alt="" />
        <div className=' lg:w-[400px]'>
        <p className=' text-base'>
        Your trusted online marketplace for all things health. Discover authentic medicines from verified vendors. With our commitment to quality and convenience, we are here to support your wellness journey.
        </p>
        <div className=" justify-center md:justify-start  flex flex-row  gap-4 mt-5">
            <a className=" text-3xl text-slate-400 cursor-pointer"><FaFacebook /></a>
            <a className=" text-3xl text-slate-400 cursor-pointer"><FaInstagramSquare /></a>
            <a className=" text-3xl text-slate-400 cursor-pointer"><FaTwitter /></a>
            <a className=" text-3xl text-slate-400 cursor-pointer"><FaGithub /></a>
        </div>
        </div>
      </aside>
      <nav className=' pt-10'>
        <h6 className="footer-title text-lg">CONTACT INFO</h6>
        <a className="">Call Us Free:</a>
        <a className=" text-xl">01709XXXXXX</a>
        <a className="link link-hover text-base">561 Wellington Road, <br /> Street 32, San Francisco</a>
        <a className="link link-hover text-base">medimall@gmail.com</a>
        <a className="link link-hover text-base">Hours: 10:00 – 18:00, Mon – Sat</a>
      </nav>
      <nav className=' pt-10'>
        <h6 className="footer-title text-lg">INFOMATION</h6>
        <a className="link link-hover text-base">About us</a>
        <a className="link link-hover text-base">Contact</a>
        <a className="link link-hover text-base">Term & Conditions</a>
        <a className="link link-hover text-base">Faq</a>
        <a className="link link-hover text-base">Delivery & Return</a>
        <a className="link link-hover text-base">Support Center</a>
      </nav>
      <nav className=' pt-10'>
        <h6 className="footer-title text-lg">CUSTOMER SERVICES</h6>
        <a className="link link-hover text-base">Customer Services</a>
        <a className="link link-hover text-base">Shipping Return</a>
        <a className="link link-hover text-base">Track Your Order</a>
        <a className="link link-hover text-base">Store Locations</a>
        <a className="link link-hover text-base">Help Center</a>
      </nav>
    </footer>
    <div className=''>
    <p className='pb-5 text-center '>2024 © all right reserved by MediMall</p>
    </div>
</div>
  );
};

export default Footer;
