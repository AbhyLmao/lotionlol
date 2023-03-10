import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

function Edit(props) {
  const titleElement = useRef();
  const [value, setValue] = useState("");
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (props.tasks.find((element) => element.id === id)) {
      props.tasks.find((element) => {
        return element.id === id ? setValue(element.value) : setValue("");
      });
    } else {
    }
  }, [props, id]);

  useEffect(() => {
    console.log("element use effect props");

    if (props.tasks.find((element) => element.id === id)) {
      props.tasks.find((element) => {
        return element.id === id ? setTitle(element.title) : setValue("");
      });
      props.tasks.find((element) => {
        return element.id === id ? setValue(element.description) : setValue("");
      });
    } else {
    }
  }, [props.tasks, id]);

  async function addTask() {
    var targetElement = props.tasks.find((element) => element.id === id);
    if (targetElement !== undefined) {
      targetElement.title = title;
      targetElement.description = value;
      localStorage.setItem("test", JSON.stringify(props.tasks));
      navigate(`/${id}`);
    }
  }
  function DeleteTask() {
    props.changeTask(props.tasks.filter((task) => task.id != id));
    localStorage.setItem(
      "test",
      JSON.stringify(props.tasks.filter((task) => task.id != id))
    );
    navigate("/");
  }

  return (
    <div className="flex h-full w-full">
      {props.sidebar && (
        <Sidebar
          tasks={props.tasks}
          changeTask={props.changeTask}
          changeTitle={props.changeTitle}
        />
      )}
      <div className="">
        <div className="flex justify-between">
          <div className="flex-col">
            <input
              type="text"
              placeholder="Untled"
              value={title}
              ref={titleElement}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>date</div>
          </div>
          <div className="flex gap-10">
            <button onClick={addTask}>save</button>
            <button onClick={DeleteTask}>delete</button>
          </div>
        </div>
        <ReactQuill
          style={{ height: "96%" }}
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
}

export default Edit;
