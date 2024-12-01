// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Fade from '@mui/material/Fade';
// import { useDispatch } from 'react-redux';
// import { logOut } from '../../Reducers/User/userSlice';

// export default function DropDown({UserName}) {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const dispatch=useDispatch();
//   const handleLogout=()=>dispatch(logOut());
//   console.log("UserName:", UserName);
//   return (
//     <div>
//       <Button
//         id="fade-button"
//         aria-controls={open ? 'fade-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         {UserName} 
//       </Button>
//       <Menu
//         id="fade-menu"
//         MenuListProps={{
//           'aria-labelledby': 'fade-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Fade}
//       >
//         {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
//         <MenuItem onClick={handleClose}>My account</MenuItem>
//         <MenuItem onClick={handleLogout}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );
// }

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Fade from '@mui/material/Fade';
// import { useDispatch, useSelector } from 'react-redux'; 
// import { logOut } from '../../Reducers/User/userSlice';
// import { useNavigate } from 'react-router-dom'; 

// export default function DropDown() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const UserName = useSelector((state) => state.user.UserName); 

//   const handleLogout = () => {
//     dispatch(logOut());
//     navigate('/loginSignUp'); 
//     handleClose();
//   };

//   // Navigate to the Change Password page
//   const handleChangePassword = () => {
//     navigate('/UpdatePassword'); 
//     handleClose();
//   };

//   return (
//     <div>
//       <Button
//         id="fade-button"
//         aria-controls={open ? 'fade-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         {UserName || 'Guest'}  {/* Display "Guest" if UserName is null */}
//       </Button>
//       <Menu
//         id="fade-menu"
//         MenuListProps={{
//           'aria-labelledby': 'fade-button',
//         }}
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Fade}
//       >
//         {/* Menu item for Change Password */}
//         <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
//         <MenuItem onClick={handleLogout}>Logout</MenuItem>
//       </Menu>
//     </div>
//   );
// }

import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../Reducers/User/userSlice';
import { useNavigate } from 'react-router-dom';
import './DropDown.css'; // Import the CSS file for custom styles

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
        {UserName || 'Guest'} {/* Display "Guest" if UserName is not available */}
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

