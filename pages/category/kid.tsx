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


         <Box
          sx={{
            display:isLoad?'flex':'none',

            flexDirection:{xs:'column',sm:'row'}
          }}
          className="ml15"
          justifyContent='center'
          >

        <Typography

        className="word" variant='h1' sx={{
          mb: 0,
          pt:0,



           }}>Productos &nbsp;</Typography>


        <Typography className="word"  variant='h1' sx={{ mb: 0, pt:0}}>de moda &nbsp;</Typography>


        <Typography className="word" variant='h1' sx={{ mb: 0, pt:0}}>para niños</Typography>

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
