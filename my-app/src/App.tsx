import React, { useEffect } from 'react';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import TestProfile from './components/TestProfile';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';
import { User } from './graphql/model/User';
import { CREATE_USER_ON_SIGN_IN } from './graphql/mutation/User';
import TestPlaid from './components/TestPlaid';
import Link from './components/Link';

function App() {

  const { user, isAuthenticated } = useAuth0();
  const [ createUserOnSignIn, { loading, error, data } ] = useMutation<{
    CreateUserOnSignIn: User
  }>(CREATE_USER_ON_SIGN_IN);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(`user logs in ${user}`);
      // Only create user if this user has not sign in from this application yet.
      createUserOnSignIn({variables: { input: {
        first_name: user?.given_name,
        last_name: user?.family_name,
        picture: user?.picture,
        email: user?.email,
        sub: user?.sub
      }}}).then((data) => {
        console.log("createUserOnSignIn completed");
        console.log(data)
      })
    }
  }, [isAuthenticated])


  return (
    <div className="App">
      <LoginButton />
      <LogoutButton />
      {isAuthenticated && <TestProfile />}
      {isAuthenticated && <TestPlaid />}
      {isAuthenticated && <Link/> }
    </div>
  );
}

export default App;
