import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Videos from "./components/Videos";
import RootLayout from "./layouts/RootLayout";
import Home from "./components/Home";
import Video from "./components/Video";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="videos" element={<Videos />}></Route>
      <Route path="video/:id" element={<Video />}></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;

  // return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
