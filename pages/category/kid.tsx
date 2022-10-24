import type { GetStaticProps, NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
import { useEffect, useState ,FC} from 'react';
import anime from 'animejs'
import { db, SHOP_CONSTANTS } from '../../database';
import { Product } from '../../models';
import { IProduct } from '../../interfaces';

interface Props {
  products:IProduct[]
}


const KidPage: NextPage<Props> = ({products}) => {



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
            display:'flex',

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



           <ProductList products={ products } />





    </ShopLayout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {







  await db.connect();
  const products = await Product.find({gender:'kid'})
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

export default KidPage
