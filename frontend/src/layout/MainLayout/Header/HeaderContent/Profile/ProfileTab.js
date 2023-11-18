import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { setToken,setAuth } from 'store/reducers/token';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {setUserOffline} from 'config/chat/index';
import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';


const ProfileTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const myMobile = useSelector((state) => state.profile.contact.contact);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleLogout = () => {
    dispatch(setToken(''));
    dispatch(setAuth(false));
    setUserOffline(myMobile)
    navigate('/',{replace:true});
  };
  const goToProfile = () =>{
    navigate('/profile');
  }
  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={goToProfile}>
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};
export default ProfileTab;
