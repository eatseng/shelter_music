const fetchGraphQL = async (text, variables) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_END_POINT}:4000/graphql`,
    {
      body: JSON.stringify({
        query: text,
        variables,
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );

  return await response.json();
}

export default fetchGraphQL;