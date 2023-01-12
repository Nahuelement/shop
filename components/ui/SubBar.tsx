import { AppBar, Box, Toolbar, Link, Button, Grid } from '@mui/material';
import React from 'react'
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export const SubBar = () => {

    const { asPath } = useRouter();

  return (


<Grid item  display='flex' justifyContent='center' xs ={12}p={1} pt={2}
    sx={{

    height:'5vh',

    }}

>


    <Box sx={{ display:'flex',width:'40vw' }}
        justifyContent='space-around'


        className="  fadeIn">
        <NextLink href='/category/men' passHref>
            <Link>
                <Button
                className='fontStyle'
                style={{fontSize:20,backgroundColor: asPath === '/category/men' ? '#402d2d':'whitesmoke',color: asPath === '/category/men' ? 'whitesmoke':'#402d2d'}  }
                >Hombres</Button>
            </Link>
        </NextLink>
        <NextLink href='/category/women' passHref>
            <Link>
                <Button
                className='fontStyle'
                style={{fontSize:20,backgroundColor: asPath === '/category/women' ? '#402d2d':'whitesmoke',color: asPath === '/category/women' ? 'whitesmoke':'#402d2d'}  }
                >Mujeres</Button>
            </Link>
        </NextLink>
        <NextLink href='/category/kid' passHref>
            <Link>
                <Button
                className='fontStyle'
                style={{fontSize:20,backgroundColor: asPath === '/category/kid' ? '#402d2d':'whitesmoke',color: asPath === '/category/kid' ? 'whitesmoke':'#402d2d'}  }
                >Niños</Button>
            </Link>
        </NextLink>
    </Box>


    </Grid>




  )
}
