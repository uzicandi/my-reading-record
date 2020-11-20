import React, { useEffect } from 'react';
import { Table, PageHeader, Button } from 'antd';

import styles from './List.module.css';
import Layout from './Layout';
import Book from './Book';
import { BookResType } from '../types';

interface BooksProps {
  books: BookResType[] | null;
  error: Error | null;
  loading: boolean;
  getBooks: () => void;
  goAdd: () => void;
  goEdit: (bookId: number) => void;
  logout: () => void;
}

// [project] 컨테이너에 작성된 함수를 컴포넌트에서 이용했다.
// [project] BookResType 의 응답 값을 이용하여, List 컴포넌트의 키를 처리했다.
const Books: React.FC<BooksProps> = ({
  books,
  getBooks,
  loading,
  error,
  goAdd,
  goEdit,
  logout,
}) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  return (
    <Layout>
      <PageHeader
        title={<div>Book List</div>}
        extra={[
          <Button
            key="2"
            type="primary"
            className={styles.button}
            onClick={goAdd}
          >
            Add Book
          </Button>,
          <Button
            key="1"
            type="primary"
            className={styles.button}
            onClick={logout}
          >
            Logout
          </Button>,
        ]}
      />
      <img src="/bg_list.png" style={{ width: '100%' }} alt="books" />
      <Table
        dataSource={books || []}
        columns={[
          {
            title: 'books',
            dataIndex: 'book',
            key: 'book',
            render: (text, record) => (
              <Book {...record} goEdit={goEdit} key={'{record.bookId}'} />
            ),
          },
        ]}
        loading={books === null || loading}
        showHeader={false}
        className={styles.table}
        rowKey="bookId"
        pagination={false}
      />
    </Layout>
  );
};

export default Books;
