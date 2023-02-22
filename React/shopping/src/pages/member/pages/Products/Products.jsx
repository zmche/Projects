import React, { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../../../../services/Products-services';
import debounce from 'lodash/debounce';
import ProductCard from './components/ProductCard';

import './Products.css'

import { MagnifyingGlass, ArrowUp, ArrowDown } from 'phosphor-react'

//MUI
import Pagination from '@mui/material/Pagination';
import { Button, Grid } from '@mui/material';
import Loading from './components/Loading';
import ProductFilter from './components/ProductFilter';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';



const Products = () => {

  const totalItems = 20;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [isloading, setIsloading] = useState(true);
  const [order, setOrder] = useState('asc')
  const [name, setname] = useState('');
  const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / limit));
  const [searchResult, setSearchResult] = useState(false);


  useEffect(() => {
    fetchProducts(page, limit)
      .then(data => {
        setProducts(data)
        setIsloading(false);
      })
      .catch(err => console.log(err))
  }, []);

  const getProducts = async (newPage, limit, ordering, maxValue, minValue) => {
    const data = await fetchProducts(newPage, limit, ordering, maxValue, minValue);
    setProducts(data);
    setIsloading(false);
  }

  const handlePaginationChange = (e, newPage) => {
    setPage(newPage);
    getProducts(newPage);
  };

  const sortHandler = () => {
    setIsloading(true);
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
    getProducts(page, limit, newOrder);
  }

  const handleFilter = (maxValue, minValue) => {
    getProducts(page, limit, order, maxValue, minValue)
  }

  const searchProducts = async (input) => {
    setIsloading(true);
    let url = 'http://localhost:8000/products?'
    const Atoken = localStorage.getItem("authToken");

    if (input) {
      url += `q=${input}`;
    }
    const response = await fetch(url,
      {
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${Atoken}`
        }),
      });
    const data = await response.json();
    setTotalPages(1);
    setProducts(data);

    if (data) {
      setIsloading(false);
    }

    if (data.length === 0) {
      setSearchResult(true)
    }
  }

  const debouncedSearch = debounce(searchProducts, 400);
  const search = useCallback(debouncedSearch, []);

  useEffect(() => {
    if (name === '') {
      setTotalPages(Math.ceil(totalItems / limit))
      getProducts(page, limit)
      setSearchResult(false)
      // tu serchi carieli iyo yvela produqti moqonda ert gverdze amito gavakete es
    } else {
      search(name);
    }
  }, [name])



  return (
    <div>
      <Grid container item xs={12} justifyContent='center'>
        <Grid container item xs={12} justifyContent='center'>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">Search</InputLabel>
            <FilledInput
              onChange={e => setname(e.target.value)}
              id="filled-adornment-amount"
              startAdornment={<InputAdornment position="start"><MagnifyingGlass size={20} /></InputAdornment>}
            />
          </FormControl>
        </Grid>
      </Grid>
      {searchResult && <p>Nothing can be found.</p>}

      {isloading &&
        <Grid container item xs={12} justifyContent='center'>
          <Loading />
        </Grid>
      }

      {!isloading &&
        <Grid container spacing={1} margin={2}>

          <Grid container item md={2} xs={12} sm={12}>
            <ProductFilter maxPrice={0} minPrice={0} handleChange={handleFilter} />
          </Grid>

          <Grid container item md={8} xs={12} sm={12} spacing={2} justifyContent='center'>
            {products.map(item => (
              <Grid lg={4} md={6} sm={10} item key={item.id}>
                <ProductCard {...item} />
              </Grid>
            ))}
          </Grid>

          <Grid container item md={2} xs={12} spacing={1}>
            <Button
              variant='outlined'
              className='pricebtn'
              onClick={sortHandler}
            >
              price {order === 'asc' ? <ArrowUp size={15} /> : <ArrowDown size={15} />}
            </Button>
          </Grid>

          <Grid container item xs={12} justifyContent='center'>
            <Pagination count={totalPages} page={page} onChange={handlePaginationChange} />
          </Grid>

        </Grid>
      }
    </div>
  )
};

export default Products;

