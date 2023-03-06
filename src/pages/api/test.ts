// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { checkQuery } from '@/common/check';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  checkQuery(req.query)
  res.status(200).send(req.query);
}
