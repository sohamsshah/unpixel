import InfiniteScroll from "sodium-infinite-scroller";
import { Box, Spinner } from "@chakra-ui/react";
import { Feed } from "../components/Feed";
import { useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Layout } from "../components/Layout";
export function Home() {
  const [page, setPage] = useState(1);
  console.log(process.env);
  function createOptions() {
    return {
      params: {
        page,
        per_page: 10,
        query: "code",
        client_id: process.env.REACT_APP_ACCESS_KEY,
      },
    };
  }
  const options = useMemo(createOptions, [page]);
  const { data, status, error } = useFetch(
    `https://api.unsplash.com/search/photos`,
    options
  );

  return (
    <>
      {data.total_pages && (
        <Layout>
          {console.log(data.total_pages > page, data.total_pages, page)}
          <InfiniteScroll
            hasMore={data.total_pages > page}
            loadMore={() => setPage((prev) => prev + 1)}
            loader={<Spinner />}
            threshold={0.2}
          >
            <Feed data={data?.results} />
          </InfiniteScroll>
        </Layout>
      )}
    </>
  );
}
