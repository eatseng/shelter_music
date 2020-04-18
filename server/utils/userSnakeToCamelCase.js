const userSnakeToCamelCase = module.exports = (user) => {
  return {
    id: user.id,
    email: user.email,
    familyName: user.family_name,
    givenName: user.given_name,
    name: user.name,
    picture: user.picture,
  };
}