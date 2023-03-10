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
  const [date, setDate] = useState("");
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
      setDate(target.createdat);
      setLoading(false);
    }
  }, [taskTitle, desc, date,loading, props.tasks, id]);
  function DeleteTask() {
    props.changeTask(props.tasks.filter((task) => task.id != id));
    localStorage.setItem(
      "test",
      JSON.stringify(props.tasks.filter((task) => task.id != id))
    );
    navigate("/");
  }

  return (
    <div className="flex w-[100%]">
      {props.sidebar && (
        <Sidebar
          tasks={props.tasks}
          changeTitle={props.changeTitle}
          changeDesc={props.targetDesc}
          changeTask={props.changeTask}
        />
      )}
      <div className="w-[100%]">
        <div className="flex justify-between p-5 border-b-4 border-[#2a0069]">
          <div>
            <div className="flex-col">
              <div className="font-bold text-[#2a0069] text-4xl">
                <div
                  className="content" 
                  dangerouslySetInnerHTML={{
                    __html: taskTitle,
                  }}
                ></div>
              </div>
              <div className="text-[#2a0069] text-2xl" SetInnerHTML={{
                    __html: date,
                  }}>yyyy-mm-d</div>
            </div>
          </div>
          <div className="flex gap-5">
            <button className= "text-2xl font-bold rounded-full bg-[#8d73b3] pl-7 pr-7" onClick={() => navigate("edit")}>Edit</button>
            <button className= "text-2xl font-bold rounded-full bg-[#8d73b3] pl-7 pr-7" onClick={DeleteTask}>Delete</button>
          </div>
        </div>
        <div
          class="content"
          className=" p-10 text-[23px] break-all
          "
          dangerouslySetInnerHTML={{ __html: desc }}
        ></div>
      </div>
    </div>
  );
}

export default Show;
