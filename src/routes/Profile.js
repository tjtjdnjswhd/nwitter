import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "firebaseInstance";

const Profile = ({ userObject, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObject.displayName);
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    }

    const getMyTweet = async () => {
        const tweets = await dbService.collection('tweet').where("creatorId", "==", userObject.uid).orderBy('createdAt').get();
        console.log(tweets.docs.map(doc => doc.data()));
    }

    useEffect(() => {
        getMyTweet();
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObject.displayName !== newDisplayName) {
            await userObject.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();
        }
    }

    const onChange = (event) => {
        setNewDisplayName(event.target.value);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
                <input type="submit" value="Update profile" />
            </form>
            <button onClick={onLogoutClick}>Log out</button>
        </>
    )
}

export default Profile;