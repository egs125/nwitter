import React, { useEffect, useState } from "react";
import { dbService } from "fBase";
import Nweet from '../components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService.collection('nweets').onSnapshot(snapShot => {
        const nweetArray = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNweets(nweetArray);
    });
    
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });

    setNweet("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setNweet(value);
  };

  const onFileChange = e => {
    const { target: { files}} = e;
    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = finishedEvent => {
        const {
            currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
    }

    reader.readAsDataURL(theFile);
  };
  
  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
            <div>
                <img src={attachment} width="50px" height="50px" />
                <button onClick={onClearAttachment}>Clear</button>
            </div>
        )}
      </form>

      <div>
        {nweets.map(nweet => 
            <Nweet
                key={nweet.id}
                nweetObj={nweet} 
                isOwner={nweet.creatorId === userObj.uid} 
            />
        )}
      </div>
    </div>
  );
};

export default Home;
