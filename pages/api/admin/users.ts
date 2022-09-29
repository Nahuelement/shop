import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';

type Data = { message: string} | IUser[]


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':

            return getUsers(req, res);
        case 'PUT':

            return updateUser(req, res);

        default:
            res.status(404).json({ message: 'Bad request' });
    }

}

const getUsers = async(req: NextApiRequest, res: NextApiResponse<Data>)=> {

    await db.connect()
    const users = await  User.find().select('-password').lean()
    await db.disconnect()

    return res.status(201).json(users)

}
const updateUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { userId ='', role = ''} = req.body

    if(!isValidObjectId(userId)){
        res.status(400).json({ message: 'No existe ese id' });
    }

    const validRoles = ['admin','super-user','SEO','client']

    if (!validRoles.includes(role)){
        res.status(400).json({ message: 'el rol no existe' + validRoles.join(', ') });

    }

    await db.connect()

    const user = await User.findById( userId )

    if(!user){
        await db.disconnect()
        res.status(404).json({ message: 'el usuario no exise' + userId });
    }

    user!.role = role
    await user!.save()

    await db.disconnect()

    return res.status(200).json({message:'Usuario actualizado'})
}

