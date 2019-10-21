/**
 * GET ALL THE CATS!!!!!!!
 */

// import the faunadb package
// import faunadb from 'faunadb';
const faunadb = require('faunadb');

// connect to faunadb
const q = faunadb.query;
const client = new faunadb.Client({
  // automatically an environment variable thanks to netlify addons:create fauna
  secret: process.env.FAUNADB_SERVER_SECRET
});

// create the serverless function
// go get information from faunadb
exports.handler = async (event, context, callback) => {
  console.log('Function `cats-read-all` invoked');

  return client
    .query(q.Paginate(q.Match(q.Ref('indexes/all_cats'))))
    .then(response => {
      const catRefs = response.data;

      console.log('Cat refs', catRefs);
      console.log(`${catRefs.length} cats found`);

      // create new query out of cat refs. http://bit.ly/2LG3MLg
      const getAllCatDataQuery = catRefs.map(ref => {
        return q.Get(ref);
      });

      // then query the refs
      return client.query(getAllCatDataQuery).then(ret => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        };
      });
    })
    .catch(error => {
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};
