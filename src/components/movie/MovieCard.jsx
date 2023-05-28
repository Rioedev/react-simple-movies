const MovieCard = () => {
  return (
    <div className="p-3 text-white rounded-lg movie-card bg-slate-800">
      <img
        src="https://nld.mediacdn.vn/2019/4/25/3515432-endgamedek-15561710302491765206118.jpg"
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <h3 className="mb-3 text-xl font-bold text-white">
        Spiderman: Homecoming
      </h3>
      <div className="flex items-center justify-between mb-10 text-sm opacity-50">
        <span>2017</span>
        <span>7.4</span>
      </div>
      <button className="w-full px-6 py-3 text-xl capitalize rounded-lg bg-primary">
        Watch now
      </button>
    </div>
  );
};

export default MovieCard;
