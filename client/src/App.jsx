import { useState } from "react";
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showMessage, setshowMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  
  const handleLogin = async () => {

    if(username == '' || password == '') {
      setErrorMessage("Username and Password is required");
      setshowMessage(true);
    }

    else {
      const response = await login(username, password);

      if(response) {
        navigate('/Inventory');
      }

      else {
        setErrorMessage('Invalid username or password');
      }
      setshowMessage(true);
    }

  }
  
  return (
    <>
      <div className="w-screen h-screen bg-blue-300 p-5 flex justify-center items-center">
        <div className="border-2 border-blue-900 bg-white rounded m-5 p-5 w-[500px] h-[300px]">
          <div className="p-2 text-5xl text-center text-pink-500 hover:bg-blue-400">LOGIN</div>

          {showMessage &&
          (
          <div className="m5 text-center rounded bg-red-200 text-red-700">
            { errorMessage }
          </div>
           )
          }
      
          
          <div className="flex gap-5 m-5">
            <div className="text-3xl text-center text-blue-900">Username:</div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="rounded border border-gray-400" type="text" />
          </div>

          <div className="flex gap-7 m-5">
            <div className="text-3xl text-center text-blue-900 hover:cursor-pointer">Password:</div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="rounded border border-gray-400" type="password" />
          </div>

          <div className="flex justify-end">
            <button onClick={handleLogin} className="mr-5 bg-blue-600 text-white p-3 rounded hover:bg-pink-500 hover-text-black">LOGIN</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
