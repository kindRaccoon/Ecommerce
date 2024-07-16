import React, { useState } from 'react'
import styled from 'styled-components';
import Search from '@mui/icons-material/Search'
import Badge from '@mui/material/Badge'
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { logoutSuccess } from '../redux/userRedux';
import { logout } from '../redux/apiCalls';



const Container = styled.div`
 height: 60px; 
`
const Wrapper = styled.div`
padding: 10px 20px;
display: flex;
justify-content: space-between;
`

const Left = styled.div`
flex:1;
`
const Language = styled.span`
font-size:14px;
cursor: pointer;
`
const SearchContainer = styled.div`
width: 180px;
border: 0.5px solid lightgray;
border-radius: 5px;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
`
const Input = styled.input`
border: none;
outline: none;
`
const Center = styled.div`
flex:1;
text-align: center;
`
const Logo = styled.h1`
font-weight: bold;
`
const Right = styled.div`
  flex:1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;  
`

function Navbar() {
    const quantity = useSelector(state => state.cart.quantity);
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    // const logout = () =>{
    //     dispatch(logfoutSuccess())
    // }

    const handleClick = (e) => {
        e.preventDefault();
        logout(dispatch)
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search' />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" style={{ "textDecoration": "none", "color": 'black' }} >
                        <Logo>Ecommerce</Logo>
                    </Link>
                </Center>
                <Right>
                    {user ? (
                        <Link to="/login" style={{ "textDecoration": "none" }}>
                            <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
                        </Link>

                    ) : (
                        <>
                            <Link to="/register" style={{ "textDecoration": "none" }}>
                                <MenuItem>RGISTER</MenuItem>
                            </Link>
                            <Link to="/login" style={{ "textDecoration": "none" }}>
                                <MenuItem>SING IN</MenuItem>
                            </Link>
                        </>
                    )
                    }
                    <Link to="/cart">
                        <MenuItem>
                            <Badge badgeContent={quantity} color='primary' />
                            <ShoppingCartOutlined />
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar