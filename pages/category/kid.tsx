import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';


const KidPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?gender=kid');


  return (
    <ShopLayout title={'Teslo-Shop - Kids'} pageDescription={'Encuentra los mejores productos de Teslo para niños'}>
         <Box display='flex' justifyContent='center'>
        <Typography variant='h1' sx={{ mb: 2, pt:3}}>Productos de moda para niños</Typography>
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
