# Get started with Apollo Client
Apollo Client works seamlessly with these GraphOS router supported features:
# Step 1: Setup 
Create a new React project locally with Vite, or
Create a new React sandbox on CodeSandbox.

 # Step 2: Install dependencies
Applications that use Apollo Client require two top-level dependencies:

@apollo/client: This single package contains virtually everything you need to set up Apollo Client. It includes the in-memory cache, local state management, error handling, and a React-based view layer.
graphql: This package provides logic for parsing GraphQL queries.
Run the following command to install both of these packages:

npm install @apollo/client graphql

If you're using a React sandbox from CodeSandbox and you encounter a TypeError, try downgrading the version of the graphql package to 15.8.0 in the Dependencies panel. If you encounter a different error after downgrading, refresh the page.

# Step 3: Initialize ApolloClient
With our dependencies set up, we can now initialize an ApolloClient instance.

In main.jsx, let's first import the symbols we need from @apollo/client:

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

Next we'll initialize ApolloClient, passing its constructor a configuration object with the uri and cache fields:
const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

uri specifies the URL of our GraphQL server.

cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them.
That's it! Our client is ready to start fetching data. Now before we start using Apollo Client with React, let's first try sending a query with plain JavaScript.

In the same main.jsx file, call client.query() with the query string (wrapped in the gql template literal) shown below:

// const client = ...

client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));

  Run this code, open your console, and inspect the result object. You should see a data property with locations attached, along with some other properties like loading and networkStatus. Nice!

Although executing GraphQL operations directly like this can be useful, Apollo Client really shines when it's integrated with a view layer like React. You can bind queries to your UI and update it automatically as new data is fetched.

Let's look at how that works!

# Step 4: Connect your client to React
You connect Apollo Client to React with the ApolloProvider component. Similar to React's Context.Provider, ApolloProvider wraps your React app and places Apollo Client on the context, enabling you to access it from anywhere in your component tree.

In main.jsx, let's wrap our React app with an ApolloProvider. We suggest putting the ApolloProvider somewhere high in your app, above any component that might need to access GraphQL data.

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);

# Step 5: Fetch data with useQuery
After your ApolloProvider is hooked up, you can start requesting data with useQuery.
The useQuery hook is a React hook that shares GraphQL data with your UI.
Switching over to our App.jsx file, we'll start by replacing our existing file contents with the code snippet below:

// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
    </div>
  );
}

We can define the query we want to execute by wrapping it in the gql template literal:

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

Next, let's define a component named DisplayLocations that executes our GET_LOCATIONS query with the useQuery hook:

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map(({ id, name, description, photo }) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}
When your app reloads, you should briefly see a loading indicator, followed by a list of locations and details about those locations! If you don't, you can compare your code against th

