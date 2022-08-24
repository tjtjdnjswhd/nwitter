import React, { useState } from "react";
import { storageService, dbService } from "firebaseInstance"
import { v4 as uuid } from "uuid"

const TweetFactory = ({ userObject }) => {
  const [tweet, setTweet] = useState("");
  const [fileString, setFileString] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = "";
    if (fileString) {
      const fileRef = storageService.ref().child(`${userObject.uid}/${uuid()}`);
      const response = await fileRef.putString(fileString, "data_url");
      fileUrl = await response.ref.getDownloadURL();
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObject.uid,
      fileUrl
    }

    await dbService.collection("tweet").add(tweetObj);
    setTweet("");
    setFileString(null);
  };

  const onChange = (event) => {
    const { target: { value } } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const { target: { files } } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setFileString(finishedEvent.currentTarget.result);
    }
    reader.readAsDataURL(file);
  }

  const onClearFileStringClick = () => setFileString(null);


  return (
    <form onSubmit={onSubmit}>
      <input type="text" onChange={onChange} value={tweet} placeholder="message" maxLength={120} />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Tweet" />
      {fileString && (
        <div>
          <img src={fileString} width="50px" height="50px" />
          <button onClick={onClearFileStringClick}>clear</button>
        </div>
      )}
    </form>
  )
}

export default TweetFactory;