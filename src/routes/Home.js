/* eslint-disable react/prop-types */
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory"
import { dbService } from "firebaseInstance";
import React, { useState, useEffect } from "react";

const Home = ({ userObject }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService.collection("tweet").onSnapshot(snapshot => {
      const tweetArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTweets(tweetArray);
    });
  }, []);

  return (
    <div>
      <TweetFactory userObject={userObject} />
      <div>
        {tweets.map((value) => (
          <Tweet key={value.id} tweetObject={value} isOwner={value.creatorId === userObject.uid} />
        ))}
      </div>
    </div>
  )
}

export default Home;