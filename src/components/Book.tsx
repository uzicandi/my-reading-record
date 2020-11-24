import React from 'react';
import styles from './Book.module.css';
import { BookResType } from '../types';

interface BookProps extends BookResType {
  goEdit: (bookId: number) => void;
  deleteBook: (bookId: number) => void;
}

// [project] 컨테이너에 작성된 함수를 컴포넌트에서 이용했다.
// [project] BookResType 의 응답 값을 이용하여, Book 컴포넌트를 완성했다.
const Book: React.FC<BookProps> = ({
  bookId,
  title,
  author,
  url,
  createdAt,
  goEdit,
  deleteBook,
}) => {
  return (
    <div className={styles.book}>
      <div className={styles.title}>
        <a className={styles.link_detail_title}>{title}</a>
      </div>
      <div className={styles.author}>
        <a className={styles.link_detail_author}>{author}</a>
      </div>
      <div className={styles.created}>{createdAt}</div>
      <div className={styles.tooltips}>
        <button
          type="button"
          className={(styles.link_url, styles.button_url)}
          onClick={e => {
            e.preventDefault();
            window.open(url);
          }}
        >
          url
        </button>

        <button className={styles.button_edit} onClick={() => goEdit(bookId)}>
          edit
        </button>

        <button onClick={() => deleteBook(bookId)}>delete</button>
      </div>
    </div>
  );
};

export default Book;
