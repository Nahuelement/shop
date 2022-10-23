import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';

import { FullScreenLoading } from '../../components/ui';


const MenPage: NextPage = () => {


  const { products, isLoading } = useProducts('/products?gender=men');


  return (
    <ShopLayout title={'Teslo-Shop - Men'} pageDescription={'Encuentra los mejores productospara ellos'}>
       <Box display='flex' justifyContent='center'>
        <Typography variant='h1' sx={{ mb: 2, pt:3}}>Productos de moda para ellos</Typography>
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
