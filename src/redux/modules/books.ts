import { BookResType } from '../../types';
import BookService from '../../services/BookService';
import { put, call, takeEvery } from 'redux-saga/effects';
import { handleActions, createActions } from 'redux-actions';
import TokenService from '../../services/TokenService';
import { AnyAction } from 'redux';

export interface BooksState {
  books: BookResType[] | null;
  loading: boolean;
  error: Error | null;
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

const options = {
  prefix: 'my-books/books',
};


// [project] redux-action 을 이용하여, books 모듈의 액션 생성 함수와 리듀서를 작성했다.
const GET_BOOKS = 'GET_BOOKS';

// export const { success, pending, fail } = createActions(
//   {
//     SUCCESS: (books: BookResType[]) => books
//   }, 
//   'PENDING',
//   'FAIL',
//   options);

const reducer = handleActions<BooksState, any>(
  {
    PENDING: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      books: action.payload.books,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options
);

export default reducer;

export const { getBooks } = createActions(
  {
    GET_BOOKS: (books: BookResType)  => ({books}),
    },  options
)



// [project] saga 함수를 실행하는 액션과 액션 생성 함수를 작성했다.
export function* sagas() {
  yield takeEvery(`${options.prefix}/GET_BOOKS`, getBooksSaga);
}

interface bookSagaAction extends AnyAction {
  payload: BookResType[];
}

// [project] 책 목록을 가져오는 saga 함수를 작성했다.
function* getBooksSaga(action: bookSagaAction) {
  try {
    const token: string | null = TokenService.get();
    if (!token) return;
    const books: BookResType[] = yield call(BookService.getBooks, token);
    yield put({ type: GET_BOOKS, books });
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}
// [project] 책을 추가하는 saga 함수를 작성했다.
// [project] 책을 삭제하는 saga 함수를 작성했다.
// [project] 책을 수정하는 saga 함수를 작성했다.




