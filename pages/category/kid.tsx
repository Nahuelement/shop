import type { GetStaticProps, NextPage } from 'next';
import { Box, Grid, Typography } from '@mui/material';

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


      <Box pt={5}
          sx={{ display:{xs:'none',sm:isLoad?'flex':'none'}, flexDirection:'row'
          }}
          className="ml15"
          justifyContent='center'
          >

        <Typography

        className="word" variant='h1' sx={{
          mb: 0,
          pt:9,
          fontSize:{sm:'2.9em'}



           }}>Productos &nbsp;</Typography>


        <Typography className="word"  variant='h1' sx={{ mb: 0, pt:9,fontSize:{sm:'2.9em'}}}>de moda &nbsp;</Typography>


        <Typography className="word" variant='h1' sx={{ mb: 0, pt:9, fontSize:{sm:'2.9em'}}}>para niños</Typography>

      </Box>

      <Grid  container  sx={{display:{xs:'flex',sm:'none'}}} pt={10} display='flex' justifyContent='center' >
        <Grid item  display='block' justifyContent='center' xs={10}>
        <Typography className='titleAllproduct'  variant='h1' sx={{ mb: 1 }}>Productos para niños</Typography>
        </Grid>
        </Grid>


           <Grid>
           <ProductList products={ products } />
           </Grid>





    </ShopLayout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {







  await db.connect();
  const products = await Product.find({gender:'kid'})
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

export default KidPage
