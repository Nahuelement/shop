import type { NextPage } from 'next';
import { Box, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';

import { ProductList } from '../components/products';


import { FullScreenLoading } from '../components/ui';
import { GetStaticProps } from 'next'
import { IProduct } from '../interfaces/products';
import axios from 'axios';
import { Product } from '../models';
import { db } from '../database';

interface Props {
  products:IProduct[]
}

const HomePage: NextPage<Props> = ({products}) => {


  // const { products, isLoading } = useProducts('/products');


  return (
    <ShopLayout title={'Shoping - Home'} pageDescription={'Encuentras las mejores marcas en shoping'}>
        {/* <Typography variant='h1' component='h1'>Tienda</Typography> */}
        {/* <Grid  container  sx={{display:'flex'}}  display='flex' justifyContent='center' >
        <Grid item  display='flex' justifyContent='center' xs={12}>
        <Typography className='titleAllproduct'  variant='h1' sx={{ mb: 1 ,display:'flex', justifyContent:'center'}}>Todos los productos</Typography>
        </Grid>

        </Grid> */}

        {/* {
          isLoading
            ? <FullScreenLoading /> */}
        <Box sx={{
          paddingTop:{xs:10,sm:5}
        }}>
            <ProductList products={ products } />
        </Box>


        {/* } */}




    </ShopLayout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async (ctx) => {


  // const { gender = 'all' } = req.query;

  // let condition = {};

  // if ( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) ) {
  //     condition = { gender };
  // }

  await db.connect();
  const products = await Product.find()
                              .select('title images description price inStock slug -_id')
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



export default HomePage
