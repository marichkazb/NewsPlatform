import React, {useState} from 'react'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, Search} from './NavbarElements'
import { FaBars, FaTimes } from 'react-icons/fa';
import { TextInput } from 'react-native'
import { IconContext } from 'react-icons/lib'
import Icon from 'react-native-vector-icons/Ionicons';


const Navbar  = () => {
   const [click, setClick] = useState(false) 

   const handleClick = () => setClick(!click);
   

   return (
      <>
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
                     <Search to='/'>Search</Search>
                     <NavLinks to='/' > My account </NavLinks>

                  </NavItem>
               </NavMenu> 
               </NavbarContainer> 
            </Nav>
      </>
   )
}

export default Navbar ;
