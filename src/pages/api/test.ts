// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { checkQuery } from '@/common/check';
import { fetchBatchMetricsData } from '@/common/fetchData';
import { indexFilter } from '@/common/filter';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { owner,repo, metrics } = checkQuery(req.query);
    const batchMetricsData = await fetchBatchMetricsData({owner,repo, metrics})
    const re = indexFilter(batchMetricsData[metrics[0]], -1)
    res.status(200).send(re);
  } catch (err: any) {
    res.status(200).send("❌ ERROR:"+ err.message);
  }
}
