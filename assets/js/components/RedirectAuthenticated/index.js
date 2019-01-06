// @flow
import React from 'react';
import { Redirect, Route } from 'react-router-dom';


type Props = {
  component: any,
  path: string,
  exactly?: boolean,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
}

const RedirectAuthenticated = ({
  path,
  exactly,
  isAuthenticated,
  willAuthenticate,
  component: Component,
}: Props) =>
  <Route
    exactly={exactly}
    path={path}
    render={(props) => {
      if (isAuthenticated) { return <Redirect to={{ pathname: '/' }} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Component {...props} />; }
      return null;
    }}
  />;

export default RedirectAuthenticated;
