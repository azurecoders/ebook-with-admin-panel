import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";

const CreateBook = () => {
  const navigate = useNavigate();
  const [val, setVal] = useState();
  const [formData, setFormData] = useState({
    imgUrls: [],
    title: "",
    description: "",
    category: "",
    type: "simple",
    realPrice: 0,
    discountPrice: 0,
    author: "",
    price: 0,
  });
  useEffect(() => {
    const fetchCat = async () => {
      const res = await fetch("/api/category/get");
      const data = await res.json();
      setVal(data.message);
    };
    fetchCat();
  }, []);
  const [images, setImages] = useState();
  const [upload, setUploading] = useState(false);
  const [imgError, setImgError] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.id]: e.target.name });
    }
    if (e.target.type !== "checkbox") {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleImageUpload = () => {
    setUploading(true);
    setImgError(null);
    if (images.length > 0) {
      if (images.length + formData.imgUrls.length < 4) {
        const promises = [];

        for (let i = 0; i < images.length; i++) {
          promises.push(storeImage(images[i]));
        }

        Promise.all(promises)
          .then((url) => {
            setFormData({ ...formData, imgUrls: formData.imgUrls.concat(url) });
            setUploading(false);
            setImgError(null);
          })
          .catch(() => {
            setUploading(false);
            setImgError("Image must be less than 2MB");
          });
      } else {
        setUploading(false);
        setImgError("You could only upload upto 3 images");
      }
    } else {
      setUploading(false);
      setImgError("You Must Upload At Least One Image");
    }
  };

  const storeImage = (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const imageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        }
      );
    });
  };

  const handleImageDelete = (index) => {
    setFormData({
      ...formData,
      imgUrls: formData.imgUrls.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.type == "simple") {
      setFormData({ ...formData, realPrice: 0, discountPrice: 0 });
    } else if (formData.type == "offer") {
      setFormData({ ...formData, price: 0 });
    }
    const res = await fetch("/api/book/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success == false) {
      setError(data.message);
      return;
    }

    navigate("/admin/books");
  };
  return (
    <>
      <h3 className="text-2xl font-semibold">Create Book</h3>
      <form
        onSubmit={handleSubmit}
        className="m-2 md:m-5 flex flex-col gap-1 px-0 md:px-5"
      >
        <div className="flex flex-col gap-3 py-5">
          <label htmlFor="upload" className="text-lg font-medium">
            Upload Image
          </label>
          <div className="flex gap-3">
            <input
              type="file"
              name="upload"
              id="upload"
              accept="image/*"
              multiple
              placeholder="Upload Image..."
              className="border-b border-b-[#ccc] focus:border-b-black outline-none text-lg w-[100%]"
              onChange={(e) => setImages(e.target.files)}
            />
            <button
              type="button"
              disabled={upload}
              onClick={handleImageUpload}
              className="h-[100%] py-2 px-4 transition-all border border-green-700 text-green-700 rounded-md hover:bg-green-700 disabled:bg-green-700 disabled:text-white disabled:opacity-75 hover:text-white text-lg"
            >
              {upload ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
        {imgError && (
          <p className="text-sm text-center text-red-700">{imgError}</p>
        )}
        <div className="flex flex-col gap-3 min-h-[150px] max-h-[150px] bg-white overflow-hidden overflow-y-scroll p-5">
          {formData && formData.imgUrls.length == 0 && (
            <h3 className="text-2xl font-medium text-center mt-5">
              Images will be shown here
            </h3>
          )}
          {formData &&
            formData.imgUrls &&
            formData.imgUrls.map((img, index) => (
              <div key={img} className="flex justify-between items-center">
                <div className="w-[200px] h-[100%] rounded-lg overflow-hidden">
                  <img
                    src={img}
                    height="100"
                    width="200"
                    alt=""
                    className="hover:opacity-90 cursor-pointer"
                  />
                </div>
                <span
                  onClick={() => handleImageDelete(index)}
                  className="text-red-700 hover:opacity-90 cursor-pointer"
                >
                  Delete
                </span>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-3 py-5">
          <label htmlFor="title" className="text-lg font-medium">
            Title
          </label>
          <input
            disabled={upload}
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            required
            value={formData.title}
            onChange={handleChange}
            className="border-b border-b-[#ccc] focus:border-b-black outline-none text-lg"
          />
        </div>
        <div className="flex flex-col gap-3 py-5">
          <label htmlFor="description" className="text-lg font-medium">
            Description
          </label>
          <textarea
            disabled={upload}
            type="text"
            name="description"
            id="description"
            placeholder="Description..."
            required
            value={formData.description}
            onChange={handleChange}
            className="border-b border-b-[#ccc] focus:border-b-black outline-none text-lg min-h-[70px] max-h-[120px]"
          />
        </div>
        <div className="flex flex-col gap-3 py-5">
          <div className="flex justify-between">
            <label htmlFor="category" className="text-lg font-medium">
              Category
            </label>
            <Link
              to="/admin/category/create"
              className="border border-[#ccc] hover:border-black rounded-md py-2 px-4"
            >
              Create
            </Link>
          </div>
          <select
            name="category"
            onChange={handleChange}
            className="outline-none border border-[#ccc] rounded-md p-3 cursor-pointer"
            id="category"
          >
            <option selected disabled>
              Choose any one
            </option>
            {val &&
              val.map((cat) => (
                <option
                  selected={formData.category === cat.title}
                  key={cat._id}
                  value={cat.title}
                >
                  {cat.title}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-3 py-5">
          <label htmlFor="type" className="text-lg font-medium">
            Type
          </label>
          <div className="flex gap-10">
            <div className="flex items-center gap-3">
              <label htmlFor="offer" className="text-xl font-medium">
                Offer
              </label>
              <input
                type="checkbox"
                name="offer"
                className="scale-150 cursor-pointer"
                id="type"
                onChange={handleChange}
                checked={formData.type === "offer"}
              />
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="simple" className="text-xl font-medium">
                Simple
              </label>
              <input
                type="checkbox"
                name="simple"
                className="scale-150 cursor-pointer"
                id="type"
                onChange={handleChange}
                checked={formData.type === "simple"}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 py-5">
          <label htmlFor="author" className="text-lg font-medium">
            Author
          </label>
          <input
            type="text"
            disabled={upload}
            name="author"
            id="author"
            placeholder="Author..."
            required
            value={formData.author}
            onChange={handleChange}
            className="border-b border-b-[#ccc] focus:border-b-black outline-none text-lg"
          />
        </div>
        {formData.type == "simple" && (
          <div className="flex flex-col gap-3 py-5">
            <label htmlFor="price" className="text-lg font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              min="100"
              name="price"
              disabled={upload}
              placeholder="Price..."
              required
              value={formData.price}
              onChange={handleChange}
              className="border-b border-b-[#ccc] focus:border-b-black outline-none text-lg"
            />
            <p
              className={`text-sm ${
                formData.price < 100 ? "text-red-700" : "text-gray-500"
              }`}
            >
              The minimum price is 100 Rs.
            </p>
          </div>
        )}
        {formData.type == "offer" && (
          <>
            <div className="flex flex-col gap-3 py-5">
              <label htmlFor="realPrice" className="text-lg font-medium">
                Real Price
              </label>
              <input
                type="number"
                min="100"
                max="20000"
                id="realPrice"
                name="realPrice"
                disabled={upload}
                placeholder="Price..."
                required
                value={formData.realPrice}
                onChange={handleChange}
                className="border-b border-b-[#ccc] focus:border-b-black outline-none text-lg"
              />
              <p
                className={`text-sm ${
                  formData.realPrice < 100 ? "text-red-700" : "text-gray-500"
                }`}
              >
                The minimum price is 100 Rs.
              </p>
            </div>
            <div className="flex flex-col gap-3 py-5">
              <label htmlFor="discountPrice" className="text-lg font-medium">
                Discount Price
              </label>
              <input
                type="number"
                min="50"
                max="1000"
                id="discountPrice"
                name="discountPrice"
                disabled={upload}
                placeholder="Price..."
                required
                value={formData.discountPrice}
                onChange={handleChange}
                className="border-b border-b-[#ccc] focus:border-b-black outline-none text-lg"
              />
            </div>
            <p
              className={`text-sm ${
                formData.discountPrice < 100 ? "text-red-700" : "text-gray-500"
              }`}
            >
              The minimum discount is 100 Rs.
            </p>
          </>
        )}
        {error && <p className="text-sm text-center text-red-700">{error}</p>}
        <button
          disabled={
            upload ||
            formData.imgUrls.length == 0 ||
            formData.title == "" ||
            formData.description == "" ||
            formData.author == "" ||
            formData.category == "" ||
            formData.type == "" ||
            (formData.type == "offer" &&
              formData.realPrice < formData.discountPrice) ||
            (formData.type == "simple" && formData.price < 100) ||
            (formData.type == "offer" && formData.realPrice < 100) ||
            (formData.type == "offer" && formData.discountPrice < 50)
          }
          className="border border-[#ccc] rounded-md cursor-pointer hover:border-black text-lg p-2 disabled:bg-[#ccc] disabled:border-[#ccc]"
        >
          Create Book
        </button>
      </form>
    </>
  );
};

export default CreateBook;
