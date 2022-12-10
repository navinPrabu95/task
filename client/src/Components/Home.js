import React from 'react'
import {BiAddToQueue,BiListUl} from 'react-icons/bi'


const Home = () => {
  return (
    <div>
       <div className='home-ctn'>
         <div className='home-ctn-head'>
           <h1>Welcome You....</h1>
         </div>
         <div className='home-ctn-anc'>
          <a href='/addcustomer'><BiAddToQueue/></a> <br></br>
          <a href='/listcustomer'><BiListUl/></a>
         </div>
       </div>
    </div>
  )
}

export default Home