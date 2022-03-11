import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
function Login(props) {
    const history = useHistory();
    const [user, setuser] = useState({
        userName: '',
        password: ''

    })

    const handleChange = (event) => {
        const userCopy = { ...user }
        userCopy[event.target.name] = event.target.value
        setuser(userCopy)

    }
    const handleClick = () => {

        if (user.userName && user.password) {
            localStorage.setItem("isAuthenticated", "true");
            props.setisLogin(true)
            localStorage.setItem("isLogin", true)
            history.push('/Products')
        } else {
            alert('please login')
        }
    }
    return <div>

        <div >
            <input type="text"
                name="userName"
                value={user.userName}
                onChange={(event) => { handleChange(event) }}
                className="form-control" placeholder="enter user name" />
        </div>
        <div >
            <input type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control" placeholder="enter password" />
        </div>

        <div className='text-center'>
            <button className="btn btn-primary"
                onClick={handleClick}>Login</button>
        </div>
    </div>;
}

export default Login;
