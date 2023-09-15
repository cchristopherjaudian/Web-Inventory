
import { HourglassOutlined, ToolOutlined } from '@ant-design/icons';

const icons = {
  HourglassOutlined,
  ToolOutlined
};

const others = {
  id: 'group-others',
  title: '',
  type: 'group',
  children: [
    {
      id: 'maintenance',
      title: 'Maintenance',
      type: 'item',
      url: '/maintenance',
      icon: icons.HourglassOutlined,
      breadcrumbs: false
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: icons.ToolOutlined,
      breadcrumbs: false
    }
  ]
};

export default others;
