// import { ObjectId } from 'mongodb';
import { dbConnect } from '../../lib/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // res.status(200).json(comments);
  } else if (req.method === 'POST') {
    const email = req.body.email;
    const role = req.body.role;
    const { db } = await dbConnect();
    try {
      await db.collection('users').updateOne(
        { email: email },
        {
          $set: {
            role: role,
          },
        }
      );
      res.status(201).json('updatedUser');
    } catch (err) {
      res.status(500).send({ error: 'failed to fetch data' });
    }
  }
}
