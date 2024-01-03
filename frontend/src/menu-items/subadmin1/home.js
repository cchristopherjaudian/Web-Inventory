import { AuditOutlined } from '@ant-design/icons';

const icons = {
  AuditOutlined
};

const home = {
  id: 'group-home',
  title: 'Home',
  type: 'group',
  children: [
    {
      id: 'transactions',
      title: 'Transaction Records',
      type: 'item',
      url: '/',
      icon: icons.AuditOutlined,
      breadcrumbs: false
    }
  ]
};

export default home;
