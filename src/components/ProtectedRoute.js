import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { Redirect, Route,BrowserRouter } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);
if(isAuthenticated){
    restOfProps.setisLogin(true)
}
  return <div>
      <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  
  </div>;
  

}

export default ProtectedRoute;
