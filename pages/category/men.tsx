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
       <Box display='flex' justifyContent='center' >


          <h1
          style={{
            display:isLoad?'flex':'none'
          }}
          className="ml15">

        <Typography className="word" variant='h1' sx={{
          mb: 2,
           pt:3,
           marginRight:{xs:'5vw',sm:'0vw'},
           marginTop:{xs:'4vw',sm:'0vw'}
          }}>Productos &nbsp;</Typography>


        <Typography className="word"  variant='h1' sx={{ mb: 2, pt:3}}>de moda &nbsp;</Typography>


        <Typography className="word" variant='h1' sx={{ mb: 2, pt:3}}>para ellos</Typography>

      </h1>


        {/* <Typography variant='h1' sx={{ mb: 2, pt:3}}>Productos de moda para ellos</Typography> */}
        </Box>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }




    </ShopLayout>
  )
}

export default MenPage
