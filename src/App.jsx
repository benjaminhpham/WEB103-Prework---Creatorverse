import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, useRoutes } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators/ShowCreators";
import AddCreator from "./pages/AddCreator/AddCreator";
import ViewCreator from "./pages/ViewCreators/ViewCreator";
import EditCreator from "./pages/EditCreator/EditCreator";
import { useState } from "react";
import { supabase } from "./client";

const Routes = ({ creators, setCreators, setRefetch }) => {
  return useRoutes([
    {
      path: "/",
      element: <ShowCreators creators={creators} />,
    },
    {
      path: "/:id",
      element: <ViewCreator setCreators={setCreators} />,
    },
    {
      path: "/add",
      element: <AddCreator setCreators={setCreators} />,
    },
    {
      path: "/edit/:id",
      element: (
        <EditCreator setRefetch={setRefetch} setCreators={setCreators} />
      ),
    },
  ]);
};

function App() {
  const [creators, setCreators] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from("creators").select();

        if (error) {
          throw new Error(
            `An error occured while fetching all creator data: ${error.message}`
          );
        }

        setCreators(data);
      } catch (err) {
        console.error(`Fetching data error: ${err.message}`);
      }
    };

    fetchCreators();
  }, [creators.length, refetch]);

  return (
    <div className="app">
      <Router>
        <header className="header">
          <h1 className="header__title">Creatorverse</h1>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link to="/">View All Creators</Link>
              </li>
              <li className="header__nav-item">
                <Link to="/add">Add A Creator</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="main">
          <Routes
            creators={creators}
            setCreators={setCreators}
            setRefetch={setRefetch}
          />
        </main>
      </Router>
    </div>
  );
}

export default App;
