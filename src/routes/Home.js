import React, { useEffect, useState } from "react";
import { dbService } from "fBase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection('nweets').get();
    const tempArray = [];
    
    dbNweets.forEach(document => {
        const nweetObj = {
            ...document.data(),
            id: document.id,
        };
        // setNweets(prev => [nweetObj, ...prev]);
        tempArray.push(nweetObj);
    });

    setNweets(tempArray);
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    await dbService.collection("nweets").add({
      nweet: nweet,
      createdAt: Date.now(),
    });

    setNweet("");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setNweet(value);
  };

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
        <input type="submit" value="Nweet" />
      </form>

      <div>
        {nweets.map(nweet => <div key={nweet.id}><h4>{nweet.nweet}</h4></div>)}
      </div>
    </div>
  );
};

export default Home;
