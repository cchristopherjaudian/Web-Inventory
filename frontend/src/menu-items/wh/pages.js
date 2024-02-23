
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
      title: 'Purchase Request List',
      type: 'item',
      url: '/',
      icon: icons.FileTextOutlined,
      breadcrumbs: false
    }
  ]
};

export default pages;
