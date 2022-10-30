import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  titleChanged,
  taskDeleted,
  completeTask,
  loadTasks,
  getTasks,
  getTasksLoadingStatus,
  createTasks,
} from "./store/task";
import configureStore from "./store/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "./store/errors";
import "./style.css";
const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1> App</h1>
      <button
        onClick={() =>
          dispatch(
            createTasks({ userId: 1, title: "New Task", completed: false })
          )
        }
      >
        Add task
      </button>
      {isLoading ? (
        <>
          <div className="loader"></div>
        </>
      ) : (
        <ul>
          {state.map((el) => (
            <li key={el.id}>
              <p>{el.title}</p>
              <p> {`Completed: ${el.completed}`}</p>
              <button onClick={() => dispatch(completeTask(el.id))}>
                Complete
              </button>
              <button onClick={() => changeTitle(el.id)}>Change title</button>
              <button onClick={() => deleteTask(el.id)}>Delete</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
