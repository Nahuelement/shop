
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './Carousel.module.css'
import { Box } from "@mui/material";






export const SpotCarousel = () => {
  return (

    <Box className="slider-container"  sx={{width:{xs:'100%',sm:'90%'},marginTop:{xs:'4vh',lg:'-35vh'},position:'relative'}}>
    <Carousel
    className={ styles['each-slide'] }
     autoPlay
     infiniteLoop
     interval={4500}
     emulateTouch={false}
     showArrows={false}
     showIndicators={false}
     stopOnHover={false}
     transitionTime={1700}
     showThumbs={false}
     dynamicHeight={false}
     swipeable={false}




    >
                <div

                >
                    <img
                    style={{borderRadius:'2px'}}
                    src="https://res.cloudinary.com/nahuelement/image/upload/v1666037243/z3afzadksml5irxxmrgc.jpg"  />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div >
                    <img src="https://res.cloudinary.com/nahuelement/image/upload/v1666037240/hfk3fcbafssw8eaopj40.jpg" />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div >
                    <img src="https://res.cloudinary.com/nahuelement/image/upload/v1666044240/skkarne1c090u85wehwt.jpg" />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>


            </Box>
  )
}
