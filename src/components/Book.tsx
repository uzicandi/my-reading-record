import React from 'react';

import styles from './Book.module.css';
import { BookResType } from '../types';
import { Link } from 'react-router-dom';

interface BookProps extends BookResType {}

// [project] 컨테이너에 작성된 함수를 컴포넌트에서 이용했다.
// [project] BookResType 의 응답 값을 이용하여, Book 컴포넌트를 완성했다.
const Book: React.FC<BookProps> = books => {
  console.log('book', books);

  return (
    <div className={styles.book}>
      <div className={styles.title}>
        <a className={styles.link_detail_title}>{books.title}</a>
      </div>
      <div className={styles.author}>
        <a className={styles.link_detail_author}>{books.author}</a>
      </div>
      <div className={styles.created}>{books.createdAt}</div>
      <div className={styles.tooltips}>
        <button
          type="button"
          className={(styles.link_url, styles.button_url)}
          onClick={e => {
            e.preventDefault();
            window.open(books.url);
          }}
        >
          url
        </button>
        <Link to={`/edit/${books.bookId}`}>
          <button className={styles.button_edit}>edit</button>
        </Link>
        <button>delete</button>
      </div>
    </div>
  );
};

export default Book;
