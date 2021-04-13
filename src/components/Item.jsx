import React from "react";
import firebase from "../firebase";
import axios from "axios";

export const Item = ({ index, todo, getTodosFromFirestore }) => {
  // timestamp形式のデータをいい感じの形式に変換する関数
  const convertFromTimestampToDatetime = (timestamp) => {
    const _d = timestamp ? new Date(timestamp * 1000) : new Date();
    const Y = _d.getFullYear();
    const m = (_d.getMonth() + 1).toString().padStart(2, "0");
    const d = _d.getDate().toString().padStart(2, "0");
    const H = _d.getHours().toString().padStart(2, "0");
    const i = _d.getMinutes().toString().padStart(2, "0");
    const s = _d.getSeconds().toString().padStart(2, "0");
    return `${Y}/${m}/${d} ${H}:${i}:${s}`;
  };

  // ↓追加 ドキュメントIDを指定してFirestoreのデータを更新する関数
  const updateDataOnFirestore = async (collectionName, documentId, isDone) => {
    const newData = { isDone: isDone ? false : true };
    const requestUrl =
      "http://localhost:5000/react-firebase-d79a3/us-central1/api/";
    const updatedData = await axios.put(`${requestUrl}${documentId}`, newData);
    getTodosFromFirestore();
    return updatedData;
  };
  // const updateDataOnFirestore = async (collectionName, documentId, isDone) => {
  //   const updatedData = await firebase
  //     .firestore()
  //     .collection(collectionName)
  //     .doc(documentId)
  //     .update({
  //       isDone: isDone ? false : true,
  //     });
  //   getTodosFromFirestore();
  //   return;
  // };

  // ↓追加 ドキュメントIDを指定してFirestoreのデータを削除する関数
  const deleteDataOnFirestore = async (collectionName, documentId) => {
    const requestUrl =
      "http://localhost:5000/react-firebase-d79a3/us-central1/api/";
    const removedData = await axios.delete(`${requestUrl}${documentId}`);
    getTodosFromFirestore();
    return removedData;
  };
  // const deleteDataOnFirestore = async (collectionName, documentId) => {
  //   const removedData = await firebase
  //     .firestore()
  //     .collection(collectionName)
  //     .doc(documentId)
  //     .delete();
  //   getTodosFromFirestore();
  //   return;
  // };

  return (
    <li key={index} id={todo.id}>
      <input
        type="checkbox"
        value={todo.id}
        checked={todo.data.isDone}
        onChange={(e) =>
          updateDataOnFirestore("todos", todo.id, todo.data.isDone)
        }
      />
      <button
        value={todo.id}
        onClick={(e) => deleteDataOnFirestore("todos", todo.id)}
      >
        delete
      </button>
      {!todo.data.isDone ? (
        <div>
          <p>
            締め切り：{convertFromTimestampToDatetime(todo.data.limit._seconds)}
          </p>
          <p>やること：{todo.data.todo}</p>
        </div>
      ) : (
        <div>
          <p>
            <del>
              締め切り：
              {convertFromTimestampToDatetime(todo.data.limit._seconds)}
            </del>
          </p>
          <p>
            <del>やること：{todo.data.todo}</del>
          </p>
        </div>
      )}
    </li>
  );
};
