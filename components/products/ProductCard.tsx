import { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Chip } from '@mui/material'

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
      <Grid item
            xs={6}
            sm={ 4 }
            lg={3}
            pt={5}
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
      >
          <Card
        //   sx={{height:'65vh'}}
          >
            {
            product &&
            <>
              <NextLink href={`/product/${ product.slug }`} passHref prefetch={ false }>
                <Link>


                 <CardActionArea>

                        {
                            (product.inStock === 0 ) && (
                                <Chip
                                    color="secondary"
                                    label="Sin stock disponible"
                                    sx={{ position: 'absolute', zIndex: 99, right:'10%',left:'10%', top:'50%', translate:'(-50%,-50%)'}}
                                />
                            )
                        }

                        <CardMedia
                            component='img'
                            className='fadeIn'
                            image={ productImage }
                            alt={ product.title }
                            onLoad={ () => setIsImageLoaded(true) }
                        />

                    </CardActionArea>



              <Box sx={{ mt: 2, display: 'flex'}} className='fadeIn'
                flexDirection='column'

              >

              <Typography pb={1} pl={1} fontWeight={700}>{ product.title }</Typography>

              <Typography color='black' fontWeight={600} pl={1}>{ `$ ${product.price}` }</Typography>
          </Box>

          </Link>
              </NextLink>
              <br/>
              </>
                    }
          </Card>


      </Grid>
    )
}
