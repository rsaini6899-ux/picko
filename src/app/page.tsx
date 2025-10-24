'use client'
import Image from "next/image";
import Navbar from '@/app/copmonents/navbar/page'
import Header from '@/app/copmonents/header/page'
import ExploreMenu from '@/app/copmonents/exploreMenu/page'
import FoodDisplay from '@/app/copmonents/foodDispaly/page'
import Footer from '@/app/copmonents/footer/page'
import AppDownload from '@/app/copmonents/appDownload/page'
import { useState } from "react"

export default function Home() {

  const [category, setCategory] = useState('All')

  return (
 <>
 {/* <Navbar/> */}
 <Header/>
 <ExploreMenu category={category} setCategory={setCategory} />
 <FoodDisplay category={category}/>
 <AppDownload/>
 {/* <Footer/> */}
 </>
  )
}
