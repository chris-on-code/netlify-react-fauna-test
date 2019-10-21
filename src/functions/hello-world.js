exports.handler = async (event, context) => {
  const data = {
    name: 'chris',
    twitter: 'chrisoncode'
  };

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
