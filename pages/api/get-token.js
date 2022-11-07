import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_JWT_SECRET;

export default async function handler(req, res) {
  const token = await getToken({
    req: req,
    secret: secret,
  });
  console.log('JSON Web Token', token);
  res.end();
}
