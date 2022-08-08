import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

//createslice임포트 --> slice로 필요한 객체 넣을 거임
//configureStore: 작은 슬라이스를 모아서 store로 만들때(createstore를 추상호화한것)

import { todoList, postSlice } from "../modules/post";

export default configureStore({
  //state를 등록한다(객체를)
  //중앙관제탑같은거다 꼭 등록을 해줘야 한다.
  reducer: {
    //key와 value가 같을시 생략가능 --> todolist이렇게 써도 된다.
    todoList: todoList.reducer, //작명 : createslice만든거.reducer
    postSlice: postSlice.reducer,
  },
});
