import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { InputForm } from "./InputForm";
import { Item } from "./Item";
import axios from "axios";

export const ItemList = (props) => {
  const [todoList, setTodoList] = useState(null);

  // // firestoreから全データを取得してstateに格納する関数
  // const getTodosFromFirestore = async () => {
  //   const itemListArray = await firebase
  //     .firestore()
  //     .collection("todos")
  //     .orderBy("isDone")
  //     .orderBy("limit")
  //     .get();
  //   const todoArray = itemListArray.docs.map((x) => {
  //     return {
  //       id: x.id,
  //       data: x.data(),
  //     };
  //   });
  //   setTodoList(todoArray);
  //   return todoArray;
  // };

  // ItemList.jsx
  const getTodosFromFirestore = async () => {
    const requestUrl =
      "http://localhost:5000/react-firebase-d79a3/us-central1/api";
    const todoArray = await axios.get(requestUrl);
    setTodoList(todoArray.data);
    return todoArray.data;
  };

  // useEffectを利用してFirestoreからデータの一覧を取得．
  useEffect(() => {
    const result = getTodosFromFirestore();
  }, [props]);

  return (
    <div>
      <InputForm getTodosFromFirestore={getTodosFromFirestore} />
      <ul>
        {todoList?.map((x, index) => (
          <Item
            key={index}
            index={index}
            todo={x}
            getTodosFromFirestore={getTodosFromFirestore}
          />
        ))}
      </ul>
    </div>
  );
};
