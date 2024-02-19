
import { SnippetsOutlined, NodeIndexOutlined, FileTextOutlined } from '@ant-design/icons';

const icons = {
  SnippetsOutlined,
  NodeIndexOutlined,
  FileTextOutlined
};

const pages = {
  id: 'group-pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'pr',
      title: 'Purchase Request List',
      type: 'item',
      url: '/pr',
      icon: icons.FileTextOutlined,
      breadcrumbs: false
    },
    {
      id: 'notice',
      title: 'Order Notice',
      type: 'item',
      url: '/notice',
      icon: icons.SnippetsOutlined,
      breadcrumbs: false
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.NodeIndexOutlined,
      breadcrumbs: false
    }
  ]
};

export default pages;
