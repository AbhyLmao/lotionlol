import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

function Show(props) {
  const navigate = useNavigate();
  //
  //
  const [loading, setLoading] = useState(true);
  const [taskTitle, setTaskTitle] = useState("");
  const [desc, setDesc] = useState("");
  //
  //
  const { id } = useParams();

  useEffect(() => {
    if (localStorage.getItem("test") != null) {
    }
  }, []);
  useEffect(() => {
    var target = props.tasks.find((task) => task.id == id);
    if (target != undefined) {
      setTaskTitle(target.title);
      setDesc(target.description);
      setLoading(false);
    }
  }, [taskTitle, desc, loading, props.tasks, id]);
  function DeleteTask() {
    props.changeTask(props.tasks.filter((task) => task.id != id));
    localStorage.setItem(
      "test",
      JSON.stringify(props.tasks.filter((task) => task.id != id))
    );
    navigate("/");
  }

  return (
    <div className="flex w-screen">
      {props.sidebar && (
        <Sidebar
          tasks={props.tasks}
          changeTitle={props.changeTitle}
          changeDesc={props.targetDesc}
          changeTask={props.changeTask}
        />
      )}
      <div className="w-[100%]">
        <div className="flex justify-between">
          <div>
            <div className="flex-col">
              <div className="font-bold">
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: taskTitle,
                  }}
                ></div>
              </div>
              <div>date</div>
            </div>
          </div>
          <div className="flex gap-10">
            <button onClick={() => navigate("edit")}>Edit</button>
            <button onClick={DeleteTask}>delete</button>
          </div>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></div>
      </div>
    </div>
  );
}

export default Show;
