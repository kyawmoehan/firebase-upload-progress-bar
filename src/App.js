import React, { useState } from "react";
import { storageRef } from "./config/fbConfig";
import Progressbar from "./component/Progressbar";

function App() {
  let [imageAsFile, setImageAsFile] = useState("");
  let [imageAsUrl, setImageAsUrl] = useState("");
  let [startProgress, setStartProgress] = useState(false);
  let [totalSize, setTotalSize] = useState();
  let [progress, setProgress] = useState();

  let precentage = Math.floor((progress / totalSize) * 100);

  const handleImageFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const handleFirebaseUpload = (e) => {
    e.preventDefault();
    console.log("start upload");
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    } else {
      const iamgeRef = storageRef.child(`images/${imageAsFile.name}`);
      const uploadTask = iamgeRef.put(imageAsFile);
      uploadTask.on(
        "state_changed",
        function progress(snapshot) {
          setStartProgress(true);
          setTotalSize(snapshot.totalBytes);
          setProgress(snapshot.bytesTransferred);
          console.log(
            `Total: ${snapshot.totalBytes}: Transfer: ${snapshot.bytesTransferred}`
          ); // progress of upload
        },
        (err) => {
          console.log(err);
        },
        () => {
          storageRef
            .child(`images/${imageAsFile.name}`)
            .getDownloadURL()
            .then((firebaseUrl) => {
              setImageAsUrl(firebaseUrl);
              setStartProgress(false);
            });
        }
      );
    }
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      <form onSubmit={handleFirebaseUpload}>
        <input type="file" id="image" onChange={handleImageFile} /> <br />
        <input type="submit" value="Submit" />
      </form>
      {imageAsUrl ? <img src={imageAsUrl} alt="hello" /> : ""}
      {startProgress ? <Progressbar completed={precentage} /> : ""}
    </div>
  );
}

export default App;
