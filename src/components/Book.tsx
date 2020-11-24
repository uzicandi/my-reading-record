import React from 'react';
import styles from './Book.module.css';
import { BookResType } from '../types';
import { Link } from 'react-router-dom';
import {
  BookOutlined,
  HomeOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import moment from 'moment';

interface BookProps extends BookResType {
  goEdit: (bookId: number) => void;
  deleteBook: (bookId: number) => void;
}

// [project] 컨테이너에 작성된 함수를 컴포넌트에서 이용했다.
// [project] BookResType 의 응답 값을 이용하여, Book 컴포넌트를 완성했다.
const Book: React.FC<BookProps> = React.memo(
  ({ bookId, title, author, url, createdAt, goEdit, deleteBook }) => {
    return (
      <div className={styles.book}>
        <div className={styles.title}>
          <Link to={`book/${bookId}`} className={styles.link_detail_title}>
            <BookOutlined />
            {title}
          </Link>
        </div>
        <div className={styles.author}>
          <Link to={`book/${bookId}`} className={styles.link_detail_author}>
            {author}
          </Link>
        </div>
        <div className={styles.created}>
          {moment(createdAt).format('MM-DD-YYYY hh:mm a')}
        </div>
        <div className={styles.tooltips}>
          <Tooltip title={url}>
            <a
              href={url}
              target="_BLANK"
              rel="noopener noreferrer"
              className={styles.link_url}
            >
              <Button
                size="small"
                type="primary"
                shape="circle"
                icon={<HomeOutlined />}
                className={styles.button_url}
              />
            </a>
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              size="small"
              shape="circle"
              icon={<EditOutlined />}
              className={styles.button_edit}
              onClick={() => goEdit(bookId)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              size="small"
              type="primary"
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteBook(bookId)}
            />
          </Tooltip>
        </div>
      </div>
    );
  },
);

export default Book;
