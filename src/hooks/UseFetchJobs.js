import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};
// /https://jobs.github.com/positions.json?description=python&full_time=true&location=sf///https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json
const BASE_URL ="https://cors-anywhere.herokuapp.com/https://api.github.com/users/example";

function reducer(state, action) {
  switch (action.type) {
    case "MAKE_REQUEST":
      return { loading: false };
    case "GET_DATA":
      return { ...state, loading: false, jobs: action.payload.jobs };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    default:
      return state;
  }
}

export default function UseFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });

    return () => {
      cancelToken.cancel();
    };
  }, [params, page]);

  return state;
}
