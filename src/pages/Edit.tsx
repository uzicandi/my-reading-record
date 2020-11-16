import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import useToken from '../hooks/useToken';
import EditContainer from '../containers/EditContainer';

const Edit = () => {
  const token = useToken();
  let { id } = useParams();
  const bookId = Number({ id });
  console.log('typeof id', typeof bookId);
  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return <EditContainer bookId={bookId} />;
};

export default Edit;
