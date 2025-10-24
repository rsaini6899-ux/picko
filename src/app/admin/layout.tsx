'use client'
import { useRouter } from "next/navigation";
import { assets } from "../admin_assets/assets";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const handleGoAdd = () => {
        router.push('/admin/pages/add');
      };
      const handleGoList = () => {
        router.push('/admin/pages/list');
      };
      const handleGoOrders = () => {
        router.push('/admin/pages/orders');
      };
    
    return (
      <div className="">
        {/* navbar */}
        <div className="flex justify-between mt-1 items-center">
        <p className="text-orange-500 text-2xl font-bold">Picko.</p>
        <img className="w-10" src={assets.profile_image.src} alt="" />
        </div>
        <p>Admin panel</p>

        <hr className="h-[2px] border-none bg-gray-400" />

      {/* Main layout: Sidebar + Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[18%] border-[#a9a9a9] border-r min-h-screen">
          <div className="pt-[50px] pl-[20%] flex flex-col gap-[20px]">
            <div onClick={handleGoAdd} className="flex items-center gap-[12px] active:bg-white active:border-orange-500 border border-[#a9a9a9] border-r-0 p-[8px] rounded-sm cursor-pointer">
              <img src={assets.add_icon.src} alt="" />
              <p>Add Items</p>
            </div>
            <div onClick={handleGoList} className="flex items-center gap-[12px] active:bg-white active:border-orange-500 border border-[#a9a9a9] border-r-0 p-[8px] rounded-sm cursor-pointer">
              <img src={assets.order_icon.src} alt="" />
              <p>List Items</p>
            </div>
            <div onClick={handleGoOrders} className="flex items-center gap-[12px] active:bg-white active:border-orange-500 border border-[#a9a9a9] border-r-0 p-[8px] rounded-sm cursor-pointer">
              <img src={assets.order_icon.src} alt="" />
              <p>Order Items</p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
    );
  }
  