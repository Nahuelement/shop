import { FC } from 'react'
import { Box, Grid } from '@mui/material'
import { IProduct } from '../../interfaces'
import { ProductCard } from '.'


interface Props {
    products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {

  return (
    <Grid container spacing={{xs:0,sm:3}} paddingLeft={{xs:1,sm:4}} pt={8} xs={12}  display='flex' justifyContent='center' alignItems='center'>

        {
            products.map( product => (
                <ProductCard
                    key={ product.slug }
                    product={ product }
                />
            ))
        }


    </Grid>
  )
}
