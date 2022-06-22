import { Box, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { useState, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import InfiniteScroll from "sodium-infinite-scroller";

import { Feed } from "../components/Feed";
import { Layout } from "../components/Layout";
import { SearchBox } from "../components/SearchBox";
import { EmptyState } from "../components/EmptyState";

export function Search() {
  const { query } = useParams();
  const ref = useRef({
    isNewQuery: false,
    query,
  });
  if (ref.current.query === query) {
    ref.current.isNewQuery = false;
  } else {
    ref.current.isNewQuery = true;
    ref.current.query = query;
  }
  const [page, setPage] = useState(1);

  function handleSearch(query) {
    navigate(`/search/${query}`);
  }

  function createOptions() {
    return {
      params: {
        page,
        per_page: 10,
        query,
        isNewQuery: ref.current.isNewQuery,
        client_id: process.env.REACT_APP_ACCESS_KEY,
      },
    };
  }
  const options = useMemo(createOptions, [page, query]);
  const { data, status } = useFetch(
    `https://api.unsplash.com/search/photos`,
    options
  );

  const navigate = useNavigate();

  if (Object.keys(data).length === 0 && status === "fetching") {
    return <Skeleton m="4" height="20rem" />;
  }
  if (status === "error") {
    return <>Something went wrong...</>;
  }
  return (
    <>
      <Layout hasSearchBox={false}>
        <Box px={16}>
          <Text fontSize={"4xl"}>
            Search Results for:{" "}
            <Text fontWeight="bold" display="inline-block">{`${query}`}</Text>
          </Text>
          <SearchBox mt="4" handleSearch={handleSearch} />
        </Box>
        {data.total_pages !== 0 ? (
          <InfiniteScroll
            hasMore={data.total_pages > page}
            loadMore={() => setPage((prev) => prev + 1)}
            loader={<Spinner />}
            endContent={
              <EmptyState text="Congratulations! You have reached the end" />
            }
            threshold={0.2}
          >
            <Feed data={data?.results} />
          </InfiniteScroll>
        ) : (
          <EmptyState text="Nothing to show for this query" />
        )}
      </Layout>
    </>
  );
}
