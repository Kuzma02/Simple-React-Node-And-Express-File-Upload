import FormData from "form-data";
import axios from "axios";
import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);

  const upload = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("image", file);
    axios.post("http://localhost:4000", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  return (
    <>
      <div className="App">
        <input type="file" name="image" onChange={(e) => {setFile(e.target.files[0]);}} />
        <button onClick={(e) => upload(e)}>Submit</button>
      </div>
    </>
  )
}

export default App
