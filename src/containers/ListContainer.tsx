import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import List from '../components/List';
import { logout as logoutSaga } from '../redux/modules/auth';
import { push } from 'connected-react-router';
import BookService from '../services/BookService';
import useToken from '../hooks/useToken';
import { BookResType } from '../types';

const ListContainer = ({
  history,
}: {
  history: { push: (path: string) => void };
}) => {
  const dispatch = useDispatch();
  const goAdd = useCallback(() => {
    dispatch(push('/add'));
  }, [dispatch]);
  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);
  const token = useToken();

  const [books, setBooks] = useState<BookResType[]>([]);
  useEffect(() => {
    const setAsyncBooks = async () => {
      setBooks(await BookService.getBooks(token as string));
    };

    setAsyncBooks();
  }, []);
  console.log('books', books);

  // [project] saga 함수를 실행하는 액션 생성 함수를 실행하는 함수를 컨테이너에 작성했다.
  // [project] 컨테이너에서 useDispatch, useSelector, useCallback 을 활용해서 중복없이 비동기 데이터를 보여주도록 처리했다.

  //return <List books={[]} loading={false} goAdd={goAdd} logout={logout} />;
  return (
    <List
      history={history}
      books={books}
      loading={false}
      goAdd={goAdd}
      logout={logout}
    />
  );
};

export default ListContainer;
