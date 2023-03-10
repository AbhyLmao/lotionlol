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

  const [date, setDate] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (props.tasks.find((element) => element.id === id)) {
      props.tasks.find((element) => {
        return element.id === id ? setValue(element.value) : setValue("");
      });
    } else {
    }
  }, [props, id]);

  const formatDate = (tday) => {
    const formatted = new Date(tday).toLocaleString("en-US");
    if (formatted === "Invalid Date") {
        return "";
    }
    return formatted;
  };
  const date2 = formatDate(date);

  useEffect(() => {
    console.log("element use effect props");

    if (props.tasks.find((element) => element.id === id)) {
      props.tasks.find((element) => {
        return element.id === id ? setTitle(element.title) : setValue("");
      });
      props.tasks.find((element) => {
        return element.id === id ? setValue(element.description) : setValue("");
      });
      props.tasks.find((element) => {
        return element.id === id ? setValue(element.createdat) : setValue("");
      });
    } else {
    }
  }, [props.tasks, id]);

  async function addTask() {
    var targetElement = props.tasks.find((element) => element.id === id);
    if (targetElement !== undefined) {
      targetElement.title = title;
      targetElement.description = value;
      targetElement.createdat = date2;
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
      <div className="w-[100%]">
        <div className="flex justify-between p-5">
          <div className="flex-col">
            <input
              className="font-bold text-[#2a0069] text-4xl bg-[#eae0fa]"
              type="text"
              placeholder="Untitled"
              value={title}
              ref={titleElement}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div><input className="text-2xl bg-[#eae0fa]" type="datetime-local" id='date-time-input' onChange={(e) => setDate(e.target.value)} value={date} /></div>
          </div>
          <div className="flex gap-5">
            <button className= "text-2xl font-bold rounded-full bg-[#8d73b3] pl-7 pr-7" onClick={addTask}>Save</button>
            <button className= "text-2xl font-bold rounded-full bg-[#8d73b3] pl-7 pr-7" onClick={DeleteTask}>Delete</button>
          </div>
        </div >
        <ReactQuill 
          className="pl-5 pr-5"
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
