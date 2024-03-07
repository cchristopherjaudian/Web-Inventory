import { FileTextOutlined } from '@ant-design/icons';

const icons = {
  FileTextOutlined
};

const pages = {
  id: 'group-pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'pr',
      title: 'Order Notice',
      type: 'item',
      url: '/',
      icon: icons.FileTextOutlined,
      breadcrumbs: false
    },
    {
      id: 'inventory_page',
      title: 'Inventory',
      type: 'item',
      url: '/inventory',
      icon: icons.FileTextOutlined,
      breadcrumbs: false
    }
  ]
};

export default pages;
