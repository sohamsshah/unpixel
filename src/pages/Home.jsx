import InfiniteScroll from "sodium-infinite-scroller";
import { Spinner, Skeleton } from "@chakra-ui/react";
import { Feed } from "../components";
import { useMemo, useState } from "react";
import { useFetch } from "../hooks";
import { Layout } from "../components";
import { EmptyState } from "../components";
import { Error } from "../components";
import { DEFAULT_QUERY, DEFAULT_PER_PAGE } from "../static/constants";
export function Home() {
  const [page, setPage] = useState(1);

  function createOptions() {
    return {
      params: {
        page,
        per_page: DEFAULT_PER_PAGE,
        query: DEFAULT_QUERY,
        client_id: process.env.REACT_APP_ACCESS_KEY,
      },
    };
  }
  const options = useMemo(createOptions, [page]);
  const { data, status, error } = useFetch(
    `https://api.unsplash.com/search/photos`,
    options
  );

  if (status === "error") {
    return <Error message={error} />;
  }

  if (Object.keys(data).length === 0 && status === "fetching") {
    return <Skeleton m="4" height="20rem" />;
  }

  return (
    <>
      <Layout>
        {data?.total_pages !== 0 ? (
          <InfiniteScroll
            hasMore={data.total_pages > page}
            loadMore={() => setPage((prev) => prev + 1)}
            loader={<Spinner />}
            threshold={0.2}
            endContent={
              <EmptyState text="Congratulations! You have reached the end" />
            }
          >
            <Feed data={data?.results} />
          </InfiniteScroll>
        ) : (
          <EmptyState text="Nothing to show" />
        )}
      </Layout>
    </>
  );
}
