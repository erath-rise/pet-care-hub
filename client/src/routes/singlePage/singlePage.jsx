import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import Chat from "../../components/chat/Chat";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showChat, setShowChat] = useState(false);
  const [chats, setChats] = useState([]);

  if (!post) {
    return <div>Loading... or Post not found</div>;
  }

  const handleSendMessage = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (!post.user || !post.user.id) {
      console.error('Invalid post user data:', post.user);
      alert("Cannot start chat: Invalid user data");
      return;
    }

    try {
      // 尝试创建新聊天或获取现有聊天
      const chatResponse = await apiRequest.post("/chats", { receiverId: post.user.id });
      console.log('Chat response:', chatResponse.data);

      // 获取所有聊天
      const allChatsResponse = await apiRequest.get("/chats");
      console.log('All chats response:', allChatsResponse.data);

      setChats(allChatsResponse.data);
      setShowChat(true);
    } catch (err) {
      console.error('Error in handleSendMessage:', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
        if (err.response.status === 401) {
          navigate("/login");
        } else if (err.response.status === 404) {
          alert("User not found. Please try again later.");
        } else {
          alert(err.response.data.message || "Failed to start a chat. Please try again later.");
        }
      } else {
        alert("Network error. Please check your connection and try again.");
      }
    }
  };

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }

    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            {/* <div className="bottom">
              <span>{post.desc}</span>
            </div> */}
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title mt-5">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleSendMessage}>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>

      {showChat && (
        <div className="chatPopup">
          <Chat chats={chats} />
        </div>
      )}
    </div>
  );
}

export default SinglePage;
