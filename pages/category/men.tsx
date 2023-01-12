import type { GetStaticProps, NextPage } from 'next';
import { Box, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';
import { useEffect, useState } from 'react';
import anime from 'animejs'
import { Product } from '../../models';
import { IProduct } from '../../interfaces';
import { db } from '../../database';

interface Props {
  products:IProduct[]
}


const MenPage: NextPage<Props> = ({products}) => {


  // const { products, isLoading } = useProducts('/products?gender=men');
  const [isLoad, setIsLoad] = useState(false)



  useEffect(() => {


    if(typeof document!='undefined'){

      const textWrapper = document.querySelector('.ml16');
      textWrapper!.innerHTML = textWrapper!.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");

    }


    anime.timeline({loop: false})
    .add({
      targets: '.ml16 .letter',
      delay:2500
    })
    .add({
      targets: '.ml16 .letter',
      translateY: [-100,0],
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 2000,
      delay: (el, i) => 50 * i
    })
    setIsLoad(true)
  }, [])



  return (
    <ShopLayout title={'Shoping - Hombres'} pageDescription={'Encuentra los mejores productospara ellos'}>


<Grid container item pt={8} position='relative'
          sx={{  flexDirection:'row',

          }}
          justifyContent='center'

          alignItems='center'

          >

        <Typography

        className="ml16" variant='h1' sx={{ display:{xs:'none',sm:isLoad?'flex':'none'},

          fontSize:{sm:'2.8em'}



           }}>Productos&nbsp;para&nbsp;ellos</Typography>

      </Grid >










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



         <ProductList products={ products } />





    </ShopLayout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {







  await db.connect();
  const products = await Product.find({gender:'men'})
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

export default MenPage
