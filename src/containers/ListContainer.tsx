import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import List from '../components/List';
import { RootState } from '../redux/modules/rootReducer';
import { BookResType } from '../types';
import { logout as logoutSaga } from '../redux/modules/auth';
import { getBooks as getBooksSaga } from '../redux/modules/books';

const ListContainer: React.FC = props => {
  // [project] 컨테이너에서 useDispatch, useSelector, useCallback 을 활용해서 중복없이 비동기 데이터를 보여주도록 처리했다.
  const books = useSelector<RootState, BookResType[] | null>(
    state => state.books.books,
  );
  const loading = useSelector<RootState, boolean>(state => state.books.loading);
  const error = useSelector<RootState, Error | null>(
    state => state.books.error,
  );

  const dispatch = useDispatch();
  // [project] saga 함수를 실행하는 액션 생성 함수를 실행하는 함수를 컨테이너에 작성했다.
  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const goAdd = useCallback(() => {
    dispatch(push('/add'));
  }, [dispatch]);

  const goEdit = useCallback(
    (bookId: number) => {
      dispatch(push(`/edit/${bookId}`));
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  return (
    <List
      {...props}
      books={books}
      loading={loading}
      error={error}
      getBooks={getBooks}
      goAdd={goAdd}
      goEdit={goEdit}
      logout={logout}
    />
  );
};

export default ListContainer;
