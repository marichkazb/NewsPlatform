import React, {useState} from 'react'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks} from './NavbarElements'
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib'


const Navbar  = () => {
   const [click, setClick] = useState(false) 

   const handleClick = () => setClick(!click);
   

   return (
      <>
         <IconContext.Provider value={{color: '#fff' }}>
         <Nav> 
            <NavbarContainer>
               <NavLogo to='/'>
                  News site
               </NavLogo>
               <MobileIcon onClick={handleClick}> 
                  {click ? <FaTimes /> : <FaBars />}
               </MobileIcon>
               <NavMenu onClick={handleClick} click={click}>
                  <NavItem>
                     <NavLinks to='/' > My account </NavLinks>
                     
                  </NavItem>
               </NavMenu> 
               </NavbarContainer> 
            </Nav>
         </IconContext.Provider>
      </>
   )
}

export default Navbar ;
