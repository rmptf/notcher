import { ObjectId } from 'mongodb';
import { dbConnect } from '../../../lib/dbConnect';

export default async function handler(req, res) {
  const { db } = await dbConnect();
  try {
    // const { role } = req.body;
    const { param } = req.query;
    console.log('-----------req.body-----------');
    console.log(req.body);
    // Set dynamically
    const id = '635e8531c6aee5acdc9088ed';
    await db.collection('users').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          role: param,
        },
      }
    );
    res.redirect(307, '/api/auth/session?update');
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}
