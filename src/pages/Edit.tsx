import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import useToken from '../hooks/useToken';
import EditContainer from '../containers/EditContainer';

type Props = {
  history: {
    push: (path: string) => void;
  };
};

const Edit = (props: Props) => {
  const token = useToken();
  const { id } = useParams();
  const idProps = Number(id);
  console.log(idProps);
  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return <EditContainer id={idProps} history={props.history} />;
};

export default Edit;
