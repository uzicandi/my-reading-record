import { BookResType } from '../../types';
import BookService from '../../services/BookService';
import { put, call, all, takeEvery } from 'redux-saga/effects';
import useToken from '../../hooks/useToken';
import { handleActions, createActions } from 'redux-actions';

export interface BooksState {
  books: BookResType[] | null;
  loading: boolean;
  error: Error | null;
}

const initialState: BooksState = {
  books: null,
  loading: false,
  error: null,
};

const token = useToken();

// [project] redux-action 을 이용하여, books 모듈의 액션 생성 함수와 리듀서를 작성했다.
const GET_BOOKS = 'GET_BOOKS';
const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR';

const GET_BOOK = 'GET_BOOK';
const GET_BOOK_SUCCESS = 'GET_BOOK_SUCCESS';
const GET_BOOK_ERROR = 'GET_BOOK_ERROR';

export const getBooks = () => ({ type: GET_BOOKS });
export const getBook = (id: any) => ({ type: GET_BOOK, payload: id, meta: id });

// const reducer = (state = initialState) => {
//   return state;
// };

export const { success, pending, fail } = createActions(
  {
    SUCCESS: (token: string) => ({ token }),
  },
  'PENDING',
  'FAIL',
);

const reducer = handleActions<BooksState, any>({
  PENDING: state => ({
    ...state,
    loading: true,
    error: null,
  }),
  SUCCESS: (state, action) => ({
    ...state,
    token: action.payload.token,
    loading: false,
    error: null,
  }),
  FAIL: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
});

export default reducer;

// [project] 책 목록을 가져오는 saga 함수를 작성했다.
function* getBooksSaga() {
  try {
    return yield call(BookService.getBooks, token as string);
  } catch (e) {
    console.log('err', e);
  }
}
// [project] 책을 추가하는 saga 함수를 작성했다.
// [project] 책을 삭제하는 saga 함수를 작성했다.
// [project] 책을 수정하는 saga 함수를 작성했다.

// [project] saga 함수를 실행하는 액션과 액션 생성 함수를 작성했다.

export function* sagas() {
  yield takeEvery(GET_BOOKS, getBooksSaga);
}
