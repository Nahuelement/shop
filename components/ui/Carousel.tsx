
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from './Carousel.module.css'





export const SpotCarousel = () => {
  return (

    <div className="slider-container"  style={{marginTop:'-26vh',width:'100%',padding:'0px'}}>
    <Carousel
    className={ styles['each-slide'] }
     autoPlay
     infiniteLoop
     interval={6500}
     showArrows={false}
     showIndicators={false}
     stopOnHover={false}
     transitionTime={1500}
     showThumbs={false}
     dynamicHeight={false}




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
            

            </div>
  )
}