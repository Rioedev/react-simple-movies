import useSWR from "swr";
import { fetcher, tmdbApi } from "../config";
import MovieCard, { MovieCardSkeleton } from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { v4 } from "uuid";
import Button from "components/button/Button";

// https://api.themoviedb.org/3/search/movie?

const itemsPerPage = 20;

const MoviePageV2 = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbApi.getMovieList("popular", nextPage));
  const filterDebounce = useDebounce(filter, 500);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];

  const loading = !data && !error;

  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.results.length - 1]?.length < itemsPerPage);

  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbApi.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbApi.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  return (
    <div className="py-5 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 text-white rounded-tl-lg rounded-bl-lg outline-none bg-slate-800"
            placeholder="Type here to search ..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 text-white rounded-tr-lg rounded-br-lg bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        <Button
          onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "bg-slate-400" : ""}`}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default MoviePageV2;
