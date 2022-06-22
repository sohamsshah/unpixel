import axios from "axios";
import { useEffect, useRef, useReducer } from "react";
import { hashValues } from "../utils/hashValues";

/**
 * useFetch hook is perform fetch calls with ease, cache results and make the calls simple
 *
 * @param {function:function} url - A request url.
 * @param {object} options - options object that contains parameters etc. other fields to be used in the hook
 * @returns {data, status, error} - different states
 */
export const useFetch = (url, options) => {
  const cache = useRef({});
  const initialState = {
    status: "idle",
    error: null,
    data: {},
  };
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching", data: state.data ?? {} };
      case "FETCHED":
        if (options.params.isNewQuery) {
          return {
            status: "fetched",
            data: action.payload,
          };
        }
        return {
          ...initialState,
          status: "fetched",
          data: {
            ...state.data,
            // conditionally adding results property if it exists on the response
            ...(state.data.results
              ? {
                  results: [...state.data?.results, ...action.payload?.results],
                }
              : { ...action.payload }),
          },
        };
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url || !url.trim()) return;

    const fetchData = async () => {
      const hashValue = options.hashValue ?? hashValues(options.params);
      dispatch({ type: "FETCHING" });
      if (cache.current[hashValue]) {
        const data = cache.current[hashValue];
        dispatch({ type: "FETCHED", payload: data });
      } else {
        try {
          const response = await axios.get(url, {
            params: { ...options.params },
          });

          const data = await response.data;
          cache.current[hashValue] = data;
          if (cancelRequest) return;
          dispatch({ type: "FETCHED", payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };

    // refactor this hook as:
    // const useCustomHook = callback => {
    //     useEffect(() => { /* do something */ }, [callback])
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return state;
};
