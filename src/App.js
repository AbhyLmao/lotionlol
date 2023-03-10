import { useEffect, useState } from "react";
import { BsJustify } from "react-icons/bs";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./Components/Edit";
import Show from "./Components/Show";

function App() {
  const [sidebar, isSidebar] = useState(false);
  const [notes, changeNotes] = useState([]);
  const [targetTitle, setTargetTitle] = useState("");
  const [targetDesc, setTargetDesc] = useState("");
  useEffect(() => {
    if (localStorage.getItem("test") != null) {
      console.log(
        JSON.parse(localStorage.getItem("test")),

        "WXYZ"
      );
      changeNotes(JSON.parse(localStorage.getItem("test")));
      console.log({ notes });
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App bg-[#eae0fa]">
        <div className="flex justify-center items-center text-[#2a0069] border-t-4 border-[#2a0069]">
          <div
            className="absolute top-0 left-0 mt-6 ml-4 cursor-pointer text-4xl"
            onClick={() => isSidebar(!sidebar)}
          >
            <BsJustify />
          </div>
          <div className="grid place-items-center ">
            <h1 className="text-4xl mt-5 font-bold">Lotion</h1>
            <p className="text-sm text-slate-400 ">this sucks</p>
          </div>
        </div>

        <div className="flex h-screen">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  {sidebar && (
                    <div>
                      <Sidebar
                        tasks={notes}
                        changeDesc={setTargetDesc}
                        changeTitle={setTargetTitle}
                        changeTask={changeNotes}
                      />
                    </div>
                  )}
                  <div className="grid fixed w-screen top-0 z-[-100] h-screen place-items-center text-4xl text-slate-900 font-bold">
                    Add a Task
                  </div>
                </div>
              }
            />
            <Route
              path={`/:id/edit`}
              element={
                <Edit
                  sidebar={sidebar}
                  isSidebar={isSidebar}
                  tasks={notes}
                  changeTitle={setTargetTitle}
                  changeTask={changeNotes}
                  changeDesc={setTargetDesc}
                />
              }
            ></Route>
            <Route
              path={`/:id`}
              element={
                <Show
                  sidebar={sidebar}
                  isSidebar={isSidebar}
                  tasks={notes}
                  targetTitle={targetTitle}
                  setTargetTitle={setTargetTitle}
                  setTargetDesc={setTargetDesc}
                  targetDesc={targetDesc}
                  changeTask={changeNotes}
                />
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
