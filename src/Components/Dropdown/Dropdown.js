import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../Reducers/User/userSlice';
import { useNavigate } from 'react-router-dom';
import './Dropdown.css'; 

function DropDown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get UserName from Redux store
  const UserName = useSelector((state) => state.user.UserName);

  // Handle Logout
  const handleLogout = () => {
    dispatch(logOut());
    navigate('/loginSignUp');
  };

  // Navigate to Change Password page
  const handleChangePassword = () => {
    navigate('/UpdatePassword');
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="custom-dropdown-toggle" id="dropdown-basic">
        <span className="username-bold">{UserName || 'Guest'}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleChangePassword}>
          Update Password
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
