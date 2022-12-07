import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';

function App() {
  const [long_url, setlong_url] = useState("")
  const [short_url, setshort_url] = useState('')
  const [error, seterror] = useState("")
  const [newurl, setnewurl] = useState("")

  function handleSubmit(e){
e.preventDefault()
axios.post("https://rocky-beyond-29223.herokuapp.com/create",{
  long_url,short_url
}).then((res)=>res.data).then((data)=>{
  if(data.short_url){
 setnewurl(()=>`https://rocky-beyond-29223.herokuapp.com/url/${data.short_url}`);
  }
  else{
    seterror(()=>data)
  }
}).catch((err)=>{console.log(err)});
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          value={short_url}
          onChange={(e) => setshort_url(e.target.value)}
          placeholder="Give short URL"
          required
        />
        <input
          value={long_url}
          onChange={(e) => setlong_url(e.target.value)}
          placeholder="Original URL"
          required
        />
        {error && <p>{error}</p>}
        {newurl && (
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <p>{newurl}</p>
            <CopyToClipboard text={newurl}>
              <button
              className={"clipboard"}
              >
                Copy to clipboard
              </button>
            </CopyToClipboard>
          </div>
        )}
        <button style={{ cursor: "pointer" }} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default App;
