import React, { useRef } from 'react';
import { message as messageDialog, PageHeader, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FormOutlined } from '@ant-design/icons';

import Layout from './Layout';
import { BookResType } from '../types';
import styles from './Edit.module.css';
import BookService from '../services/BookService';
import useToken from '../hooks/useToken';

interface EditProps {
  book: BookResType | undefined | null;
  loading: boolean;
  logout: () => void;
  history: HistoryProps;
}

type HistoryProps = {
  push: (path: string) => void;
};

// [project] 컨테이너에 작성된 함수를 컴포넌트에서 이용했다.
// [project] BookResType 의 응답 값을 이용하여, Edit 컴포넌트를 완성했다.
const Edit: React.FC<EditProps> = ({ book, loading, logout, history }) => {
  const titleRef = useRef<Input>(null);
  const messageRef = useRef<TextArea>(null);
  const authorRef = useRef<Input>(null);
  const urlRef = useRef<Input>(null);
  const token = useToken();
  console.log('edit history', history);
  if (book === null) {
    return null;
  }

  if (book === undefined) {
    return (
      <div>
        <h1>NotFound Book</h1>
      </div>
    );
  }

  return (
    <Layout>
      <PageHeader
        title={
          <div>
            <FormOutlined /> Edit Book
          </div>
        }
        subTitle="Edit Your Book"
        extra={[
          <Button
            key="1"
            type="primary"
            className={styles.button_logout}
            onClick={logout}
          >
            Logout
          </Button>,
        ]}
      />

      <img src="/bg_list.png" className={styles.bg} alt="books" />

      <div className={styles.edit}>
        <div className={styles.input_title}>
          Title
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input
            placeholder="Title"
            ref={titleRef}
            defaultValue={book.title || ''}
            className={styles.input}
          />
        </div>
        <div className={styles.input_comment}>
          Comment
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <TextArea
            rows={4}
            placeholder="Comment"
            ref={messageRef}
            defaultValue={book.message || ''}
            className={styles.input}
            style={{ minHeight: 100 }}
          />
        </div>
        <div className={styles.input_author}>Author</div>
        <div className={styles.input_area}>
          <Input
            placeholder="Author"
            ref={authorRef}
            defaultValue={book.author || ''}
            className={styles.input}
          />
        </div>
        <div className={styles.input_url}>URL</div>
        <div className={styles.input_area}>
          <Input
            placeholder="URL"
            ref={urlRef}
            defaultValue={book.url || ''}
            className={styles.input}
          />
        </div>
        <div className={styles.button_area}>
          <Button
            size="large"
            loading={loading}
            onClick={() => {
              if (token === null) return;
              console.log('history', history); // 여기는 history가 왜 없을까
              click(history, token as string, book.bookId);
            }}
            className={styles.button}
          >
            Update
          </Button>
        </div>
      </div>
    </Layout>
  );

  function click(history: HistoryProps, token: string, bookId: number) {
    const title = titleRef.current!.state.value;
    const message = messageRef.current!.state.value;
    const author = authorRef.current!.state.value;
    const url = urlRef.current!.state.value;

    if (
      title === undefined ||
      message === undefined ||
      author === undefined ||
      url === undefined
    ) {
      messageDialog.error('Please fill out all inputs');
      return;
    } else {
      BookService.editBook(token, bookId, { title, message, author, url });
      history.push('/');
    }
  }
};
export default Edit;
