import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';


interface Props {
    editable?: boolean;
    products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }

    const productsToShow = products ? products : cart;


    return (
        <>
            {
                productsToShow.map( product => (
                    <Grid container spacing={2}
                    sx={{
                        display:'flex',
                        flexDirection:{xs:'center',sm:'start'},
                        mb:1,maxHeigth:'100px'
                    }}
                     key={ product.slug + product.size } >
                        <Grid item xs={12} sm={3}
                            sx={{display:'flex', justifyContent:'center'}}
                        >
                            {/* TODO: llevar a la página del producto */}
                            <NextLink href={`/product/${ product.slug }`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={ `${ product.image }` }
                                            component='img'

                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={10} sm={3}
                            sx={{display:'flex', justifyContent:'center'}}
                        >
                            <Box display='flex' flexDirection='column' pt={9}>
                                <Typography variant='body1'>{ product.title }</Typography>
                                <Typography variant='body1'>Talla: <strong>{ product.size }</strong></Typography>
                                    <br/>

                                {
                                    editable
                                    ? (
                                        <ItemCounter
                                            currentValue={ product.quantity }
                                            maxValue={ 10 }
                                            updatedQuantity={ ( value ) => onNewCartQuantityValue(product as ICartProduct, value )}
                                        />
                                    )
                                    : (
                                        <Typography className='fontStyle' sx={{mt:'-3vh'}} variant='h5'>{ product.quantity } { product.quantity > 1 ? 'productos':'producto' }</Typography>
                                    )
                                }

                            </Box>
                        </Grid>
                        <Grid item xs={2} sm={3}
                            sx={{display:'flex', justifyContent:'center'}} display='flex'  alignItems='center' flexDirection='column'>
                            <Box pt={9}>
                            <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>

                            {
                                editable && (
                                    <Button
                                        variant='text'
                                        color='secondary'
                                        onClick={ () => removeCartProduct( product as ICartProduct ) }
                                    >
                                        Remover
                                    </Button>
                                )
                            }
                        </Box>
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
