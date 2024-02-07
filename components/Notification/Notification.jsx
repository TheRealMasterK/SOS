import React, { useEffect, useState } from 'react';
import db from '../../firebase';

function Notification() {
  const [posts, setPosts] = useState([])
  const initProfile = {
    bio: '',
    displayName: '',
    followers: [],
    following: [],
    id: '',
    location: '',
    photoURL: '',
    username: '',
    wallpaper: '',
    website: ''
  }
  const [profile, setProfile] = useState(initProfile)
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userString = localStorage.getItem('twittie_user');
    const user = JSON.parse(userString);
    // // console.log(user.id)
    // if(user){
    //   db.collection('posts')
    //     .where('senderId', '==', user.id)
    //     .orderBy('timestamp', 'desc')
    //     .onSnapshot(snapshot=> {
    //       setPosts(snapshot.docs.map(doc => ({id:doc.id, ...doc.data()})))
    //       console.log(snapshot.docs)
    //   })
    // }
    console.log(user.id)

    // if(user){
    //   db.collection('posts')
    //   .where('senderId', '==', user.id)
    //   .orderBy('timestamp', 'desc')
    //   .on('child_added')
    //   .onSnapshot(snapshot=> {
    //     // setPosts(snapshot.docs.map(doc => ({id:doc.id, ...doc.data()})))
    //     console.log(snapshot.docs)

    //     // setLoading(false)
    //   })
    // }

    db.collection("posts").where("senderId", "==", user.id)
    .onSnapshot((snapshot) => {
         console.log("Monitoring Likes")
         console.log(snapshot.docs)
        //  const oldNotifications = notifications
         const newNotifications = [];
        snapshot.docChanges().forEach((change) => {

            if (change.type === "added") {
              newNotifications.push({ id: change.doc.id, message: "New post added" }); // Customize your notification message here
                console.log("New city: ", change.doc.data());
            }
            if (change.type === "modified") {
              newNotifications.push({ id: change.doc.id, message: "Post Modified" }); // Customize your notification message here
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
              newNotifications.push({ id: change.doc.id, message: "Post removed" }); // Customize your notification message here
                console.log("Removed city: ", change.doc.data());
            }

            // setNotifications(newNotifications);
            // console.log(notifications)
            setNotifications((prevNotifications) => [...prevNotifications, ...newNotifications]);
        });

    });

    // db.collection(`posts/${user.id}/`).where("senderId", "==", user.id)
    // .onSnapshot((snapshot) => {
    //      console.log("Monitoring Comments")
    //      console.log(snapshot.docs)
    //     snapshot.docChanges().forEach((change) => {
    //         console.log(change)
    //         if (change.type === "added") {
    //             console.log("New city: ", change.doc.data());
    //         }
    //         if (change.type === "modified") {
    //             console.log("Modified city: ", change.doc.data());
    //         }
    //         if (change.type === "removed") {
    //             console.log("Removed city: ", change.doc.data());
    //         }
    //     });
    // });





  }, [])




  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div className="notification" key={index}>
          <div className="notification-content">{notification.message}</div>
        </div>
      ))}
      
    </div>
  )
}

export default Notification