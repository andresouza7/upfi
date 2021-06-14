import faunadb from 'faunadb';

export const fauna = new faunadb.Client({
  secret: process.env.FAUNA_API_KEY,
});

export const q = faunadb.query;
