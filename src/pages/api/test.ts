// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { checkQuery } from '@/common/check';
import { fetchBatchMetricsData } from '@/common/fetchData';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { owner,repo, metrics } = checkQuery(req.query);
    const re = await fetchBatchMetricsData({owner,repo, metrics})
    res.status(200).json(re);
  } catch (err: any) {
    res.status(200).send("❌ ERROR:"+ err.message);
  }
}
