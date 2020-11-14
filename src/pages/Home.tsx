import React from 'react';
import { Redirect } from 'react-router-dom';

import useToken from '../hooks/useToken';
import ListContainer from '../containers/ListContainer';

type Props = {
  history: { push: (path: string) => void };
};

const Home = (props: Props) => {
  console.log('props:', props);
  const token = useToken();
  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return <ListContainer history={props.history} />;
};

export default Home;
