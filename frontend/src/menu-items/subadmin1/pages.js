
import { SnippetsOutlined, NodeIndexOutlined } from '@ant-design/icons';

const icons = {
  SnippetsOutlined,
  NodeIndexOutlined
};

const pages = {
  id: 'group-pages',
  title: 'Pages',
  type: 'group',
  children: [
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
