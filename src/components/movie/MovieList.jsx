import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbApi } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

// https://api.themoviedb.org/3/movie/now-playing?api_key=dec64b88f14494e381f509f9f6660e07

const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(tmdbApi.getMovieList(type), fetcher);
  const movies = data?.results || [];
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
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
