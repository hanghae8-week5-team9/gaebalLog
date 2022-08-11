import { createSlice } from "@reduxjs/toolkit";

let deleteList = createSlice({
  //slice만들때 선언( 선언한 slice의 name에 따라서 액션 생성자, 액션 타입, 리듀서를 자동으로 생성해줍니다. 따라서 별도로 createAction이나 createReducer를 사용하지 않아도 됩니다.

  name: "deleteList", //slice이름
  initialState: [],
  reducers: {
    addHandler(state, action) {
      state.push(action.payload);
    },

    doneHandler(state, action) {
      let 번호 = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[번호].isDone = !state[번호].isDone;
    },
    deleteHandler(state, action) {
      state.splice(action.payload, 1);
    },
  },
});

export let { addHandler, doneHandler, deleteHandler } = deleteList.actions;
export default deleteList;
