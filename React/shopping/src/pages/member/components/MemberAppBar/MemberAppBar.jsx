import React from 'react';
import clsx from 'classnames';
import { NavLink } from 'react-router-dom';

import { ShoppingCart, Storefront } from 'phosphor-react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import styles from './MemberAppBar.module.css';


const MemberAppBar = (props) => {
  const { onLogOut } = props;
  const name = localStorage.getItem("userName");

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/member/products"
            sx={{
              mr: 2,             
              color: 'inherit'             
            }}
          >
            <Storefront size={35} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { md: 'flex' }, gap: 2 }}>
            <NavLink to="/member/products" className={({ isActive }) => (clsx(styles.navlink, { [styles.active]: isActive }))}>
              <h4>Products</h4>
            </NavLink>
          </Box>

          <Box display="flex" justifyContent="centre" paddingRight='20px'>
            <h4>hello, {name}</h4>
          </Box>

          <Box display="flex" justifyContent="right">
            <NavLink to="/member/shopping-cart" className={({ isActive }) => (clsx(styles.navlink, { [styles.active]: isActive }))}>
              <ShoppingCart size={30} />
            </NavLink>
          </Box>

          <Box display="flex" justifyContent="right" paddingLeft='20px'>
            <Select value='' >
              <MenuItem >
                <span onClick={onLogOut}>Log Out</span>
              </MenuItem>

            </Select>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MemberAppBar;
