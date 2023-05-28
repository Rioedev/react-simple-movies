const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path } = item;
  return (
    <div className="p-3 flex flex-col text-white rounded-lg movie-card bg-slate-800 h-full select-none">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
        <div className="flex items-center justify-between mb-7 text-sm opacity-50 ">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <button className="w-full px-6 py-3 text-xl capitalize rounded-lg bg-primary mt-auto">
          Watch now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
