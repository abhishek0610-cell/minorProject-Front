import React from 'react'
import Sidebar from '../Sidebar/Sidebar'

const Layout = ({children}) => {
  return (
    <div>
        <Sidebar/>
        <div className='mx-96'>
            {children}

        </div>


    </div>
  )
}

export default Layout




