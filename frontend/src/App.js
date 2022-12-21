import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';

function App() {
  const [long_url, setlong_url] = useState("")
  const [short_url, setshort_url] = useState('')
  const [error, seterror] = useState("")
  const [newurl, setnewurl] = useState("")
  const [show, setshow] = useState(false)
  const ref = useRef("")
function handlemessage(){
  if(ref.current){
    clearTimeout(ref.current)
  }
  setshow(()=>true)
  ref.current=setTimeout(() => {
      setshow(() => false);

  }, 2000);
}

  function handleSubmit(e){
e.preventDefault()
axios
  .post("https://url-shortner-uhk4.onrender.com/create", {
    long_url,
    short_url,
  })
  .then((res) => res.data||console.log(res.data,"hi"))
  .then((data) => {
    if (data.short_url) {
      setnewurl(
        () => `https://url-shortner-uhk4.onrender.com/url/${data.short_url}`
      );
    } else {
      seterror(() => data);
    }
  })
  .catch((err) => {
    console.log(err);
  });
  }
  return (
    <div className="App">
      <div className='message' style={!show?{visibility:"hidden"}:{}}>Copied</div>
      <h1 className='title'>Masai Url Shortner</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={short_url}
          onChange={(e) => setshort_url(e.target.value)}
          placeholder="Give a name for short URL"
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
            <CopyToClipboard style={{border:"0.5 ps solid black"}} text={newurl}>
              <button onClick={handlemessage}
              className={"clipboard"}
              >
                Copy 
              </button>
            </CopyToClipboard>
          </div>
        )}
        <button style={{ cursor: "pointer" }} type="submit">
          shorten Url
        </button>
      </form>
    </div>
  );
}

export default App;
