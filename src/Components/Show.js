import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Show(props) {
  const navigate = useNavigate();
  console.log(props);
  return (
    <div className="flex w-screen">
      <Sidebar tasks={props.tasks} changeTask={props.changeTask} />

      <div className="w-[100%]">
        <div className="flex justify-between">
          <div>
            <div className="flex-col">
              <div>title</div>
              <div>date</div>
            </div>
          </div>
          <div className="flex gap-10">
            <button onClick={() => navigate("edit")}>Edit</button>
            <button>delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;