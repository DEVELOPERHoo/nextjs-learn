import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

// interface IParams {
//   params: { id: string };
// }

interface IParams {
  params: Promise<{ id: string }>;
}

// export async function generateMetadata({ params: { id } }: IParams) {
//   const movie = await getMovie(id);
//   return {
//     title: movie.title,
//   };
// }

export async function generateMetadata({ params }: IParams) {
  const { id } = await params; // 비동기적으로 params를 기다림.
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}

// export default async function MovieDetailPage({ params: { id } }: IParams) {
//   return (
//     <div>
//       <Suspense fallback={<h1>Loading movie info</h1>}>
//         <MovieInfo id={id} />
//       </Suspense>
//       <Suspense fallback={<h1>Loading movie videos</h1>}>
//         <MovieVideos id={id} />
//       </Suspense>
//     </div>
//   );
// }

export default async function MovieDetailPage({ params }: IParams) {
  const { id } = await params; // 비동기적으로 params를 기다립니다

  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

export const runtime = "edge";
