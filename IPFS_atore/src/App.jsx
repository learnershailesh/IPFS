import { useState } from 'react'
import './App.css'
import axios from 'axios';


function App() {
  const [count, setCount] = useState(0);
  const [ file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileData = new FormData();
      fileData.append("file", file);

      const responseData = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY ,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY,
          "Content-Type": "multipart/form-data",
        }
      });

      const fileUrl = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
      setFileUrl(fileUrl);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div className='innerbody'>
      <h1>
        IPFS Upload files</h1>
        <form>
          <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
          <button type='submit' onClick={handleSubmit}> Upload</button>
        </form>
        {
          fileUrl && (
            <a href= {fileUrl} target='_blank'>
              {fileUrl}
            </a>
          )
        }
    </div>
    </>
  )
}

export default App
