import bcrypt from 'bcryptjs';

interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}

interface SeedUser {
    name     : string;
    email    : string;
    password : string;
    role     : 'admin'|'client'
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidTypes = 'shirts'|'Pantalon'|'Poleron'|'Polera'|'Polar'|'Chaqueta';



interface SeedData {
    users: SeedUser[];
    products: SeedProduct[] | any;
}





 export const initialData: SeedData = {
    users: [
        {
            name: 'Fernando Herrera',
            email: 'fernando@google.com',
            password: bcrypt.hashSync('123456'),
            role: 'admin'
        },
        {
            name: 'Eduardo Rios',
            email: 'eduardo@google.com',
            password: bcrypt.hashSync('123456'),
            role: 'client'
        },
    ],
    products: [
        {
            description: "Un polar puro y limpio que es liviano y se puede colocar en capas, esta suave chaqueta tipo jersey está diseñada para mantenerlos cómodos y abrigados en cualquier estación. El cuello con media cremallera brinda ventilación ajustable para que puedas adaptarte a las condiciones, y las mangas raglán facilitan un gran ajuste y rango de movimiento. Logotipo de Columbia en el pecho.",

            images: [
                'columbia-3396-7076951-1-product.webp',
                'columbia-3398-7076951-2-product.webp',
            ],
            inStock: 7,
            price: 23990,
            sizes: ['XS','S','M','L'],
            slug: "polar_niño_glacial_half_zip_azul_columbia",
            type: 'Polar',
            tags: ['Polar'],
            title: "Columbia%Polar niño glacial half zip azul%columbia",
            gender: 'kid'
        },
        {

            description:'Pack de 3 poleras negras con tipografía Jack & Jones estampada en el frente',
             images: [
                'jack-jones-9340-6620621-1-catalog-new.webp',
                'jack-jones-9342-6620621-2-catalog-new.webp',
            ],
            inStock: 15,
            price: 13990,
            sizes: ['XS','S','M','XL'],
            slug: "pack_poleras_jack_jones_negro",
            type: 'Polera',
            tags: ['Polera'],
            title: "Jack & Jones%Pack 3 Poleras Negro %Jack & Jones",
            gender: 'men'
        },

        {
            description:'Esta polera de notas veraniegas, confeccionada en puro algodón, luce un colorido logo desteñido de estilo universitario en la parte delanter',
            images: [
                'tommy-jeans-5204-9163921-1-product.webp',
                'tommy-jeans-5206-9163921-2-product.webp'
            ],
            inStock: 10,
            price: 29500,
            sizes: ['S','M','L','XL','XXL'],
            slug: "polera_logo_desteñido_negro_tommy_jeans",
            type: 'Polera',
            tags: ['Polera'],
            title: "Tommy Jeans%Polera Logo Desteñido Negro%Tommy Jeans ",
            gender: 'men'
        },

        {
            description:'Producto 100% original Alpinestars, etiqueta interior impresa e impresión de alta calida',
            images: [
                'alpinestars-0260-8265711-1-product.webp',
                'alpinestars-0263-8265711-2-product.webp',
            ],
            inStock: 50,
            price: 24200,
            sizes: ['XS','S','M','L','XL'],
            slug: "polera_salutation_negro_alpinestars",
            type: 'Polera',
            tags: ['Polera'],
            title: "Alpinestars%Polera Cotton On Morado%Alpinestars ",
            gender: 'men'
        },
        {
        description:'Moderna. Sobria. Elevada. La ropa de hombre de Calvin Klein trae detalles considerados a cortes clásicos. Prenda diseñada para jugar a combinar, para el armario moderno de día a noche',
            images: [
                'calvin-klein-0566-8548441-1-product.webp',
                'calvin-klein-0568-8548441-2-product.webp',
            ],
            inStock: 50,
            price: 69990,
            sizes: ['M','L','XL','XXL'],
            slug: "polerón_interlock_azul_calvin_klein",
            type: 'Poleron',
            tags: ['Poleron'],
            title: "Calvin Klein%Polerón Interlock Azul %Calvin Klein",
            gender: 'men'
        },
        {
    description:' Material Que Bloquea Los Rayos Uv Para Ayudar A Prevenir Quemaduras Solares Y Daños A La Piel A Largo Plazo Control De Humedad: Tela Diseñada Para Transferir La Humedad Del Cuerpo Hacia El Exterior Del Tejido, Manteniéndote Seco Y Cómodo. Producto de calce grande, te recomendamos comprar una talla menos que la habitual' ,
               images: [
                'cat-7119-043289-1-product.webp',
                'cat-7121-043289-2-product.webp',
            ],
            inStock: 0,
            price: 29990,
            sizes: ['M','L','XL','XXL'],
            slug: "poleron_hombre_upf_hooded_banne",
            type: 'Poleron',
            tags: ['Poleron'],
            title: "CAT%Poleron Hombre  Negro Cat%CAT",
            gender: 'men'
        },
        {
            description:'Polerón con capucha ajustable, bolsillo tipo canguro y estampado Tommy Hilfiger',
            images: [
                'tommy-hilfiger-9611-2271231-1-product.webp',
                'tommy-hilfiger-9614-2271231-2-product.webp',

            ],
            inStock: 15,
            price: 58290,
            sizes: ['S','M','L','XL','XXL','XXXL'],
            slug: "Polerón_Tommy_Hilfiger_TOP_HEAVY_WEIGHT",
            type: 'Poleron',
            tags: ['Poleron'],
            title: "Tommy Hilfiger%Polerón Rojo %Tommy Hilfiger",
            gender: 'men'
        },
        {
            description:'Polerón plus size con bolsillos latearles y estampado Tommy Hilfiger',

            images: [
                'tommy-hilfiger-9620-0271231-1-product.webp',
                'tommy-hilfiger-9621-0271231-2-product.webp',
            ],
            inStock: 17,
            price: 69990,
            sizes: ['XS','S','XL','XXL'],
            slug: "Polerón_Plus_Size_Tommy_Hilfige",
            type: 'Poleron',
            tags: ['Poleron'],
            title: "Tommy Hilfiger%Polerón Plus Size %Tommy Hilfiger",
            gender: 'men'
        },
        {
            description:'Polera con estampado en el centro',
            images: [
                'topshop-4329-3500331-1-product.webp',
                'topshop-4336-3500331-2-product.webp',
            ],
            inStock: 12,
            price: 10900,
            sizes: ['XS','S','M'],
            slug: "Polera_Topshop_Negro",
            type: 'Polera',
            tags: ['Polera'],
            title: "Topshop%Polera Topshop Negro Ajustado%Tommy Hilfiger",
            gender: 'women'
        },
        {

            description:' El diseñador sudafricano Rich Mnisi se ha forjado su lugar en el mundo de la moda descubriendo los tesoros escondidos de África y celebrando su herencia. Esta polera adidas sigue esta misma línea con un diseño de rosas al estilo del arte pop que rinde homenaje a la belleza del ser amado. Su confección en tejido de algodón es suave, transpirable y te brinda comodidad durante todo el día.',

            images: [
                'adidas-originals-6454-5493921-1-product.webp',
                'adidas-originals-6457-5493921-2-product.webp',
            ],
            inStock: 5,
            price: 20800,
            sizes: ['XS','S'],
            slug: "Polera_adidas_originals_REGULAR_TSHIRT_Negro",
            type: 'Polera',
            tags: ['Polera'],
            title: "adidas originals%Polera REGULAR TSHIRT%adidas originals",
            gender: 'women'
        },
        {
            description:' Inspirada en el anime y en Nike Air, esta polera de corte cuadrado está confeccionada con nuestro tejido de algodón de uso diario, y con un ajuste amplio para brindar una sensación cómoda e informal que se ve tan bien como se siente.',
            images: [
                'nike-6835-2142241-1-product.webp',
                'nike-6839-2142241-2-product.webp',
            ],
            inStock: 2,
            price: 22110,
            sizes: ['XS','S','M'],
            slug: "Polera_Nike_W_NSW_TEE_BOXY_OC_D",
            type: 'Polera',
            tags: ['Polera'],
            title: "Nike%Polera Nike W NSW TEE%Nike",
            gender: 'women'
        },
        {
description:'Estos básicos de vestuario actualizados presentan un estilo discreto y siluetas atemporales que te permiten crear atuendos a la moda sin esfuerzo. Con su icónico logo de Tommy Hilfiger en el pecho, esta camiseta de puro algodón orgánico es un básico elevado.',
            images: [
                'tommy-hilfiger-5495-5672031-1-product.webp',
                'tommy-hilfiger-5502-5672031-3-product.webp',
            ],
            inStock: 82,
            price: 26270,
            sizes: ['XS','S','M','L'],
            slug: "Polera_Tommy_Hilfiger_Essential_Crew_Logo",
            type: 'Polera',
            tags: ['Polera'],
            title: "Tommy Hilfiger%Polera Essential Logo%Tommy Hilfiger",
            gender: 'women'
        },
        {
description:'Polera en canalé muy fino de 100 % algodón ecológico Algodón ecológico: algodón de cultivo ecológico Cuello redondo con banda fina de canalé por fuera Discreto logotipo de strass en el pecho Corte holgado ligeramente entallado Tejido exterior: 100% algodón',
 images: [
                'esprit-4637-950279-1-product.webp',
                'esprit-4639-950279-2-product.webp',
            ],
            inStock: 24,
            price: 16990,
            sizes: ['XS','S','M','L'],
            slug: "Polera_Con_Logo_Blanco_Esprit",
            type: 'Polera',
            tags: ['Polera'],
            title: "ESPRIT%Polera Con Logo Blanco%ESPRIT",
            gender: 'women'
        },
        {
description:' Este polerón con capucha, confeccionada en felpa de mezcla de algodón orgánico, presenta un cómodo corte amplio y un llamativo logo en fuente Script.',
            images: [
                'tommy-hilfiger-5332-5040741-1-product.webp',
                'tommy-hilfiger-5338-5040741-4-product.webp',
            ],
            inStock: 5,
            price: 92810,
            sizes: ['XS','S','L','XXL'],
            slug: "Polerón_Tommy_Hilfiger_Capucha_Logo_Azul",
            type: 'Poleron',
            tags: ['Poleron'],
            title: "Tommy Hilfiger%Polerón Tommy Hilfiger Capucha%Tommy Hilfiger",
            gender: 'women'
        },
        {
description:'Polerón holgado con estampado frontal y en la espalda, capucha con cordón de ajuste y bolsillo tipo canguro',
            images: [
                'new-girl-order-4389-5869821-1-product.webp',
                'new-girl-order-4423-5869821-2-product.webp',
            ],
            inStock: 150,
            price: 25290,
            sizes: ['M','L'],
            slug: "Polerón_New_Girl_Order_Marrón",
            type: 'Poleron',
            tags: ['Poleron'],
            title: "New Girl Order%Polerón New Girl Order Marrón %New Girl Order",
            gender: 'women'
        },
        {
        description:'Levis Sculpt with Hyperstretch, tela super stretch, suave, que acentúa la figura' ,
           images: [
                'levis-0247-1700741-1-product.webp',
                'levis-0250-1700741-3-product.webp',
            ],
            inStock: 10,
            price: 37093 ,
            sizes: ['XS','S','M','L'],
            slug: "Jeans_Mujer_720_High_Rise_Super_Skinny",
            type: 'Pantalon',
            tags: ['Pantalon'],
            title: "Levis%Jeans Mujer 720 High Rise%Levis",
            gender: 'women'
        },
        {
            description: " Jeans con bolsillos laterales y traseros",
            images: [
                'topshop-3336-3210331-1-product.webp',
                'topshop-3339-3210331-3-product.webp',
            ],
            inStock: 34,
            price: 22790 ,
            sizes: ['XS','S','M','L'],
            slug: "Jeans_Topshop_Negro",
            type: 'Pantalon',
            tags: ['Pantalon'],
            title: "Topshop%Jeans Topshop Negro Calce%Topshop",
            gender: 'women'
        },
        {
description:'Pantalon BuzoTela Fleece ultra suave y de algodón. Interior cepillado para mayor calidez. Pretina elástica cerrada con cordón externo. Bolsillos abiertos para las manos y bolsillo trasero con cierre.' ,
          images: [
                'under-armour-4142-7292251-1-product.webp',
                'under-armour-4144-7292251-2-product.webp',
            ],
            inStock: 15,
            price: 34990,
            sizes: ['XL','XXL'],
            slug: "Buzo_Hombre_Ua_Rival_Terry_Jogge_Negro",
            type: 'Pantalon',
            tags: ['Pantalon'],
            title: "Under Armour%Buzo Hombre Negro Rival%Under Armour",
            gender: 'men'
        },
        {
    description:'Jeans de mezclilla, Cierre YKK, Bolsillo para monedas, detalles reflectivos en el interior de la basta' ,
          images: [
                'lippi-6876-6659401-1-product.webp',
                'lippi-6876-6659401-1-product.webp',
            ],
            inStock: 12,
            price: 36990,
            sizes: ['XS','XXL'],
            slug: "Pantalon_Hombre_Denim_Pants_Negro",
            type: 'Pantalon',
            tags: ['Pantalon'],
            title: "Lippi%Pantalon Hombre Denim Negro%Lippi",
            gender: 'men'
        },
        {
description:'Tipo de Producto: Polera,Tipo de Manga: Manga corta, Material Principal: 100% Algodón, Tipo de Cuello: Cuello redondo, Calce: Regular',
            images: [
                'levis-3688-3077841-1-product.webp',
                'levis-3692-3077841-2-product.webp',
            ],
            inStock: 10,
            price: 7495,
            sizes: ['XS','S','M','L'],
            slug: "Polera_Niñas_Lisa_Blanco_Levis",
            type: 'Polera',
            tags: ['Polera'],
            title: "Levis%Polera Niñas Lisa Blanco%Levis ",
            gender: 'kid'
        },
        {
        description:'Esta polera es ideal para actividades al aire libre y para chicas en movimiento. Ya sea para la guardería, el jardín de infantes o la escuela, combinan a la perfección con jeans, pantalones deportivos o pantalones cortos',
            images: [
                'cotton-on-7547-7067611-2-product.webp',
                'cotton-on-7547-7067611-2-product.webp',
            ],
            inStock: 10,
            price: 4210,
            sizes: ['XS','S','M','L'],
            slug: "Polera_Cotton_On_Penélope_Blanco",
            type: 'Polera',
            tags: ['Polera'],
            title: "Cotton On%Polera Cotton On Penélope%Cotton On",
            gender: 'kid'
        },
        {
        description:'Polera semi ajustada para bebés. Mangas largas. Estampado en la parte frontal. Largo: debajo de la cintura. Cuello redondo con borde acanalado. Material: 100% Algodón.',
            images: [
                'old-navy-7978-6412621-1-product.webp',
                'old-navy-7978-6412621-1-product.webp',
            ],
            inStock: 100,
            price: 3490,
            sizes: ['XS'],
            slug: "Polera_Grafica_Blanco_Old_Navy",
            type: 'Polera',
            tags: ['Polera'],
            title: "Old Navy%Polera Grafica Blanco%Old Navy",
            gender: 'kid'
        },
        {
    description:'Tipo de Producto: Polera, Tipo de Manga: Manga Corta, Material Principal: 100% algodón, Tipo de Cuello: Redondo',
            images: [
                'levis-6825-1002051-3-product.webp',
                'levis-6824-1002051-2-product.webp',
            ],
            inStock: 7,
            price: 9093,
            sizes: ['XS','S','M'],
            slug: "Polera_Niños_Lisa_Levis",
            type: 'Polera',
            tags: ['Polera'],
            title: "Levis%Polera Niños Logo Gris%Levis ",
            gender: 'kid'
        },
        {
    description:'Polerón con capucha ajustable y estampado en el centro',
            images: [
                'reef-6186-6902621-1-product.webp',
                'reef-6190-6902621-2-product.webp',
            ],
            inStock: 15,
            price: 15050,
            sizes: ['XS','S','M','L'],
            slug: "Poleron_Reef_Azul",
            type: 'Poleron',
            tags: ['Poleron'],
            title: "Reef%Polerón Reef Azul%Reef",
            gender: 'kid'
        },
        {
        description:'Polerón con estampado umbro en manga , calce cómodo, perfecto para mantenerte abrigada durante tus actividades diarias',
            images: [
                'umbro-7285-2968121-1-product.webp',
                'umbro-7288-2968121-2-product.webp',
            ],
            inStock: 15,
            price: 12180,
            sizes: ['XS','S','XL'],
            slug: "Polerón_Umbro_Crew_Neck_Gris",
            type: 'Poleron',
            tags: ['Poleron'],
            title: "Umbro%Polerón Crew Neck Gris%Umbro",
            gender: 'kid'
        },
        {
        description:'Con capucha, bolsillo para las manos',
            images: [
                'levis-6077-8002051-1-product.webp',
                'levis-6079-8002051-2-product.webp',
            ],
            inStock: 13,
            price: 39990,
            sizes: ['XS','S','M','L'],
            slug: "Polerón_Niños_Capucha_Rojo",
            type: 'Poleron',
            tags: ['Poleron'],
            title: "Levis%Polerón Niños Capucha Rojo%Levis",
            gender: 'kid'
        },
        {
        description:'Bolsillo tipo canguro, estampado puma ',
            images: [
                'puma-6026-1568511-1-product.webp',
                'puma-6030-1568511-2-product.webp',
            ],
            inStock: 11,
            price: 16620,
            sizes: ['XS','S','M','L'
        ],
            slug: "Polerón_Puma_Niño_Negro",
            type: 'Poleron',
            tags: ['Poleron'],
            title: "Puma%Polerón Puma Niño Negro%Puma",
            gender: 'kid'
        },
        {
            description:'Casa lisa con traba en la cintura y cuello mao',
            images: [
                'ma_griffe-4130-4094911-1-product.webp',
                'ma_griffe-4133-4094911-2-product.webp',
            ],
            inStock: 13,
            price: 26000,
            sizes: ['XS','S','M','L','XL'],
            slug: "Casaca_Magriffe_Lisa_con_Traba",
            type: 'Chaqueta',
            tags: ['Chaqueta'],
            title: "Magriffe%Casaca Traba en Cintura Verde%Magriffe",
            gender: 'women'
        },
        {
            description:' Blazer solapa manga 3/4 con detalle drapeado. De tope y con hombreras.',
            images: [
                'nicopoly-7064-2100741-1-product.webp',
                'nicopoly-7065-2100741-2-product.webp',
            ],
            inStock: 85,
            price: 36990,
            sizes: ['XS','S','M'],
            slug: "Blazer_Solapa_Manga_Negro",
            type: 'Chaqueta',
            tags: ['Chaqueta'],
            title: "Nicopoly%Blazer Solapa Manga Negro%Nicopoly",
            gender: 'women'
        },
        {

            description:'Chaqueta Impermeable 2 capas con malla interior',
            images: [
                'lippi-6248-9259401-1-product.webp',
                'lippi-6253-9259401-4-product.webp',
            ],
            inStock: 10,
            price: 57990,
            sizes: ['XS','S','M','XXL'],
            slug: "Chaquetas_Hombre_Blizzard_B-Dry",
            type: 'Chaqueta',
            tags: ['Chaqueta'],
            title: "Lippi%Chaquetas Hombre Blizzard B-Dry%Lippi",
            gender: 'men'
        },
        {
            description: "Chaqueta de fleece clásica",
            images: [
                'lippi-8119-2360501-1-product.webp',
                'lippi-8124-2360501-4-product.webp',
            ],
            inStock: 9,
            price: 36990,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "Chaquetas_Hombre_Paicav",
            type: 'Chaqueta',
            tags: ['Chaqueta'],
            title: "Lippi%Chaquetas Hombre Paicav%Lippi",
            gender: 'men'
        },

    ].sort((a, b) => 0.5 - Math.random())
}


// initialData.products = initialData.products.sort((a, b) => 0.5 - Math.random())

// export  default initialData