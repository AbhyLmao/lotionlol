import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams, useRoutes } from "react-router-dom";
import Sidebar from "./Sidebar";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

function Edit(props) {
  const [value, setValue] = useState("");
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(value);
    console.log(title);
    console.log(props);
  }, [value, title, props]);

  console.log(props, "props");

  async function addTask() {
    await props.changeTask([
      ...props.tasks,
      {
        title: title,
        createdat: Date.now(),
        description: value,
        id: id,
      },
    ]);
    navigate(`/${id}`);
  }

  return (
    <div className="flex h-full w-full">
      <Sidebar tasks={props.tasks} changeTask={props.changeTask} />
      <div className="">
        <div className="flex justify-between">
          <div className="flex-col">
            <input
              type="text"
              placeholder="Untled"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>date</div>
          </div>
          <div className="flex gap-10">
            <button onClick={addTask}>save</button>
            <button>delete</button>
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