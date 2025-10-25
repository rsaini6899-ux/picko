"use client";
import { useEffect, useState, useRef, useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuBaggageClaim } from "react-icons/lu";
import { CiMenuBurger } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { StoreContext } from "@/app/context/StoreContext";
import { assets } from "@/app/frontend_assets/assets";
import { useRouter } from "next/navigation";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [sidebar, setSidebar] = useState(false);
  const underlineRef = useRef(null);
  const menuRefs = {
    home: useRef(null),
    menu: useRef(null),
    "mobile-app": useRef(null),
    "contact-us": useRef(null),
  };

  const router = useRouter

  const logout = () => {
   localStorage.removeItem('Picko.')
   setToken('')
   router.push('/')
  }

  useEffect(() => {
    const currentRef = menuRefs[menu]?.current;
    const underline = underlineRef.current;
    if (currentRef && underline) {
      underline.style.width = `${currentRef.offsetWidth}px`;
      underline.style.left = `${currentRef.offsetLeft}px`;
    }
  }, [menu]);

  return (
    <div className="relative mb-5 mt-4">
      {sidebar ? (
        <div className="absolute flex z-50 block sm:hidden top-0 left-0 w-full min-h-screen bg-white">
          <div>
            <span
              onClick={() => setSidebar(false)}
              className="absolute right-1 text-2xl"
            >
              <RxCross2 />
            </span>
          </div>
          <ul className="text-gray-600 space-y-2">
            <Link
              href="/"
              ref={menuRefs["home"]}
              onClick={() => setMenu("home")}
              className={`cursor-pointer capitalize ${
                menu === "home" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              home
            </Link>
            <a
              href="#menu"
              ref={menuRefs["menu"]}
              onClick={() => setMenu("menu")}
              className={`cursor-pointer capitalize ${
                menu === "menu" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              menu
            </a>
            <a
              href="#mobileApp"
              ref={menuRefs["mobile-app"]}
              onClick={() => setMenu("mobile-app")}
              className={`cursor-pointer capitalize ${
                menu === "mobile-app" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              mobile app
            </a>
            <a
              href="#footer"
              onClick={() => setMenu("contact-us")}
              className={`cursor-pointer capitalize ${
                menu === "contact-us" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              contact us
            </a>
          </ul>
        </div>
      ) : null}

      <div className="flex justify-between items-center relative">
        <span className="sm:hidden text-2xl" onClick={() => setSidebar(true)}>
          <CiMenuBurger />
        </span>

        <Link href="/">
          <p className="text-orange-500 font-bold text-2xl">Picko.</p>
        </Link>

        {/* <div className="hidden sm:block">
          <div className="flex gap-6 text-gray-600 relative">
            {["home", "menu", "mobile-app", "contact-us"].map((item) => (
              <span
                key={item}
                ref={menuRefs[item]}
                onClick={() => setMenu(item)}
                className={`cursor-pointer capitalize ${
                  menu === item ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {item.replace("-", " ")}
              </span>
            ))}
            <span
              ref={underlineRef}
              className="absolute bottom-0 h-[2px] bg-blue-600 transition-all duration-300"
              style={{ position: "absolute" }}
            ></span>
          </div>
        </div> */}

        <div className="hidden sm:block">
          <ul className="flex gap-6 text-gray-600 relative">
            <Link
              href="/"
              ref={menuRefs["home"]}
              onClick={() => setMenu("home")}
              className={`cursor-pointer capitalize list-none ${
                menu === "home" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              home
            </Link>
            <a
              href="#menu"
              ref={menuRefs["menu"]}
              onClick={() => setMenu("menu")}
              className={`cursor-pointer capitalize list-none ${
                menu === "menu" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              menu
            </a>
            <a
              href="#mobileApp"
              ref={menuRefs["mobile-app"]}
              onClick={() => setMenu("mobile-app")}
              className={`cursor-pointer capitalize list-none ${
                menu === "mobile-app" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              mobile app
            </a>
            <a
              href="#footer"
              ref={menuRefs["contact-us"]}
              onClick={() => setMenu("contact-us")}
              className={`cursor-pointer capitalize list-none ${
                menu === "contact-us" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              contact us
            </a>

            {/* Animated underline */}
            <span
              ref={underlineRef}
              className="absolute bottom-0 h-[2px] bg-blue-600 transition-all duration-300"
              style={{ position: "absolute" }}
            ></span>
          </ul>
        </div>

        <div className="flex gap-6 items-center">
          <span className="text-xl">
            <IoSearchOutline />
          </span>
          <div className="relative">
            <Link href="/pages/cart" className="text-xl text-blue-800">
              <LuBaggageClaim />
            </Link>
            <div
              className={
                getTotalCartAmount() === 0
                  ? ""
                  : "h-2 w-2 bg-red-500 absolute rounded-xl -top-1 left-4"
              }
            ></div>
          </div>
          {!token ? (
            <button
              onClick={() => setShowLogin(true)}
              className="text-blue-500 cursor-pointer text-sm hidden sm:block hover:bg-blue-500 hover:text-white border p-1  px-3 rounded-2xl"
            >
              sign in
            </button>
          ) : (
            <div className="relative group ">
              <img src={assets.profile_icon.src} alt="" />
              <ul className="absolute w-27 right-0 z-10 hidden group-hover:flex flex-col  gap-[10px] bg-[#fff2ef] p-[10px] border border-orange-500 outline-2 outline-white">
                <Link href='/pages/myorders' className="flex items-center gap-2 cursor-pointer text-sm">
                  <img className="w-5" src={assets.bag_icon.src} alt="" />
                  <p className="hover:text-orange-500">Orders</p>
                </Link>
                <hr />
                <li className="flex items-center gap-2 cursor-pointer text-sm">
                  <img className="w-5" src={assets.logout_icon.src} alt="" />
                  <p onClick={logout} className="hover:text-orange-500">Logout</p>
                </li>
              </ul>
            </div>
          )}

          <button className="text-blue-500 sm:hidden text-xl">
            <FaRegCircleUser />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
