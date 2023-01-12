import { AppBar, Box, Toolbar, Link, Button, Grid } from '@mui/material';
import React from 'react'
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export const SubBar = () => {

    const { asPath } = useRouter();

  return (


<Grid item  display='flex' justifyContent='center' xs ={12}p={1} pt={2}
    sx={{

    height:'1vh',

    }}

>


    <Box sx={{ display:'flex',width:'40vw' }}
        justifyContent='space-around'


        className="  fadeIn">
        <NextLink href='/category/men' passHref>
            <Link>
                <Button
                className='fontStyle'
                style={{fontSize:21}}
                   color={ asPath === '/category/men' ? 'primary':'info'}>Hombres</Button>
            </Link>
        </NextLink>
        <NextLink href='/category/women' passHref>
            <Link>
                <Button
                className='fontStyle'
                style={{fontSize:21}}
                color={ asPath === '/category/women' ? 'primary':'info'}>Mujeres</Button>
            </Link>
        </NextLink>
        <NextLink href='/category/kid' passHref>
            <Link>
                <Button
                className='fontStyle'
                style={{fontSize:21}}
                color={ asPath === '/category/kid' ? 'primary':'info'}>Niños</Button>
            </Link>
        </NextLink>
    </Box>


    </Grid>




  )
}
