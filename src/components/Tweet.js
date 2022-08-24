import React, { useState } from "react";
import { dbService, storageService } from "firebaseInstance";

const Tweet = ({ tweetObject, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setnewTweet] = useState(tweetObject.text);

  const onDeleteClick = async () => {
    const ok = confirm("삭제?");
    if (ok) {
      await dbService.doc(`tweet/${tweetObject.id}`).delete();
      await storageService.refFromURL(tweetObject.fileUrl).delete();
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`tweet/${tweetObject.id}`).update({
      text: newTweet
    });
    setEditing(false);
  }

  const onChange = (event) => {
    const { target: { value } } = event;
    setnewTweet(value);
  }

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <div>
      {
        editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input onChange={onChange} type="text" placeholder="edit" value={newTweet} required />
              <button type="submit">update</button>

            </form>
            <button onClick={toggleEditing}>cancel</button>
          </>
        ) : (
          <>
            <h4>{tweetObject.text}</h4>
            {tweetObject.fileUrl && <img src={tweetObject.fileUrl} width="50px" height="50px"/>}
            {isOwner &&
              <>
                <button onClick={onDeleteClick}>Delete Tweet</button>
                <button onClick={toggleEditing}>Edit Tweet</button>
              </>}
          </>
        )
      }
    </div>
  )
}

export default Tweet