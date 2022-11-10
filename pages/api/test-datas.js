import { dbConnect2 } from '../../lib/dbConnect2';
import TestData from '../../models/TestData';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect2();

  switch (method) {
    case 'GET':
      try {
        const testDatas = await TestData.find({});
        res.status(200).json({ success: true, data: testDatas });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const testData = await TestData.create(req.body);
        console.log(testData);
        res.status(201).json({ success: true, data: testData });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
