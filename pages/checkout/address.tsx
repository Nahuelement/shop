import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";

import { ShopLayout } from '../../components/layouts';
import { countries } from "../../utils";
import { CartContext } from '../../context';
import { Address } from '../../components/ui/Address';
import Image from 'next/image';


// type FormData = {
//     firstName: string;
//     lastName : string;
//     address  : string;
//     address2?: string;
//     zip      : string;
//     city     : string;
//     country  : string;
//     phone    : string;
// }


// const getAddressFromCookies = ():FormData => {
//     return {
//         firstName : Cookies.get('firstName') || '',
//         lastName  : Cookies.get('lastName') || '',
//         address   : Cookies.get('address') || '',
//         address2  : Cookies.get('address2') || '',
//         zip       : Cookies.get('zip') || '',
//         city      : Cookies.get('city') || '',
//         country   : Cookies.get('country') || '',
//         phone     : Cookies.get('phone') || '',
//     }
// }



const AddressPage = () => {

    // const router = useRouter();
    // const { updateAddress} = useContext( CartContext );

    // const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    //    defaultValues: {
    //         firstName: '',
    //         lastName: '',
    //         address: '',
    //         address2: '',
    //         zip: '',
    //         city: '',
    //         country: countries[0].code,
    //         phone: '',
    //    }
    // });

    // useEffect(() => {
    //     reset(getAddressFromCookies() );

    // }, [reset])



    // const onSubmitAddress = ( data: FormData ) => {
    //     updateAddress( data );
    //     router.push('/checkout/summary');
    // }

  return (
    <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino">
        <Grid  container xs={12} display='flex' justifyContent='center' alignItems='center' flexDirection='column'
        sx={{
          height:'100%',

        }}
        className='backgroundAnimated2'
        >
        <Grid item xs={12} sm={8} mt='5vh'>
       <Address />
       </Grid>
       <Grid item xs={4} justifyContent='center'
       sx={{display:{xs:'none', sm:'flex'}}}
       >
       <Box display='flex' justifyContent='center' >
        <Image
        src='https://res.cloudinary.com/nahuelement/image/upload/v1666323990/u933pvjsh5fts6oarywu.png'
        width={300}
        height={300}
        />
       </Box>
       </Grid>

       </Grid>
    </ShopLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {
//         await jwt.isValidToken( token );
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }

//     if ( !isValidToken ) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {

//         }
//     }
// }




export default AddressPage