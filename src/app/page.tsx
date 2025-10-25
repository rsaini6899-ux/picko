'use client'
import Image from "next/image";
import Navbar from '@/app/copmonents/navbar/Navbar'
import Header from '@/app/copmonents/header/Header'
import ExploreMenu from '@/app/copmonents/exploreMenu/ExploreMenu'
import FoodDisplay from '@/app/copmonents/foodDispaly/FoodDisplay'
import Footer from '@/app/copmonents/footer/Footer'
import AppDownload from '@/app/copmonents/appDownload/AppDownload'
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
