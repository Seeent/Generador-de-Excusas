
import { useState,useEffect } from 'react'

import './App.css'


const backendUrl=import.meta.env.VITE_BACKEND_URL;
console.log(backendUrl);
function App() {
  const [count, setCount] = useState(0)

  const [inputText, setInputText] = useState('');
  const [excuse, setExcuse] = useState('')
  const [error, setError] = useState('')

  const generateExcuse = async()=>{
    try{
      await incrementCount();

      const response = await fetch(`${backendUrl}/generate-excuse`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          prompt:inputText
        }),
      })

      if(!response.ok){
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
    
      setExcuse(data.choices[0].message.content.trim());
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('Hubo un error al generar la excusa.');
    }
    }

    const incrementCount = async () => {
      try {
        const response = await fetch(`${backendUrl}/increment-count`, {
          method: 'POST'
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data = await response.json();
        setCount(data.count);  
      } catch (err) {
        console.error('Error al incrementar el contador:', err);
      }
    }

    const fetchCount = async () => {
      try {
        const response = await fetch(`${backendUrl}/get-count`, {
          method: 'GET'
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data = await response.json();
        setCount(data.count);  
      } catch (err) {
        console.error('Error al obtener el contador:', err);
      }
    }
  
    useEffect(() => {
      fetchCount();
    }, []);
  
  return (
    
      <>
      <div className="container-fluid text-center">

        
      <h1 className="firstTitle">¡¡Genera la excusa perfecta!!</h1>

      



<div className="grid"></div>
<div id="poda">
  <div className="glow"></div>
  <div className="darkBorderBg"></div>
  <div className="darkBorderBg"></div>
  <div className="darkBorderBg"></div>

  <div className="white"></div>

  <div className="border"></div>

  <div id="main">
    <input placeholder="No quiero..." type="text" name="text" className="input" value={inputText} onChange={(e)=>setInputText(e.target.value)}/>
    <div id="input-mask"></div>
    <div id="pink-mask"></div>
  

  
  </div>
</div>



    </div>
    
    {excuse && (
      <div className="excuse-output">
            
            <p>{excuse}</p>
          </div>
        )}
        {error && (
          <div className="error-output">
            <h2>Error:</h2>
            <p>{error}</p>
          </div>
        )}
        <button id="boton" className="InputText" onClick={generateExcuse} >Genera la excusa</button>
    <script src="app.js"></script>
    
      <div className="card">
      <p>Contador de clicks: {count}</p> 
        
      </div>
      <div className="fixed-bottom p-4">
        
        <a href="https://www.linkedin.com/in/vicente-esteban-ortiz/"> Vicente Esteban</a>
      </div>
    </>
  )
}

export default App;
