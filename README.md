## Installation

git clone the respository at https://github.com/eatseng/shelter_music

install dependencies by running 'npm install'

## Start web server

in app root directory, enter 'npm run dev' in terminal.

go to http://localhost:3000 in your chrome browser.

## Troubleshooting

There may be dependencies missing such as GraphQL and Relay

graphql.org/graphql-js/
npm install graphql --save

https://relay.dev/docs/en/experimental/step-by-step
NPM Users
npm install --save relay-runtime react-relay@experimental
npm install --save-dev relay-compiler graphql

Yarn Users
yarn add relay-runtime react-relay@experimental
yarn add --dev relay-compiler graphql babel-plugin-relay