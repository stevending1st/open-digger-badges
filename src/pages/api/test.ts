// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { makeBadge } from 'badge-maker'
import { checkQuery } from '@/common/check';
import { fetchBatchMetricsData } from '@/common/fetchData';
import { indexFilter } from '@/common/filter';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    res.setHeader("Content-Type", "image/svg+xml");
    const { owner,repo, metrics, month } = checkQuery(req.query);
    const batchMetricsData = await fetchBatchMetricsData({owner,repo, metrics})
    const re = indexFilter(batchMetricsData[metrics[0]], month)
    const svg = makeBadge({
      label: metrics[0],
      message: re.toString(),
    })
    res.status(200).send(svg);
  } catch (err: any) {
    res.setHeader("Content-Type", "text");
    res.status(200).send("❌ ERROR:"+ err.message);
  }
}
