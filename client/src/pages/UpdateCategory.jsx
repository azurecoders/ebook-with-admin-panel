import React, { useState } from "react";
import { app } from "../firebase";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    imgUrls: [],
    title: "",
  });
  const [images, setImages] = useState();
  const [upload, setUploading] = useState(false);
  const [imgError, setImgError] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/category/fetch/${id}`);
      const data = await res.json();
      setFormData(data.message);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageUpload = () => {
    setUploading(true);
    setImgError(null);
    if (!images || formData.imgUrls.length == 1) {
      setUploading(false);
      setImgError(null);
      return;
    }

    const promises = [];
    promises.push(storeImage(images));

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
    const res = await fetch(`/api/category/update/${id}`, {
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

    navigate("/admin/category");
  };
  return (
    <>
      <h3 className="text-2xl font-semibold">Update Category</h3>
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
              placeholder="Upload Image..."
              className="border-b border-b-[#ccc] focus:border-b-black outline-none text-lg w-[100%]"
              onChange={(e) => setImages(e.target.files[0])}
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

        {error && <p className="text-sm text-center text-red-700">{error}</p>}
        <button
          disabled={
            upload || formData.imgUrls.length == 0 || formData.title == ""
          }
          className="border border-[#ccc] rounded-md cursor-pointer hover:border-black text-lg p-2 disabled:bg-[#ccc] disabled:border-[#ccc]"
        >
          Update Category
        </button>
      </form>
    </>
  );
};

export default UpdateCategory;
