import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailPage from "./pages/MovieDetailPage";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
import NotFoundPage from "./pages/NotFoundPage";

// dynamic import
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
