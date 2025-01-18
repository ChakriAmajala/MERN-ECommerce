import React, { useContext, useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ROLE from '../common/role'
import { FaRegHeart } from 'react-icons/fa'
import Context from '../context'

const MyProfile = () => {
  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate()
  const context = useContext(Context)

  useEffect(()=>{
    if(user?.role !== ROLE.GENERAL){
      navigate("/")
    }
  },[user])

  return (
    <div className='min-h-[calc(100vh-65px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
        <div className='h-40 flex justify-center items-center flex-col'>
        <div className='text-5xl cursor-pointer relative flex justify-center' >
             {
                 user?.profilePic ? (
                  <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name}/>
                ) : (
                  <FaRegCircleUser/>
                 )
             }
            
        </div>
        <p className='capitalize text-lg font-semibold'>{user?.name}</p>
            <p className='text-sm'>{user?.role}</p>
        </div>
        {/***navigation */}
        <div>
          <nav className='p-4 flex gap-8'>
            
            <Link to={"wishlist"} className='px-2 py-1 hover:bg-slate-100'>WishList</Link>
            {
                                 user?._id && (
                                  <Link to={"wishlist"} className='text-2xl relative'>
                                      <span><FaRegHeart /></span>
                  
                                      <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                                          <p className='text-sm'>{context?.wishlistProductCount}</p>
                                      </div>
                                  </Link>
                                  )
                              }
            
            
            
          </nav>
        </div>
      </aside>
      <main className='w-full h-full p-2'>
        <Outlet/>
      </main>
    </div>
  )
}


export default MyProfile
