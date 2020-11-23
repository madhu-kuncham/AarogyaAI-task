import React , {useState} from "react";
import { GoogleLogin } from "react-google-login";
import Table from "../Orders/Table";

function GoogleAuth() {

   const [name , setName ] = useState('')
   const [email , setEmail ] = useState('')
   const [url , setUrl ] = useState('')
   const [loggedIn , setLoggedIn] = useState(false)

   const responseGoogle = response => {
    setName(response.profileObj.name)
    setEmail(response.profileObj.email)
    setUrl(response.profileObj.imageUrl)
    setLoggedIn(true);
  };

  const loginFailureResponse = response => {
    setName('')
    setEmail('')
    setUrl('')
    setLoggedIn(false);
  };


  return (
    <div>
      <h2>Welcome : {name} </h2>
      <h2>Email : {email} </h2>
      <img src={url} alt={name} />
      {   !loggedIn ?
        <GoogleLogin
        clientId="199381943748-5g1f19dq17qecrg1cabnbokcf45ljj0q.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={loginFailureResponse}
      /> : <div></div>
     } 
      { loggedIn ? <Table />: <div> </div> }
    </div>
  );
}
  
export default GoogleAuth;
