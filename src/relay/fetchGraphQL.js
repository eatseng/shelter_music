import Auth from '../utils/Auth';

const fetchGraphQL = async (text, variables) => {
  const response = await fetch('http://localhost:4000/graphql', {
    body: JSON.stringify({
      query: text,
      variables,
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  return await response.json();
}

export default fetchGraphQL;