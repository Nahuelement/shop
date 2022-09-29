import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../../database'
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/products';
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary} from 'cloudinary'


cloudinary.config(process.env.CLOUDINARY_URL || '')

type Data =
{message: string} |
IProduct[] |
IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProduct(req,res);

        case 'PUT':
            return updateProduct(req,res);

        case 'POST':
             return createProduct(req, res);




        default:
            res.status(400).json({ message: 'Bad request' });
    }



}

const getProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()

    const products = await Product.find().sort({title:'asc'}).lean()

    const updateProducts = products.map(product =>{
        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME }products/${image}`
        })

        return product
    })


    await db.disconnect()

    res.status(200).json(updateProducts)

}
const updateProduct = async(req: NextApiRequest, res: NextApiResponse<Data>)  =>{

    const { _id = '', images = []} = req.body as IProduct

    if( !isValidObjectId(_id) ){

        return res.status(400).json({message : ' el id no es valido '})

    }

    if( images.length<2 ) {

        return res.status(400).json({message : ' es necesario al menos 2 imagenes '})

    }
    // posisblemene la imagen trenda un localhost:300/productos/jadkjf.jpg

    try {

        await db.connect()

        const product = await Product.findById(_id)

        if( !product){
            await db.disconnect()
            return res.status(400).json({message : ' no existe produco con ese id '})

            // Todo : eliminar foto de cloudinary

        }

        product.images.forEach( async(image)=>{
            if( !images.includes(image)){
                // borrar de claudinary
                const [fileId, extension] = image.substring( image.lastIndexOf('/') + 1).split('.') // lastIndexOf busca la posicion indice del ultimo '/'
                console.log({image,fileId,extension})
                await cloudinary.uploader.destroy(fileId)
            }
        })

        await product.update(req.body)

        await db.disconnect()

        return res.status(200).json(product)

    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(400).json({message : ' revisar la consola del servido '})

    }

}

const createProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {  images = []} = req.body as IProduct



    if( images.length<2 ) {

        return res.status(400).json({message : ' es necesario al menos 2 imagenes '})

    }

    // posisblemene la imagen trenda un localhost:300/productos/jadkjf.jpg

    try {

        await db.connect()

        const productInDb = await Product.findOne({slug:req.body.slug})

        if (productInDb){
            await db.disconnect()
            return res.status(400).json({message : ' el slug ya existe '})
        }

        const product = new Product(req.body)

        await product.save()


        await db.disconnect()

        return res.status(201).json(product)


    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(400).json({message : ' revisar la consola del servido '})


    }

}
