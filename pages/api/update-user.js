// import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // res.status(200).json(comments);
  } else if (req.method === 'POST') {
    const client = await clientPromise;
    const db = client.db('notcherdb');

    const email = req.body.email;
    const role = req.body.role;

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
      console.log(err);
      res.status(500).send({ error: 'failed to fetch data' });
    }
  }
}
