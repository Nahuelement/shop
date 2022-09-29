import type { NextApiRequest, NextApiResponse } from 'next'
import { userInfo } from 'os';
import { db } from '../../../database';
import { Product, Order, User } from '../../../models';

type Data = {
    numberOfOrders: number,
    paidOrders: number,
    notPaidOrders:number,
    numberOfClients:number,
    numberOfProducts: number,
    productWihNoInventory:number,
    lowInventory: number,

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect()
    // const numberOfOrders = await Order.count()
    // const paidOrders = await Order.find({isPaid:true}).count()

    // const notPaidOrders = numberOfOrders - paidOrders
    // const  numberOfClients = await User.find({role:'client'}).count()
    // const  numberOfProducts = await Product.find().count()
    // const productWihNoInventory = await Product.find({inStock:0}).count()
    // const lowInventory = await Product.find({inStock:{$lte:10}}).count()

    const [numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productWihNoInventory,
        lowInventory] = await Promise.all([
                                            Order.count(),
                                            Order.find({isPaid:true}).count(),
                                            User.find({role:'client'}).count(),
                                            Product.find().count(),
                                            Product.find({inStock:0}).count(),
                                            Product.find({inStock:{$lte:10}}).count() ])


    return res.status(201).json({
        numberOfOrders,
        paidOrders,
        notPaidOrders: numberOfOrders - paidOrders,
        numberOfClients,
        numberOfProducts,
        productWihNoInventory,
        lowInventory,

    } );
}