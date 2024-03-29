import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import {  ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { CartContext, UiContext } from '../../context';


export const Navbar = () => {

    const { asPath, push } = useRouter();
    const { toggleSideMenu } = useContext( UiContext );
    const { numberOfItems } = useContext( CartContext );

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/search/${ searchTerm }`);
    }



    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography pl={1} variant='h1'>Shopping </Typography>

                    </Link>
                </NextLink>

                <Box flex={ 1 } />


     { (asPath !== '/')?
        <Box sx={{ display:{ xs: 'none', sm: 'flex' ,zIndex:99},width:'30vw' }}
        justifyContent='space-around'
        mt={1}

        className="  fadeIn">
        <NextLink href='/category/men' passHref>
            <Link style={{}}>
                <Button
                className='fontStyle'
                style={{fontSize:18,backgroundColor: asPath === '/category/men' ? '#402d2d':'whitesmoke',color: asPath === '/category/men' ? 'whitesmoke':'#402d2d'}  }
                > Hombres</Button>
            </Link>
        </NextLink>
        <NextLink href='/category/women' passHref>
            <Link>
                <Button
                className='fontStyle'
                style={{fontSize:18,backgroundColor: asPath === '/category/women' ? '#402d2d':'whitesmoke',color: asPath === '/category/women' ? 'whitesmoke':'#402d2d'}  }

                >
                    Mujeres</Button>
            </Link>
        </NextLink>
        <NextLink href='/category/kid' passHref>
            <Link>
                <Button
                className='fontStyle'
                style={{fontSize:18,backgroundColor: asPath === '/category/kid' ? '#402d2d':'whitesmoke',color: asPath === '/category/kid' ? 'whitesmoke':'#402d2d'}  }


                >Niños</Button>
            </Link>
        </NextLink>
    </Box>
    :
    null
}


                <Box flex={ 1 } />



                {/* Pantallas pantallas grandes */}
                {
                    isSearchVisible
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' },paddingTop:{xs:3,sm:2} }}
                                className='fadeIn'
                                autoFocus
                                value={ searchTerm }
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setIsSearchVisible(false) }
                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                    :
                    (
                        <IconButton
                            onClick={ () => setIsSearchVisible(true) }
                            className="fadeIn"
                            sx={{ display: { xs: 'none', sm: 'flex' } ,paddingTop:{xs:3,sm:2}}}
                        >
                            <SearchOutlined />
                        </IconButton>
                    )
                }


                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' },paddingTop:{xs:3,sm:2} }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href="/cart" passHref>
                    <Link>
                        <IconButton sx={{paddingTop:{xs:3,sm:2}}}>
                            <Badge badgeContent={ numberOfItems > 9 ? '+9': numberOfItems  } color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>


                <Button sx={{paddingTop:2}}onClick={ toggleSideMenu }>
                    <MenuOpenIcon/>
                </Button>

            </Toolbar>
        </AppBar>
    )
}
