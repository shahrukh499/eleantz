import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className='bg-[#f8fafc] pt-20 pb-12'>
        <div className='container mx-auto px-4'>
            <div className='w-full lg:w-[65%]'>
                <div>
                    <div className='flex flex-wrap gap-x-10'>
                        <div className=''>
                            <h3 className='font-bold'>Services</h3>
                            <ul>
                                <li>
                                    <Link href='/' className='text-[13px]'>Amazone</Link>
                                </li>
                                <li>
                                    <Link href='/' className='text-[13px]'>Walmart</Link>
                                </li>
                            </ul>
                        </div>
                        <div className=''>
                            <h3 className='font-bold'>Our Tech</h3>
                            <ul>
                                <li>
                                    <Link href='/' className='text-[13px]'>Amazone</Link>
                                </li>
                            </ul>
                        </div>
                        <div className=''>
                            <h3 className='font-bold'>Company</h3>
                            <ul>
                                <li>
                                    <Link href='/' className='text-[13px]'>Amazone</Link>
                                </li>
                                <li>
                                    <Link href='/' className='text-[13px]'>Walmart</Link>
                                </li>
                            </ul>
                        </div>
                        <div className=''>
                            <h3 className='font-bold'>Resources</h3>
                            <ul>
                                <li>
                                    <Link href='/' className='text-[13px]'>Amazone</Link>
                                </li>
                                <li>
                                    <Link href='/' className='text-[13px]'>Walmart</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <h3 className='font-bold mb-5'>Socials</h3>
                        <div>
                            <ul className='flex gap-x-3'>
                                <li className='bg-orange-400 rounded flex justify-center flex-col'>
                                    <Link href='/' className='text-[13px] p-3'>
                                        <Image src='/assets/icons/tiktok.svg' alt='facebook' width={20} height={20} />
                                    </Link>
                                </li>
                                <li className='bg-orange-400 rounded flex justify-center flex-col'>
                                    <Link href='/' className='text-[13px] p-3'>
                                        <Image src='/assets/icons/facebook.svg' alt='facebook' width={20} height={20} />
                                    </Link>
                                </li>
                                <li className='bg-orange-400 rounded flex justify-center flex-col'>
                                    <Link href='/' className='text-[13px] p-3'>
                                        <Image src='/assets/icons/linkedin.svg' alt='facebook' width={20} height={20} />
                                    </Link>
                                </li>
                                <li className='bg-orange-400 rounded flex justify-center flex-col'>
                                    <Link href='/' className='text-[13px] p-3'>
                                        <Image src='/assets/icons/instagram.svg' alt='facebook' width={20} height={20} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <Image src='/assets/img/eleantz-logo.webp' alt='' width={150} height={82} />
                        <p className='text-[18px] font-semibold'>Your brand deserves better. Around here, we call that BTR.</p>
                    </div>
                    <div className='mt-10'>
                        <p className='text-[10px] text-gray-500'>Copyright © 2025, BTR Media. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer