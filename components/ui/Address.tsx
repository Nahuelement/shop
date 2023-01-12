import { useContext, useEffect } from 'react';
import  {useRouter}  from 'next/router';
import { Autocomplete, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";


import { countries } from "../../utils";
import { CartContext } from '../../context';
import {useState} from 'react';


type FormData = {
    firstName: string;
    lastName : string;
    address  : string;
    address2?: string;
    zip      : string;
    city     : string;
    country  : string;
    phone    : string;
}


const getAddressFromCookies = ():FormData => {
    return {
        firstName : Cookies.get('firstName') || '',
        lastName  : Cookies.get('lastName') || '',
        address   : Cookies.get('address') || '',
        address2  : Cookies.get('address2') || '',
        zip       : Cookies.get('zip') || '',
        city      : Cookies.get('city') || '',
        country   : Cookies.get('country') || '',
        phone     : Cookies.get('phone') || '',
    }
}

export const Address = () => {

    const router = useRouter();
    const { updateAddress, createOrder} = useContext( CartContext );

    const [pay, setPay] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
       defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            city: '',
            country: countries[0].name,
            phone: '',
       }
    });

    useEffect(() => {
        reset(getAddressFromCookies() );

    }, [reset])



    const onSubmitAddress = async( data: FormData ) => {
        updateAddress( data );
        if(pay){
            const { hasError, message } = await createOrder();


            router.replace(`/orders/${ message }`);
        }else{
            router.push('/checkout/summary');
        }


    }
  return (
    <form onSubmit={ handleSubmit( onSubmitAddress ) }>

        <Box display='flex' flexDirection='row' justifyContent='center'  >
            <Typography color='white' variant="h1" className='fontStyle' component='h1'>Dirección</Typography>
         </Box>
            <Grid container spacing={ 4 } sx={{ mt: 0 ,p:2}} >

                <Grid item xs={12} sm={ 6 }  >
                    <TextField
                        label='Nombre'
                        variant="filled"
                        fullWidth
                        sx={{boxShadow:2,background:'whitesmoke'}}
                        { ...register('firstName', {
                            required: 'Este campo es requerido'
                        })}
                        error={ !!errors.firstName }
                        helperText={ errors.firstName?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField
                        label='Apellido'
                        variant="filled"
                        fullWidth
                        sx={{boxShadow:2,background:'whitesmoke'}}
                        { ...register('lastName', {
                            required: 'Este campo es requerido'
                        })}
                        error={ !!errors.lastName }
                        helperText={ errors.lastName?.message }
                        />
                </Grid>

                <Grid item xs={12} sm={ 6 }>
                    <TextField
                        label='Dirección'
                        variant="filled"
                        fullWidth
                        sx={{boxShadow:2,background:'whitesmoke'}}
                        { ...register('address', {
                            required: 'Este campo es requerido'
                        })}
                        error={ !!errors.address }
                        helperText={ errors.address?.message }
                        />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField
                        label='Dirección 2 (opcional)'
                        variant="filled"
                        fullWidth
                        sx={{boxShadow:2,background:'whitesmoke'}}
                        { ...register('address2')}
                    />
                </Grid>

                {/* <Grid item xs={12} sm={ 6 }>
                    <TextField
                        label='Código Postal'
                        variant="filled"
                        fullWidth
                        sx={{boxShadow:2,background:'whitesmoke'}}
                        { ...register('zip', {
                            required: 'Este campo es requerido'
                        })}
                        error={ !!errors.zip }
                        helperText={ errors.zip?.message }
                        />
                </Grid> */}
                <Grid item xs={12} sm={ 6 }>
                    {/* <TextField
                        label='Ciudad'
                        variant="filled"
                        fullWidth
                        sx={{boxShadow:2,background:'whitesmoke'}}
                        { ...register('city', {
                            required: 'Este campo es requerido'
                        })}
                        error={ !!errors.city }
                        helperText={ errors.city?.message }
                        /> */}
{/*
                        <TextField
                            // select
                            variant="filled"
                            label="País"
                            fullWidth
                            sx={{boxShadow:2,background:'whitesmoke'}}
                            // defaultValue={ Cookies.get('country') || countries[0].code }
                            { ...register('country', {
                                required: 'Este campo es requerido'
                            })}
                            error={ !!errors.country }
                            helperText={ errors.country?.message }
                        >
                {countries.map( country => (
                                    <MenuItem
                                        key={ country.code }
                                        value={ country.code }
                                    >{ country.name }</MenuItem>
                                ))
                            }
                </TextField> */}
                 <Autocomplete
                    id="country-select-demo"
                    // sx={{ width: 300 }}
                    sx={{background:'whitesmoke'}}
                    options={countries}

                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                        {option.name}
                        </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                            { ...register('city', {
                                required: 'Este campo es requerido'
                            })}
                            error={ !!errors.city }
                            helperText={ errors.city?.message }
                            {...params}
                            label="Ciudad"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                            />
                        )}
                        />
                </Grid>



                <Grid item xs={12} sm={ 6 }>
                    <TextField
                        label='Teléfono'
                        variant="filled"
                        fullWidth
                        sx={{boxShadow:2,background:'whitesmoke'}}
                        { ...register('phone', {
                            required: 'Este campo es requerido'
                        })}
                        error={ !!errors.phone }
                        helperText={ errors.phone?.message }
                        />
                </Grid>

            </Grid>


            <Box sx={{ mt: 2, paddingBottom:{xs:'5vh',sm:'0vh'} }} display='flex' gap={3} justifyContent='center'>
                <Button type="submit" color="secondary" sx={{boxShadow:3,marginBottom:3}} className="circular-btn" size="large">
                    Revisar pedido
                </Button>
                <Button type="submit" onClick={()=>setPay(true)} color="secondary" sx={{boxShadow:3,marginBottom:3}} className="circular-btn" size="large">
                    Realizar pago
                </Button>
            </Box>


        </form>
  )
}
