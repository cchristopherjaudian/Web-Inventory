import { AppstoreOutlined, MessageOutlined } from '@ant-design/icons';
const icons = {
  AppstoreOutlined,
  MessageOutlined
};

const home = {
  id: 'group-home',
  title: 'Home',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.AppstoreOutlined,
      breadcrumbs: false
    }
    // {
    //   id: 'oxichat',
    //   title: 'Oxichat',
    //   type: 'item',
    //   url: '/oxichat',
    //   icon: icons.MessageOutlined,
    //   breadcrumbs: false
    // }
  ]
};

export default home;
