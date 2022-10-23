import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
import { useEffect, useState } from 'react';
import anime from 'animejs'


const KidPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?gender=kid');
  const [isLoad, setIsLoad] = useState(false)


  useEffect(() => {
    anime.timeline({loop: false})
    .add({
      targets: '.ml15 .word',
      scale: [14,1],
      opacity: [0,1],
      easing: "easeOutCirc",
      duration: 900,
      delay: (el, i) => 800 * i
    })
    setIsLoad(true)
  }, [])


  return (
    <ShopLayout title={'Teslo-Shop - Kids'} pageDescription={'Encuentra los mejores productos de Teslo para niños'}>
         <Box display='flex' justifyContent='center'>
         <h1
          style={{
            display:isLoad?'flex':'none'
          }}
          className="ml15">

        <Typography

        className="word" variant='h1' sx={{
          mb: 2,
          pt:3,
          marginRight:{xs:'5vw',sm:'0vw'},
          marginTop:{xs:'4vw',sm:'0vw'},

           }}>Productos &nbsp;</Typography>


        <Typography className="word"  variant='h1' sx={{ mb: 2, pt:3}}>de moda &nbsp;</Typography>


        <Typography className="word" variant='h1' sx={{ mb: 2, pt:3}}>para niños</Typography>

      </h1>
        </Box>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }




    </ShopLayout>
  )
}

export default KidPage
