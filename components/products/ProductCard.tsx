import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Chip, CardActions } from '@mui/material'

import { IProduct } from '../../interfaces'

interface Props {
    product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const productImage = useMemo(() => {
        return isHovered
          ? `${ product.images[1] }`
          : `${ product.images[0] }`;

    }, [isHovered, product.images])

    return (
      <Grid
       item

            xs={6}
            sm={ 4 }
            lg={3}
            sx={{
                marginTop:2
            }}


            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
      >
          <Card
            sx={{ maxWidth: 270 ,maxHeight:500,diplay:'flex',alignContent:'center'}}
          >


              <NextLink href={`/product/${ product.slug }`} passHref prefetch={ false }>
                <Link>


                 <CardActionArea>

                        {
                            (product.inStock === 0 ) && (
                                <Chip
                                    color="secondary"
                                    label="Sin stock disponible"
                                    sx={{ position: 'absolute', zIndex: 1, right:'10%',left:'10%', top:'45%', translate:'(-50%,-50%)'}}
                                />
                            )
                        }

                        <CardMedia
                            component='img'
                            className='fadeIn'
                            image={ productImage }
                            alt={ product.title }
                            sx={{
                              borderRadius:2,
                              padding:{xs:0,sm:1},
                              maxWidth: 285
                            }}
                            onLoad={ () => setIsImageLoaded(true) }
                        />

    </CardActionArea>






          </Link>
              </NextLink>
          <CardActions sx={{ mt: '1vh', display: 'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'flex-start'}} className='fadeIn'
                >

              <Typography color='primary'  pb={0} pl={1} fontWeight={900}>{ product.title.split('%').slice(0,1) }</Typography>
              <Typography className='fontStyle' color='gray' sx={{whiteSpace: 'nowrap',width:{xs:'140px',sm:'170px'},overflow: 'hidden',textOverflow:'ellipsis'}} fontWeight={600}  pb={1} >{ `${product.title.split('%').slice(1,-1)}`.replaceAll(",", " ")}</Typography>
              <Typography color='black' fontWeight={600} >{ `$ ${product.price}`.split('').slice(0,-3)}.{`${product.price}`.split('').slice(-3)}</Typography>
          </CardActions>

          </Card>


      </Grid>
    )
}
