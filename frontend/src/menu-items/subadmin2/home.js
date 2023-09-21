
import { CodeSandboxOutlined, ToolOutlined } from '@ant-design/icons';

const icons = {
  CodeSandboxOutlined,
  ToolOutlined
};

const home = {
  id: 'group-home',
  title: 'Home',
  type: 'group',
  children: [
    {
      id: 'inventorysub2',
      title: 'Inventory',
      type: 'item',
      url: '/',
      icon: icons.CodeSandboxOutlined,
      breadcrumbs: false
    },{
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: icons.ToolOutlined,
      breadcrumbs: false
    }
  ]
};

export default home;
