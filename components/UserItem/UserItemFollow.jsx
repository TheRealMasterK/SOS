import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";
import "./UserItemFollow.css";
import { follow, unfollow } from "../../server/serverActions";
import { useStateValue } from "../../contexts/StateContextProvider";

const UserItemFollow = ({ display }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [{ user }] = useStateValue();
  useEffect(() => {
    if (display) {
      setIsFollowing(display.followers.includes(user.id));
    }
  }, [display]);
  return (

    <div className="userItemFollow--user__item">
      <Link to={display ? `/profile/${display.username}` : `/notfound`} className="userItemFollow--link__contianer">
        <Avatar src={display && display.photoURL} />
        <div className="userItemFollow--user__details">
          <h2>{display ? display.displayName : "Empty Room"}</h2>
          <span>{display && `@${display.username}`}</span>
        </div>
      </Link>
      {isFollowing ? (
        <Button onClick={() => unfollow(user.id, display.id)} className="followingBtn">Following</Button>
      ) : (
        <Button onClick={() => follow(user.id, display.id)} className="followBtn">Follow</Button>
      )}
    </div>

  );
};

export default UserItemFollow;
