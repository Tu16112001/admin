import React from 'react'
import  { Header } from '../Header/index'

const DefaultComponent = ({children}) => {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default DefaultComponent