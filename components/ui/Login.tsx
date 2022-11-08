import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import NextLink from 'next/link';


type FormData = {
    email   : string,
    password: string,
};

export const Login = () => {

    const router = useRouter();
    // const { loginUser } = useContext( AuthContext );

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {

        if (router.asPath.includes('callbackUrl')){
                setShowError(true)

        }


    }, [])



    const onLoginUser = async( { email, password }: FormData ) => {

        setShowError(false);

        // const isValidLogin = await loginUser( email, password );
        // if ( !isValidLogin ) {
        //     setShowError(true);
        //     setTimeout(() => setShowError(false), 3000);
        //     return;
        // }
        // // Todo: navegar a la pantalla que el usuario estaba
        // const destination = router.query.p?.toString() || '/';
        // router.replace(destination);
         await signIn('credentials',{ email, password });


    }
  return (
    <>
        <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
                <Box sx={{ width: 350, padding:'10px 20px' }} marginTop='5vh'>
                    <Grid container spacing={2} marginBottom='29vh' >
                        <Grid item xs={10}>
                            <Typography color='whitesmoke' variant="h1" className='fontStyle' component="h1">Iniciar Sesión</Typography>
                            <Chip

                                label="Contraseña o usuario incorrecto"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' ,mt:2}}
                            />
                        </Grid>

                        <Grid item xs={10}>
                            <TextField
                                type="email"
                                label="Correo"
                                variant="filled"
                                fullWidth
                                sx={{
                                    background:'whitesmoke',
                                    borderRadius:'5px',
                                    boxShadow: 3
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
                                sx={{
                                    background:'whitesmoke',
                                    borderRadius:'5px',
                                    boxShadow: 3
                                }}
                                fullWidth
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
                                sx={{boxShadow: 1
                                }}


                                >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={10} display='flex' justifyContent='center'>
                            <NextLink
                                href={ router.query.p ? `/auth/register?p=${ router.query.p }`: '/auth/register' }
                                passHref>
                                <Link underline='always'>
                                <Typography color='gray' variant='h2' component="h2">¿No tienes cuenta?</Typography>

                                </Link>
                            </NextLink>
                        </Grid>

{/*
                        <Grid item xs={10} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values( providers ).map(( provider: any ) => {

                                    if ( provider.id === 'credentials' ) return (<div key="credentials"></div>);

                                    return (
                                        <Button
                                            key={ provider.id }
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                            sx={{ mb: 1 }}
                                            onClick={ () => signIn( provider.id ) }
                                        >
                                            { provider.name }
                                        </Button>
                                    )

                                })
                            }

                        </Grid> */}

                    </Grid>
                </Box>
            </form>

    </>
  )
}
