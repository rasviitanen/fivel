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

const MatchAuthenticated = ({
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
      if (isAuthenticated) { return <Component {...props} />; }
      if (willAuthenticate) { return null; }
      if (!willAuthenticate && !isAuthenticated) { return <Redirect to={{ pathname: '/login' }} />; }
      return null;
    }}
  />;

export default MatchAuthenticated;
