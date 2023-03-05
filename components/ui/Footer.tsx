import { Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react'

export const Footer = () => {
    return (

    <Grid container display={{xs:'none',lg:'flex'}} justifyContent='center' flexDirection='row'  pt={8}  >
     <Grid item height='2em' flexDirection='row'  px={15}  sx={{
        background:'black',
        borderRadius:'0.2em',
        alignItems:'center',
        justifyContent:'center'

     }}>
      <footer >
        <p style={{display:'flex', flexDirection:'row',color:'whitesmoke', marginTop:'0.3em'}}>
          Nahuel Perugi&nbsp;-&nbsp;2023&nbsp;-&nbsp;
          <Link

            href="https://nahuel-portafolio.herokuapp.com/"
          >
             Puedes ver mi portafolio en este Link
          </Link>
        </p>
      </footer>
      </Grid>
    </Grid>
    );
  };