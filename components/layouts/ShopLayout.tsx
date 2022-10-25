import { FC } from 'react';
import Head from 'next/head';

import { Navbar, SideMenu } from '../ui';
import { SubBar } from '../ui/SubBar';
import { SpotCarousel } from '../ui/Carousel';
import { useRouter } from 'next/router';


interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const ShopLayout:FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {


    const {asPath} = useRouter()

 return (
    <>
        <Head>
            <title>{ title }</title>

            <meta name="description" content={ pageDescription } />


            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />

            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            }

        </Head>

        <nav>
            <Navbar />
        </nav>

        <SideMenu />

        {
                (asPath==='/')?
                <>
                < SpotCarousel/>

              <SubBar/>

                </>
                :
                null

            }

        <main style={{
            
            maxWidth: '1440px',

        }}>



            { children }
        </main>

        {/* Footer */}

        {/* <footer>

        </footer> */}

    </>
  )
}


