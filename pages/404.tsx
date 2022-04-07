import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const NotFound: NextPage = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center ">

      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-2xl">Something has gone wrong</h2>
      <Link href="/" passHref={true}>
        <p className="text-blue-700 hover:text-blue-600" >Return to home</p>
      </Link>


    </div>
  )
}

export default NotFound;
