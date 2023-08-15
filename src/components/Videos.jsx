import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Videos = () => {
  const [data, setData] = useState([]);
  const fetchDataVideos = async () => {
    const response = await fetch("http://localhost:3080/api/videos");
    const res = await response.json();
    setData(res);
    // console.log(res);
  };

  useEffect(() => {
    fetchDataVideos();
  }, []);
  const navigate = useNavigate();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Tokopedia Play
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            minima, dignissimos aliquam assumenda beatae tempore. Repellat iusto
            dolores autem beatae?
          </p>
        </div>

        <p className="p-4 text-xl font-semibold">Video List</p>
        <input />
        <div className="space-y-8  lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-3 lg:space-y-0 ">
          {/*  Card */}
          {data?.map((video) => (
            <div
              key={video._id}
              className=" h-[300px] w-96 flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white cursor-pointer "
              onClick={() => {
                navigate(`/video/${video._id}`);
              }}
              style={{
                backgroundImage: `url(${video.img})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div className="flex flex-col items-start h-screen justify-between ">
                <div className="flex bg-gray-300 gap-3 rounded-lg">
                  <h3 className="text-gray-700 ">Views</h3>
                  <h3 className="text-gray-600 rounded-lg px-1 w-16 bg-gray-400 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                    <p className="text-white"> {video.count}</p>
                  </h3>
                </div>
                <div className="flex flex-col ml-[-18px] flex-start items-start">
                  <h2 className="text-white font-semibold text-xl">
                    {video.thumbnail}
                  </h2>
                  <h3 className="text-white text-sm ">{video.tokoName}</h3>
                </div>
              </div>
              <></>
              {/* <h3 className=" text-white mb-4 text-2xl font-semibold">Live</h3>
            <p className="font-light text-white sm:text-lg dark:text-gray-400">
              Best option for personal use &amp; for your next project.
            </p> */}

              {/* <button class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Green
            </button> */}
            </div>
          ))}

          {/* Pricing Card */}
        </div>
      </div>
    </section>
  );
};

export default Videos;
