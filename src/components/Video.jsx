import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useFetchData(url, id) {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${url}/${id}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [url, id]);

  return { data };
}

const Video = () => {
  let { id } = useParams();

  const [formData, setFormData] = useState({ username: "", comment: "" });
  const { data: video } = useFetchData(`http://localhost:3080/api/videos`, id);
  const { data: products } = useFetchData(
    `http://localhost:3080/api/products`,
    id
  );
  const { data: comments } = useFetchData(
    `http://localhost:3080/api/comments`,
    id
  );
  // console.log(video, "videos");
  // console.log(products, "product");
  // console.log(comments, "comments");

  const handleInput = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3080/api/comments/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json)
      .then((data) => {
        console.log("form success", data);
        setFormData({ username: "", comment: "" });
      })
      .catch((error) => console.error("Error submitting form:", error));
  };

  return (
    <div>
      {/* Konten utama */}

      <div className="grid grid-cols-5  gap-4 mb-8 ">
        {/* KONTEN PRODUCTS */}
        <div className="col-span-1 flex flex-col gap-3  bg-white overflow-auto max-h-[680px] rounded-lg ">
          {products?.map((product) => (
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img class="rounded-t-lg" src={product.img} alt="test" />

              <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.namaProduct}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Price Rp <span>{product.price}</span>
                </p>
                <button
                  onClick={() => {
                    window.location.href = product.storeLink;
                  }}
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 cursor-pointer "
                >
                  Buy Now
                  <svg
                    class="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* END OF KONTEN PRODUCTS */}
        {/* INI KONTEN VIDEO */}
        <div className="col-span-4 overflow-auto gap-5 bg-gray-200   rounded-lg">
          <div className="flex justify-between items-center mx-auto py-6 px-4 bg-gray-200">
            <p className="font-bold text-2xl">{video?.thumbnail}</p>
            <p className="font-semibold text-xl">{video?.tokoName}</p>
          </div>
          {/*  */}
          <div className="flex items-center justify-center max-h-[680px]">
            <div className="relative w-full overflow-hidden pt-[56.25%]">
              <iframe
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full border-none rounded-lg aspect-video"
                src={`https://www.youtube.com/embed/${video.linkYt}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        {/* END OF KONTEN VIDEO */}
      </div>
      {/* comment card component */}
      <div className=" bg-gray-100  rounded-lg ">
        {/* Header */}
        <header className="px-6 py-8 text-lg font-bold">Comments</header>
        {/* Content  Comment*/}

        {comments?.map((comment) => (
          <div key={comment._id} className="flex gap-5 p-4  border-t-2   ">
            <img
              class="rounded-full w-9 h-9 mt-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
              alt="profile_picture"
            />
            <div>
              <div className="flex gap-6">
                <h1 className="font-semibold text-lg">{comment.username}</h1>
              </div>
              <p
                className="text-sm
            "
              >
                {comment.comment}
              </p>
            </div>
          </div>
        ))}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 ">
            <div class="px-4 py-2 bg-gray-100 rounded-t-lg dark:bg-gray-800">
              <label htmlFor="username" className="text-xl font-bold">
                Username
              </label>
              <textarea
                name="username"
                id="username"
                rows="4"
                class="w-full px-4 text-sm text-gray-900 bg-white border-0 order-0 outline-none resize-none rounded-lg mt-4 "
                placeholder="Write a username..."
                required
                value={formData.username}
                onChange={handleInput}
              ></textarea>
              <div className="mt-8">
                <label htmlFor="comment" className="text-xl font-bold">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="4"
                  class="w-full  text-sm text-gray-900 bg-white border-0 order-0 outline-none resize-none px-4 mt-4 "
                  placeholder="Write a comment..."
                  required
                  value={formData.comment}
                  onChange={handleInput}
                ></textarea>
              </div>
            </div>
            <div class="flex items-center justify-center px-3 py-2 border-t dark:border-gray-600">
              <button class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Post comment
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* end of commend card component */}
    </div>
  );
};

// export const fetchCareerDetail = async ({ params }) => {
//   return id;
// };
export default Video;
