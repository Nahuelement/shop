
import { GetServerSideProps } from 'next';


import { signIn, getSession } from 'next-auth/react';


import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../../components/layouts'

import { Register } from '../../components/ui/Register';
import Image from 'next/image';







const RegisterPage = () => {



    return (
        <AuthLayout title={'Registrarse'}>


<Grid container sx={{
         display:'flex',
         justifyContent:'center',
         alignItems:'center',
         alignContent:'center'

    }}
    className='backgroundAnimated'>
<Grid item xs={12}  sx={{
         display:'flex',
         justifyContent:'center',
         alignItems:'center',
         alignContent:'center'

    }}
    paddingTop='29vh' >
    <Register/>
    </Grid>
    {/* <Grid item xs={12}  lg={5} display='flex' justifyContent='start' pt='15vh'
    sx={{
        display:{xs:'none',lg:'flex'}
    }}

    >
    <Box sx={{
        pl:'1vw'
    }}>
    < Image
    width={540}
    height={600}
    src='https://res.cloudinary.com/nahuelement/image/upload/v1666214501/jhnnpcw3kmrfuj2mzvco.jpg'
    layout="intrinsic"
    />
    </Box>
    </Grid> */}
    </Grid>


            {/* <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
                <Box sx={{ width: 350, padding:'10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Crear cuenta</Typography>
                            <Chip
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Nombre completo"
                                variant="filled"
                                fullWidth
                                { ...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={ !!errors.name }
                                helperText={ errors.name?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Correo"
                                variant="filled"
                                fullWidth
                                { ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail

                                })}
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink
                                href={ router.query.p ? `/auth/login?p=${ router.query.p }`: '/auth/login' }
                                passHref
                            >
                                <Link underline='always'>
                                    ¿Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form> */}
        </AuthLayout>
    )
}



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

export default RegisterPage