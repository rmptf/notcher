// import { ObjectId } from 'mongodb';
import { dbConnect } from '../../../lib/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // res.status(200).json(comments);
  } else if (req.method === 'POST') {
    console.log('Im here');
    const param1 = req.body.role1;
    const param2 = req.body.email1;
    console.log(param1, param2);
    const { db } = await dbConnect();
    try {
      console.log('inside try');
      // let updatedUser = await db.collection('users').updateOne(
      await db.collection('users').updateOne(
        { email: param2 },
        {
          $set: {
            role: param1,
          },
        }
      );
      console.log('finished try');
      res.status(201).json('updatedUser');
      // res.status(201).json(updatedUser);
    } catch (err) {
      res.status(500).send({ error: 'failed to fetch data' });
    }
  }
}
