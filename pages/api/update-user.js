import { dbConnect } from '../../lib/dbConnect';

export default async function handler(req, res) {
  const { db } = await dbConnect();

  try {
    // const { role } = req.body;
    // const id = '635e8531c6aee5acdc9088ed';

    // await db.collection('users').updateOne(
    //   { _id: ObjectId(id) },
    //   {
    //     $set: {
    //       role: 'asser',
    //     },
    //   }
    // );

    console.log('okfoskokokokok');

    res.redirect(307, '/api/auth/session?update');

    // router.push('/api/auth/session?update');

    // fetch('http://localhost:3000/api/auth/session?update').then(
    //   (res) => res.status(200).json('dsfsdfsdfs')
    //   // (res) => res.redirect(307, '/')
    // );

    // res.redirect(307, '/');

    // res.status(200).json({
    //   data: await db.collection('users').findOne({ _id: ObjectId(id) }),
    //   message: 'Todo updated successfully',
    // });
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' });
  }
}

{
  /* <script>
  
  // Url for the request 
  var url = 'https://jsonplaceholder.typicode.com/todos/1';

  // Making our request 
  fetch(url, { method: 'GET' })
      .then(Result => Result.json())
      .then(string => {

          // Printing our response 
          console.log(string);
            
          // Printing our field of our response
          console.log(`Title of our response :  ${string.title}`);
      })
      .catch(errorMsg => { console.log(errorMsg); });
</script> */
}

// import { useEffect, useState } from 'react';

// function Profile() {
//   const [data, setData] = useState(null)
//   const [isLoading, setLoading] = useState(false)

//   useEffect(() => {
//     setLoading(true)
//     fetch('/api/profile-data')
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data)
//         setLoading(false)
//       })
//   }, [])

// export default async function handler(req, res) {
//   const { name, message } = req.body
//   try {
//     await handleFormInputAsync({ name, message })
//     res.redirect(307, '/')
//   } catch (err) {
//     res.status(500).send({ error: 'failed to fetch data' })
//   }
// }
