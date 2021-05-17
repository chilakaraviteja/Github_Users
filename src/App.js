import React from "react";
// import { Container } from "react-bootstrap";
import "./App.css";
// import UseFetchJobs from "./hooks/UseFetchJobs";
// import Jobs from "./components/Jobs";
import GithubUsers from "./components/GithubUsers";

function App() {
  // const [params, setParams] = useState({});
  // const [page, setPage] = useState(1);
  // const { jobs, loading, error } = UseFetchJobs(params, page);

  // <div>
  // { loading && <h1>Loading...</h1> }
  // { error && <h1>Error occured...</h1> }
  //   {jobs.map(job => {
  //    return <Jobs key = {job.id} job= {job} />
  //  })}
  // </div>

  return (
    <div>
      <GithubUsers />
    </div>
  );
}

export default App;
