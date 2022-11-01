import { ObjectId } from 'mongodb';
import { dbConnect } from '../../lib/dbConnect';

export default async function handler(req, res) {
  const { db } = await dbConnect();
  try {
    const { role } = req.body;
    // Set dynamically
    const id = '635e8531c6aee5acdc9088ed';
    await db.collection('users').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          role: 'ADMIN',
        },
      }
    );
    res.redirect(307, '/api/auth/session?update');
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}

// fetch('http://localhost:3000/api/auth/session?update').then(
//   (res) => res.status(200).json('dsfsdfsdfs')
//   // (res) => res.redirect(307, '/')
// );

// res.redirect(307, '/');

// res.status(200).json({
//   data: await db.collection('users').findOne({ _id: ObjectId(id) }),
//   message: 'Todo updated successfully',
// });
