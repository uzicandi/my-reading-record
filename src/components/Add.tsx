import React from 'react';
import { message as messageDialog, PageHeader, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FormOutlined } from '@ant-design/icons';

import Layout from './Layout';
import styles from './Add.module.css';
import BookService from '../services/BookService';
import useToken from '../hooks/useToken';

interface AddProps {
  loading: boolean;
  logout: () => void;
  history: HistoryProps;
}

type HistoryProps = {
  push: (path: string) => void;
};

// [project] 컨테이너에 작성된 함수를 컴포넌트에서 이용했다.
const Add: React.FC<AddProps> = ({ loading, logout, history }) => {
  const titleRef = React.useRef<Input>(null);
  const messageRef = React.useRef<TextArea>(null);
  const authorRef = React.useRef<Input>(null);
  const urlRef = React.useRef<Input>(null);
  const token = useToken();
  return (
    <Layout>
      <PageHeader
        title={
          <div>
            <FormOutlined /> Add Book
          </div>
        }
        subTitle="Add Your Book"
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

      <div className={styles.add}>
        <div className={styles.input_title}>
          Title
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input placeholder="Title" ref={titleRef} className={styles.input} />
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
            className={styles.input}
          />
        </div>
        <div className={styles.input_author}>
          Author
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input
            placeholder="Author"
            ref={authorRef}
            className={styles.input}
          />
        </div>
        <div className={styles.input_url}>
          URL
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input placeholder="URL" ref={urlRef} className={styles.input} />
        </div>
        <div className={styles.button_area}>
          <Button
            size="large"
            loading={loading}
            onClick={() => {
              if (token === null) return;
              console.log('add history', history);
              click(history, token as string);
            }}
            className={styles.button}
          >
            Add
          </Button>
        </div>
      </div>
    </Layout>
  );

  function click(history: HistoryProps, token: string) {
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
      BookService.addBook(token, { title, message, author, url });
      // newbook이 나오지 않음
      history.push('/');
    }
  }
};
export default Add;
