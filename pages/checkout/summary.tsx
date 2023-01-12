import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { Link, Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { FullScreenLoading } from '../../components/ui';
// import { countries } from '../../utils';


const SummaryPage = () => {

    const router = useRouter();
    const { shippingAddress, numberOfItems, createOrder } = useContext( CartContext );

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [viewResume, setViewResume] = useState(true)

    useEffect(() => {
        if ( !Cookies.get('firstName') ) {
            router.push('/checkout/address');
        }
    }, [ router ]);


    const onCreateOrder = async() => {
        setIsPosting(true);
        setViewResume(false)

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

    const { firstName, lastName, address, address2 = '', city, phone } = shippingAddress;

  return (
    <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1'sx={{marginBottom:2}} component='h1'>Resumen de la orden</Typography>

       { viewResume &&   <Grid container display='flex' justifyContent='center' alignContent='center'>
            <Grid item xs={ 10 } >
                <CartList />
            </Grid>
            <Grid item xs={ 10 }
             sx={
                {
                    display:{xs:'none',sm:'flex'}
                }
            }paddingBottom='4vh'
             display='flex' flexDirection='column'>
                <Card className='summary-card'>
                    <CardContent
                    sx={{
                        display:'flex',
                        flexDirection:'row'

                    }}
                     >
                    <Grid container>
                        <Grid item xs={12} >

                        <Box display='flex' justifyContent='end'>
                        <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
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
                        <Typography>{ city }</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        {/* <Typography>{ countries.find( c => c.code === country )?.name }</Typography> */}

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
                        <Grid item xs={12} display="flex" flexDirection="row" justifyContent='start'>
                        <Box sx={{ mt: 3 }} display="flex" flexDirection="row" justifyContent='center' >
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
            <Grid item xs={ 10 } sx={
                {
                    display:{xs:'flex',sm:'none'},
                    justifyContent:'center',
                    paddingBottom:'5vh',
                    paddingTop:'5vh'
                }
            }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({numberOfItems} { numberOfItems === 1 ? 'producto':'productos' })</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de entrega</Typography>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>


                        <Typography>{ firstName } { lastName }</Typography>
                        <Typography>{ address }{ address2 ? `, ${address2}` : ''  } </Typography>
                        <Typography>{ city }</Typography>
                        {/* <Typography>{ countries.find( c => c.code === country )?.name }</Typography> */}

                        <Typography>{ phone }</Typography>

                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>

                        <OrderSummary />

                        <Box sx={{ mt: 3 }}  display="flex" flexDirection="row" justifyContent='center'>
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

                    </CardContent>
                </Card>
            </Grid>
        </Grid>

        }
        {!viewResume && <FullScreenLoading/>}
    </ShopLayout>
  )
}

export default SummaryPage;