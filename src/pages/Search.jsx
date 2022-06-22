import { Box, Skeleton, Spinner, Text } from "@chakra-ui/react";
import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import InfiniteScroll from "sodium-infinite-scroller";
import { EndContent } from "../components/EndContent";
import { Feed } from "../components/Feed";
import { Layout } from "../components/Layout";
import { SearchBox } from "../components/SearchBox";

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
  const { data, status, error } = useFetch(
    `https://api.unsplash.com/search/photos`,
    options
  );

  const navigate = useNavigate();

  console.log(ref.current.isNewQuery);

  if (Object.keys(data).length === 0 && status === "fetching") {
    return <Skeleton height="10rem" />;
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
            endContent={<EndContent />}
            threshold={0.2}
          >
            <Feed data={data?.results} />
          </InfiniteScroll>
        ) : (
          <>Nothing to show</>
        )}
      </Layout>
    </>
  );
}
