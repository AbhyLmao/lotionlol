import React, { useEffect, useRef } from "react";
import { BsPlusLg } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

function Sidebar(props) {
  const {id} = useParams();
  const sidebarTab = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Sidebar has re-rendered!", { props });
  }, [props]);
  //console.log(tasks)
  function addAndNavigateToTask() {
    let id = uuidv4();
    //
    props.changeTask([
      ...props.tasks,
      { title: "Untitled", description: "", id: id, createdAt: Date.now() },
    ]);

    localStorage.setItem(
      "test",
      JSON.stringify([
        ...props.tasks,
        { title: "Untitled", description: "", id: id, createdAt: Date.now() },
      ])
    );

    navigate(`/${id}/edit`);
  }
  return (
    <div className="h-screen overflow-scroll w-[450px] bg-slate-300 flex flex-col">
      <div className="flex justify-between border-2 p-4">
        <h1 className="text-4xl font-slate-900 font-bold">Note</h1>
        <button className="font-bold text-4xl" onClick={addAndNavigateToTask}>
          <BsPlusLg />
        </button>
      </div>
      {props.tasks.length > 0 ? (
        <div>
          {props.tasks.map((element) => {
            return (
              <div
                ref={sidebarTab}
                onClick={() => {
                  navigate(`/${element.id}`);
                }}
                className={`h-20 ${element.id == id?("bg-slate-900 text-slate-300 border-2"):("bg-slate-300 text-slate-900")} cursor-pointer font-bold p-4 flex flex-col `}
                key={element.id}
              >
                <div>{element.title}</div>

                <div className="font-semi w-full overflow-hidden cursor-pointer text-slate-300">
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: element.description }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Add Tasks</div>
      )}
    </div>
  );
}

export default Sidebar;
