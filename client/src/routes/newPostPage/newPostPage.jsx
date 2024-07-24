import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    const postData = {
      title: inputs.title || "",
      price: parseInt(inputs.price) || 0,
      desc: value || "",
      address: inputs.address || "",
      city: inputs.city || "",
      type: inputs.type || "",
      latitude: inputs.latitude || "",
      longitude: inputs.longitude || "",
      images: images,
    };

    const postDetail = {
      utilities: inputs.utilities || "",
      pet: inputs.pet || "",
      income: inputs.income || "",
      size: parseInt(inputs.size) || 0,
      school: parseInt(inputs.school) || 0,
      bus: parseInt(inputs.bus) || 0,
      restaurant: parseInt(inputs.restaurant) || 0,
    };

    try {
      const res = await apiRequest.post("/posts", {
        ...postData,
        postDetail,
      });
      navigate(`/${res.data.id}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <p className="text-4xl mb-8">Create a New Post</p>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
          <div className="item">
            <label htmlFor="title">Title</label>
            <input name="title" type="text" placeholder="Title" required />
          </div>
          <div className="item">
            <label htmlFor="price">Price</label>
            <input name="price" type="number" placeholder="Price" required />
          </div>
          <div className="item">
            <label htmlFor="address">Address</label>
            <input name="address" type="text" placeholder="Address" required />
          </div>
          <div className="item description">
            <label htmlFor="desc">Description</label>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </div>
          <div className="item">
            <label htmlFor="city">City</label>
            <input name="city" type="text" placeholder="City" required />
          </div>
          <div className="item">
            <label htmlFor="latitude">Latitude</label>
            <input name="latitude" type="text" placeholder="Latitude" required />
          </div>
          <div className="item">
            <label htmlFor="longitude">Longitude</label>
            <input name="longitude" type="text" placeholder="Longitude" required />
          </div>
          <div className="item">
            <label htmlFor="type">Type</label>
            <select name="type">
              <option value="dogwalking" defaultChecked>
                Dog Walking
              </option>
              <option value="petboarding">Pet Boarding</option>
              <option value="petsitting">Pet Sitting</option>
            </select>
          </div>
            {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
            {/* <input name="address" type="text" placeholder="Address" required /> */}
            {/* <input name="city" type="text" placeholder="City" required /> */}
            {/* <input name="type" type="text" placeholder="Type" required /> */}
            {/* <input name="latitude" type="text" placeholder="Latitude" required /> */}
            {/* <input name="longitude" type="text" placeholder="Longitude" required /> */}
            {/* <UploadWidget images={images} setImages={setImages} /> */}
            {/* <input name="utilities" type="text" placeholder="Utilities" /> */}
            {/* <input name="pet" type="text" placeholder="Pet" /> */}
            {/* <input name="income" type="text" placeholder="Income" /> */}
            {/* <input name="size" type="number" placeholder="Size" /> */}
            {/* <input name="school" type="number" placeholder="Distance to School" /> */}
            {/* <input name="bus" type="number" placeholder="Distance to Bus Stop" /> */}
            {/* <input name="restaurant" type="number" placeholder="Distance to Restaurant" /> */}

            <button type="submit" className="sendButton">Submit Post</button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default NewPostPage;