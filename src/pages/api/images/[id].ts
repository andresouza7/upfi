import { NextApiRequest, NextApiResponse } from 'next';

import { fauna, q } from '../../../services/faunadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'PATCH') {
    const { id } = req.query;
    const data = req.body;

    return fauna
      .query(
        q.Update(q.Ref(q.Collection('images'), id), {
          data,
        })
      )
      .then(() => res.status(201).json({ success: true }))
      .catch(err =>
        res.status(501).json({ error: `Something Happened! ${err.message}` })
      );
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    return fauna
      .query(q.Delete(q.Ref(q.Collection('images'), id)))
      .then(() => res.status(201).json({ success: true }))
      .catch(err =>
        res.status(501).json({ error: `Something Happened! ${err.message}` })
      );
  }

  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}
