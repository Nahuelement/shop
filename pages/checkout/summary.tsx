import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { Link, Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
// import { countries } from '../../utils';


const SummaryPage = () => {

    const router = useRouter();
    const { shippingAddress, numberOfItems, createOrder } = useContext( CartContext );

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if ( !Cookies.get('firstName') ) {
            router.push('/checkout/address');
        }
    }, [ router ]);


    const onCreateOrder = async() => {
        setIsPosting(true);

        const { hasError, message } = await createOrder();

        if ( hasError ) {
            setIsPosting(false);
            setErrorMessage( message );
            return;
        }

        router.replace(`/orders/${ message }`);

    }



    if ( !shippingAddress ) {
        return <></>;
    }

    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;

  return (
    <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>

        <Grid container>
            <Grid item xs={ 12 } >
                <CartList />
            </Grid>
            <Grid item xs={ 12 } display='flex' flexDirection='column'>
                <Card className='summary-card'>
                    <CardContent
                    sx={{
                        display:'flex',
                        flexDirection:'row'

                    }}
                     >
                    <Grid container>
                        <Grid item xs={6}>
                        <Typography variant='h2'>Resumen ({numberOfItems} { numberOfItems === 1 ? 'producto':'productos' })</Typography>
                        <Divider sx={{ my:1 }} />
                        </Grid>
                        <Grid item xs={6}>
                        <Grid display='flex' justifyContent='end'>

                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Grid>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography variant='subtitle1'>Dirección de entrega</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography>{ firstName } { lastName }</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography>{ address }{ address2 ? `, ${address2}` : ''  } </Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography>{ city }, { zip }</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        {/* <Typography>{ countries.find( c => c.code === country )?.name }</Typography> */}
                        <Typography>{ country }</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography>{ phone }</Typography>
                        </Grid>

                    </Grid>

                        <Divider sx={{ my:1 }} />

                    <Grid container>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        </Grid>
                     <Grid item xs={12}>
                        <OrderSummary />
                    </Grid>
                        <Grid item xs={12} display="flex" flexDirection="row" justifyContent='center'>
                        <Box sx={{ mt: 3 }} >
                            <Button
                                color="secondary"
                                className='circular-btn'
                                fullWidth
                                onClick={ onCreateOrder }
                                disabled={ isPosting }
                            >
                                Confirmar Orden
                            </Button>


                            <Chip
                                color="error"
                                label={ errorMessage }
                                sx={{ display: errorMessage ? 'flex':'none', mt: 2 }}
                            />


                        </Box>
                        </Grid>
                     </Grid>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>


    </ShopLayout>
  )
}

export default SummaryPage;