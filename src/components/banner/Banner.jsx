import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config";

const Banner = () => {
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=dec64b88f14494e381f509f9f6660e07`,
    fetcher
  );
  const movies = data?.results || [];
  console.log("Banner ~ movies:", movies);

  return (
    <section className="banner h-[500px] page-container mb-10">
      <div className="relative w-full h-full rounded-lg">
        <div className="absolute inset-0 rounded-lg overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]"></div>
        <img
          src="https://nld.mediacdn.vn/2019/4/25/3515432-endgamedek-15561710302491765206118.jpg"
          alt=""
          className="object-cover w-full h-full rounded-lg"
        />
        <div className="absolute w-full text-white bottom-5 left-5">
          <h2 className="mb-5 text-3xl font-bold">Avengers: Endgame</h2>
          <div className="flex items-center mb-8 gap-x-3">
            <span className="px-4 py-2 border border-white rounded-md">
              Action
            </span>
            <span className="px-4 py-2 border border-white rounded-md">
              Adventure
            </span>
            <span className="px-4 py-2 border border-white rounded-md">
              Drama
            </span>
          </div>
          <button className="px-6 py-3 font-medium text-white rounded-lg bg-primary">
            Watch Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
