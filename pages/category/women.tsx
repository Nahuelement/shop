import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';


const WomenPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?gender=women');


  return (
    <ShopLayout title={'Teslo-Shop - Women'} pageDescription={'Encuentra los mejores productos de Teslo para ellas'}>
        {/* <Typography variant='h1' component='h1'>Mujeres</Typography> */}
        <Box display='flex' justifyContent='center'>
        <Typography variant='h1' sx={{ mb: 2, pt:3}}>Productos de moda para ellas</Typography>
        </Box>

        {
          isLoading
            ? <FullScreenLoading />
            : <ProductList products={ products } />
        }




    </ShopLayout>
  )
}

export default WomenPage
