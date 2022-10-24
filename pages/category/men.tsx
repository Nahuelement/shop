import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
import { useEffect, useState } from 'react';
import anime from 'animejs'


const MenPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?gender=men');
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
    <ShopLayout title={'Teslo-Shop - Men'} pageDescription={'Encuentra los mejores productospara ellos'}>

       {/* <Box display='flex' justifyContent='center' >


       <Box
          sx={{
            display:isLoad?'flex':'none',

            flexDirection:{xs:'column',sm:'row'}
          }}
          className="ml15">

        <Typography

        className="word" variant='h1' sx={{
          mb: 0,
          pt:0,



           }}>Productos &nbsp;</Typography>


        <Typography className="word"  variant='h1' sx={{ mb: 0, pt:0}}>de moda &nbsp;</Typography>


        <Typography className="word" variant='h1' sx={{ mb: 0, pt:0}}>para ellos</Typography>

      </Box>

        </Box> */}

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }




    </ShopLayout>
  )
}

export default MenPage
