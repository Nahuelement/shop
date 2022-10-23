import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next'
import NextLink from 'next/link';
import { signIn, getSession, getProviders } from 'next-auth/react';

import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { useRouter } from 'next/router';
import { Login } from '../../components/ui/Login';
import Image from 'next/image';





const LoginPage = () => {


    return (
        <AuthLayout title={'Ingresar'}>
    <Grid container className='backgroundAnimated'>
    <Grid item xs={12}  sx={{
         display:'flex'

    }}
    justifyContent='center' paddingTop='30vh' >
    <Login/>
    </Grid>
    {/* <Grid item xs={12}  lg={5} display='flex' justifyContent='start' pt='13vh'
    sx={{
        display:{xs:'none',lg:'flex'}
    }}

    >
    <Box sx={{
        pl:'1vw'
    }}>
    < Image
    width={540}
    height={630}
    src='https://res.cloudinary.com/nahuelement/image/upload/v1666211947/x0q74zwolhwvzqf5u9c5.jpg'
    layout="intrinsic"
    />
    </Box>
    </Grid> */}
    </Grid>





        </AuthLayout>
  )
}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });
    // console.log({session});

    const { p = '/' } = query;

    if ( session ) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: { }
    }
}



export default LoginPage