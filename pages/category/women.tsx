import type { GetStaticProps, NextPage } from 'next';
import { Box, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
import { useEffect, useState } from 'react';
import anime from 'animejs';
import { Product } from '../../models';
import { IProduct } from '../../interfaces';
import { db } from '../../database';

interface Props {
  products:IProduct[]
}


const WomenPage: NextPage<Props> = ({products}) => {


  // const { products, isLoading } = useProducts('/products?gender=women');
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
    <ShopLayout title={'Teslo-Shop - Women'} pageDescription={'Encuentra los mejores productos de Teslo para ellas'}>
        {/* <Typography variant='h1' component='h1'>Mujeres</Typography> */}

        <Box
          sx={{ display:{xs:'none',sm:'flex'}, flexDirection:'row'
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


        <Typography className="word" variant='h1' sx={{ mb: 0, pt:0}}>para ellas</Typography>

      </Box>
      <Grid  container  sx={{display:{xs:'flex',sm:'none'}}}  display='flex' justifyContent='center' >
        <Grid item  display='flex' justifyContent='center' xs={12}>
        <Typography className='titleAllproduct'  variant='h1' sx={{ mb: 1 }}>Productos para ellas</Typography>
        </Grid>
        </Grid>



        <ProductList products={ products } />





    </ShopLayout>
  )
}
export const getStaticProps: GetStaticProps = async (ctx) => {



  await db.connect();
  const products = await Product.find({gender:'women'})
                              .select('title images price inStock slug -_id')
                              .lean();

  await db.disconnect();
  const updateProducts = products.map(product =>{
      product.images = product.images.map( image => {
          return image.includes('http') ? image : `${ process.env.HOST_NAME }products/${image}`
      })

      return product
  })





  return {
    props: {
      products:updateProducts
    }
  }
}

export default WomenPage
