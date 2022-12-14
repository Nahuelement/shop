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
      opacity: [0,1],
      translateY: [-100,0],
      easing: "easeOutExpo",
      duration: 2000,
      delay: (el, i) => 50 * i
    })
    setIsLoad(true)
  }, [])


  return (
    <ShopLayout title={'Shoping - Niños'} pageDescription={'Encuentra los mejores productos de Teslo para niños'}>


<Grid container item xs={12} pt={8} position='relative'
          sx={{  flexDirection:'row',

          }}
          justifyContent='center'

          alignItems='center'

          >

        <Typography

        className="ml16" variant='h1' sx={{ display:{xs:'none',sm:isLoad?'flex':'none'},

          fontSize:{sm:'2.8em'}



           }}>Productos&nbsp; para &nbsp; niños</Typography>

      </Grid >



           <ProductList products={ products } />






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
