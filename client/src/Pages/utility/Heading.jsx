import React, { useContext } from 'react'
import logoimage from "../../assets/Logo.svg";
import { ContextApi } from '../../contextApi';
import logoutuser from "../../assets/Logout.svg";
import "../../styles/heading.css";

const HeadNav = ({active=false, title, iconSvg}) => {
  const {logout} = useContext(ContextApi);
  return (
    <>
    <div className='d-flex align-items-center p-4 page-heading'>
      <div className='d-flex align-items-center heading-logo'>
        {active && iconSvg}
        <h4>
        {title}
        </h4>
      </div>
      <div className='imglogo-heading'>
        <img src={logoimage} alt=''/>
      </div>
      <div className='logout-heading'>
        <img src={logoutuser} alt='' onClick={()=>logout()}/>
      </div>

    </div>
  </>
  )
}

export default HeadNav