import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context';
import { validations } from '../../utils';
import NextLink from 'next/link';

type FormData = {
    name    : string;
    email   : string;
    password: string;
};

export const Register = () => {
    const router = useRouter();
    const { registerUser } = useContext( AuthContext );


    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const onRegisterForm = async( {  name, email, password }: FormData ) => {

        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password);

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        // Todo: navegar a la pantalla que el usuario estaba
        // const destination = router.query.p?.toString() || '/';
        // router.replace(destination);

        await signIn('credentials',{ email, password });

    }
  return (
    <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
                <Box sx={{ width: 350, padding:'10px 20px' }} >
                    <Grid container spacing={2} marginBottom='23vh' sx={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        alignContent:'center'

                         }}  >
                        <Grid item xs={10}>
                            <Typography color='whitesmoke' variant='h1' className='fontStyle' component="h1">Crear cuenta</Typography>
                            <Chip
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' }}
                            />
                        </Grid>

                        <Grid item xs={10}>
                            <TextField
                                label="Nombre completo"
                                variant="filled"
                                fullWidth
                                sx={{
                                    background:'white',
                                    borderRadius:'5px',
                                    boxShadow:3
                                }}
                                { ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={ !!errors.name }
                                helperText={ errors.name?.message }
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                type="email"
                                label="Correo"
                                variant="filled"
                                fullWidth
                                sx={{
                                    background:'white',
                                    borderRadius:'5px',
                                    boxShadow:3
                                }}
                                { ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail

                                })}
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"

                                fullWidth
                                sx={{
                                    background:'white',
                                    borderRadius:'5px',
                                    boxShadow:3

                                }}
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>

                        <Grid item xs={10} display='flex' justifyContent='center'>
                            <Button
                                type="submit"
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                fullWidth
                                sx = {{
                                    boxShadow:1
                                }}
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={10} display='flex' justifyContent='center'>
                            <NextLink
                                href={ router.query.p ? `/auth/login?p=${ router.query.p }`: '/auth/login' }
                                passHref
                            >
                                <Link underline='always'>
                                <Typography color='gray' variant='h2' component="h2">¿Ya tienes cuenta?</Typography>

                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>

  )
}
