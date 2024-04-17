import { useState ,useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password,setpassword] = useState("");
  const [length,setlength] = useState(8);
  const [numallowed,setnumallowed] = useState(false);
  const [charallowed,setcharallowed] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback( () =>{
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    let pass="";
    if(numallowed) str+="0123456789";
    if(charallowed) str+="!@#$%^&*()_+={}[]<>?~`";

    for(let i=0 ; i<length ; i++){
      let index = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(index);
    }
    setpassword(pass);
  } , [length,numallowed,charallowed])

  const copytoclipboard = ()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password);
  }

  useEffect(()=>{
    generatePassword();
  },[length,numallowed,charallowed]);

  return (
    <>
      <div style={ { width : '80vh'}}>
        <div>
              <input type="text" value={password} placeholder='Password' style={{padding : '20px'}} readOnly ref={passwordRef}/>
              <button style={{padding : '20px'}} onClick={copytoclipboard}>Copy</button>
        </div>
        <div style={{display : 'flex' , padding:'12px' ,margin : '8px' , justifyContent : 'space-evenly' , width : '100%' , border : '2px solid white'}}>
            <div>
              <input type="range" value={length} min={6} max={100} id='len' onChange={(e)=>setlength(e.target.value)}/>
              <label htmlFor="len">Length : {length}</label>
            </div>
            <div>
              <input type="checkbox" value={numallowed} id='num' onChange={()=>setnumallowed((prev)=>!prev)}/>
              <label htmlFor="num">Number</label>
            </div>
            <div>
              <input type="checkbox" value={charallowed} id='char' onChange={()=>setcharallowed((prev)=>!prev)}/>
              <label htmlFor="char">Character</label>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
