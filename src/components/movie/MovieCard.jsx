import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbApi } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <img
        src={tmdbApi.image500(poster_path)}
        alt=""
        className="w-full h-[350px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-7 ">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};

function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong this component
    </p>
  );
}

export default withErrorBoundary(MovieCard, { FallbackComponent });
