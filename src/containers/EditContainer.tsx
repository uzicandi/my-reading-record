import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Edit from '../components/Edit';
import { logout as logoutSaga } from '../redux/modules/auth';
import { BookResType } from '../types';
import BookService from '../services/BookService';
import useToken from '../hooks/useToken';
import { number } from 'prop-types';

const EditContainer = (bookId: any) => {
  const token = useToken();
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);
  const [book, setBook] = useState<BookResType[]>([]);
  useEffect(() => {
    const setAsyncBook = async () => {
      const books = await BookService.getBooks(token as string);
      books.filter(book => console.log(book.bookId === 3740));
      //setBook(books.filter(book => book.bookId === bookId));
    };
    setAsyncBook();
  }, []);
  console.log('book > ', book);

  // [project] saga 함수를 실행하는 액션 생성 함수를 실행하는 함수를 컨테이너에 작성했다.
  // [project] 컨테이너에서 useDispatch, useSelector, useCallback 을 활용해서 중복없이 비동기 데이터를 보여주도록 처리했다.
  // [project] Edit 나 Detail 컴포넌트에서 새로고침 시, 리스트가 없는 경우, 리스트를 받아오도록 처리했다.

  return <Edit book={null} loading={false} logout={logout} />;
};

export default EditContainer;
