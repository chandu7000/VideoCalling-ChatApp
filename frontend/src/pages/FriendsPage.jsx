import FriendCard from "../components/FriendCard";
import { useEffect, useState } from "react";
import axios from "axios";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get("/api/friends");

        // Adjust this line based on the API structure
        // If response.data is the array, use it directly
        // If response.data.friends is the array, update accordingly
        console.log("🔥 API Response:", response.data);

        // Try both options below — uncomment the one that matches your API
        setFriends(response.data); // if response is just the array
        // setFriends(response.data.friends); // if response is { friends: [...] }

      } catch (error) {
        console.error("❌ Failed to fetch friends:", error);
        setFriends([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading friends...</div>;
  }

  return (
    <div className="p-4">
      {Array.isArray(friends) && friends.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No friends found.</p>
      )}
    </div>
  );
};

export default FriendsPage;
