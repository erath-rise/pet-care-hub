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

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    // 检查并处理 undefined 值
    const postData = {
      title: inputs.title || "",
      price: parseInt(inputs.price) || 0,
      desc: value || "",
      address: inputs.address || "",
      city: inputs.city || "",
      type: inputs.type || "",
      latitude: inputs.latitude || "",
      longitude: inputs.longitude || "",
      images: images.length > 0 ? images : [],
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
        postData,
        postDetail,
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err.response.data);
      setError(err.message);
    }
  };

  // try {
  //   const res = await apiRequest.post("/posts", {
  //     postData: {
  //       title: inputs.title,
  //       price: parseInt(inputs.price),
  //       address: inputs.address,
  //       city: inputs.city,
  //       type: inputs.type,
  //       latitude: inputs.latitude,
  //       longitude: inputs.longitude,
  //       images: images,
  //     },
  //     postDetail: {
  //       desc: inputs.desc,
  //       utilities: inputs.utilities,
  //       pet: inputs.pet,
  //       income: inputs.income,
  //       size: parseInt(inputs.size),
  //       school: parseInt(inputs.school),
  //       bus: parseInt(inputs.bus),
  //       restaurant: parseInt(inputs.restaurant),
  //     },
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'POST'
  //   });
  //   navigate("/" + res.data.id)
  // } catch (err) {
  //   console.log(err.response.data);
  //   // res.status(500).json({ message: "Failed to create post" });
  //   setError(error);
  // }

return (
  <div className="newPostPage">
    <div className="formContainer">
      <h1>Add New Post</h1>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" />
          </div>
          <div className="item">
            <label htmlFor="price">Price</label>
            <input id="price" name="price" type="number" />
          </div>
          <div className="item">
            <label htmlFor="address">Address</label>
            <input id="address" name="address" type="text" />
          </div>
          <div className="item description">
            <label htmlFor="desc">Description</label>
            <ReactQuill theme="snow" onChange={setValue} value={value} />
          </div>
          <div className="item">
            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text" />
          </div>
          {/* <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div> */}
          {/* <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div> */}
          <div className="item">
            <label htmlFor="latitude">Latitude</label>
            <input id="latitude" name="latitude" type="text" />
          </div>
          <div className="item">
            <label htmlFor="longitude">Longitude</label>
            <input id="longitude" name="longitude" type="text" />
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
          {/* <div className="item">
              <label htmlFor="healthCondition">HealthCondition</label>
              <select name="healthCondition">
                <option value="vaccinated" defaultChecked>Vaccinated</option>
                <option value="notvaccinated">NotVaccinated</option>
              </select>
            </div> */}
          {/* <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div> */}

          {/* <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div> */}
          {/* <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div> */}
          {/* <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div> */}
          <div className="item">
            <label htmlFor="size">Total Size (sqft)</label>
            <input min={0} id="size" name="size" type="number" />
          </div>
          <div className="item">
            <label htmlFor="school">School</label>
            <input min={0} id="school" name="school" type="number" />
          </div>
          <div className="item">
            <label htmlFor="bus">bus</label>
            <input min={0} id="bus" name="bus" type="number" />
          </div>
          <div className="item">
            <label htmlFor="restaurant">Restaurant</label>
            <input min={0} id="restaurant" name="restaurant" type="number" />
          </div>
          <button className="sendButton">Add</button>
          {error && <span>error</span>}
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
  </div>
);
}

export default NewPostPage;
