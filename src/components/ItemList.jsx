import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { InputForm } from "./InputForm";
import { Item } from "./Item";

export const ItemList = (props) => {
  const [todoList, setTodoList] = useState(null);

  // firestoreから全データを取得してstateに格納する関数
  const getTodosFromFirestore = async () => {
    const itemListArray = await firebase
      .firestore()
      .collection("todos")
      .orderBy("isDone")
      .orderBy("limit")
      .get();
    const todoArray = itemListArray.docs.map((x) => {
      return {
        id: x.id,
        data: x.data(),
      };
    });
    setTodoList(todoArray);
    return todoArray;
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
            todo={x}
            index={index}
            getTodosFromFirestore={getTodosFromFirestore}
          />
        ))}
      </ul>
    </div>
  );
};
