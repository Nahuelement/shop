import type { GetStaticProps, NextPage } from 'next';
import { Box, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { Footer, FullScreenLoading } from '../../components/ui';
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


    if(typeof document!='undefined'){

      const textWrapper = document.querySelector('.ml16');
      textWrapper!.innerHTML = textWrapper!.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");
      setIsLoad(true)

    }
    anime.timeline({loop: false})
  .add({
    targets: '.ml16 .letter',
    delay:2500
  })
  .add({
    targets: '.ml16 .letter',
    opacity: [0,1],
    translateY: [-100,0],
    easing: "easeOutExpo",
    duration: 2000,
    delay: (el, i) => 50 * i
  })


  }, [])




  return (
    <ShopLayout title={'Shoping - Mujer'} pageDescription={'Encuentra los mejores productos de Teslo para ellas'}>
        {/* <Typography variant='h1' component='h1'>Mujeres</Typography> */}

      <Grid container item xs={10} lg={12} pt={8} position='relative'
          sx={{  flexDirection:'row',

          }}
          justifyContent='center'

          alignItems='center'

          >

        <Typography

        className="ml16" variant='h1' sx={{ display:{xs:'none',lg:isLoad?'flex':'none'},

          fontSize:{sm:'3.2em'},
          // letterSpacing:{xs:".-05em !important", lg:"-2em !important"},
          // wordSpacing:{xs:"-.335em !important", lg:"1em !important"}




           }}>Productos&nbsp;para&nbsp;ellas</Typography>

      </Grid >






        <ProductList products={ products } />



        <Footer />

    </ShopLayout>
  )
}



export const getStaticProps: GetStaticProps = async (ctx) => {

  await db.connect();
  const products = await Product.find({gender:'women'})
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


export default WomenPage
