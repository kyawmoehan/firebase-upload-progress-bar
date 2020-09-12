import React, { useState } from "react";
import { storageRef } from "./config/fbConfig";
import Progressbar from "./component/Progressbar";
import MediaPlayer from "./component/MediaPlayer";

function App() {
  let [imageAsFile, setImageAsFile] = useState("");
  let [imageAsUrl, setImageAsUrl] = useState("");
  let [startProgress, setStartProgress] = useState(false);
  let [totalSize, setTotalSize] = useState();
  let [progress, setProgress] = useState();

  let precentage = Math.floor((progress / totalSize) * 100);

  // get image file from input field
  const handleImageFile = (e) => {
    const image = e.target.files[0];
    getMediaDuration(image);
    setImageAsFile(image);
  };

  // upload file to firebase
  const fileUploadToFirebase = () => {
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
        getDownloadUrlFromFirebase();
      }
    );
  };

  // get download url form firebase
  const getDownloadUrlFromFirebase = () => {
    storageRef
      .child(`images/${imageAsFile.name}`)
      .getDownloadURL()
      .then((firebaseUrl) => {
        setImageAsUrl(firebaseUrl);
        setStartProgress(false);
      });
  };

  // handle when submit
  const handleFirebaseUpload = (e) => {
    e.preventDefault();
    console.log("start upload");
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    } else {
      fileUploadToFirebase();
    }
  };

  // get video duration
  const getMediaDuration = (image) => {
    let reader = new FileReader();
    reader.onload = function () {
      let media = new Audio(reader.result);
      media.onloadedmetadata = function () {
        let duration = Math.floor(media.duration);
        console.log(duration);
      };
    };
    reader.readAsDataURL(image);
  };

  // second to minute
  function secondsToTime(in_seconds) {
    var time = "";
    in_seconds = parseFloat(in_seconds.toFixed(2));

    var hours = Math.floor(in_seconds / 3600);
    var minutes = Math.floor((in_seconds - hours * 3600) / 60);
    var seconds = in_seconds - hours * 3600 - minutes * 60;
    //seconds = Math.floor( seconds );
    seconds = seconds.toFixed(0);

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    time = minutes + ":" + seconds;

    return time;
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <form onSubmit={handleFirebaseUpload}>
        <input type="file" id="image" onChange={handleImageFile} /> <br />
        <input type="submit" value="Submit" />
      </form>
      {startProgress ? <Progressbar completed={precentage} /> : ""}
      {imageAsUrl ? <MediaPlayer url={imageAsUrl} /> : ""}
    </div>
  );
}

export default App;
