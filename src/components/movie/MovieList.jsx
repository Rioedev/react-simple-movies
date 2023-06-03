import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbApi } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import { v4 } from "uuid";

// https://api.themoviedb.org/3/movie/now-playing?api_key=dec64b88f14494e381f509f9f6660e07

const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(tmdbApi.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  const movies = data?.results || [];
  return (
    <div className="movie-list">
      {isLoading && (
        <>
          <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            {new Array(5).fill(0).map(() => (
              <SwiperSlide key={v4()}>
                <MovieCardSkeleton></MovieCardSkeleton>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};

function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong this component
    </p>
  );
}

export default withErrorBoundary(MovieList, { FallbackComponent });
