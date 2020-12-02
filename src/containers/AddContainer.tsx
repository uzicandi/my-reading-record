import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Add from '../components/Add';
import { logout as logoutSaga } from '../redux/modules/auth';
import { RootState } from '../redux/modules/rootReducer';
import { goBack } from 'connected-react-router';
import {
  addBook as addBookSaga,
  getBooks as getBooksSaga,
} from '../redux/modules/books';
import { BookReqType, BookResType } from '../types';

const AddContainer = () => {
  const books = useSelector<RootState, BookResType[] | null>(
    state => state.books.books,
  );
  const error = useSelector<RootState, Error | null>(
    state => state.books.error,
  );
  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);
  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  const add = useCallback(
    (book: BookReqType) => {
      dispatch(addBookSaga(book));
    },
    [dispatch],
  );

  // [project] saga 함수를 실행하는 액션 생성 함수를 실행하는 함수를 컨테이너에 작성했다.
  // [project] 컨테이너에서 useDispatch, useSelector, useCallback 을 활용해서 중복없이 비동기 데이터를 보여주도록 처리했다.

  return (
    <Add
      books={books}
      loading={false}
      error={error}
      add={add}
      getBooks={getBooks}
      back={back}
      logout={logout}
    />
  );
};

export default AddContainer;
