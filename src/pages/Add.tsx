import React from 'react';
import { Redirect } from 'react-router-dom';

import useToken from '../hooks/useToken';
import AddContainer from '../containers/AddContainer';

type Props = {
  loading: boolean;
  logout: () => void;
  history: {
    push: (path: string) => void;
  };
};
const Add = (props: Props) => {
  const token = useToken();
  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return <AddContainer history={props.history} />;
};

export default Add;
