import { AuditOutlined, CodeSandboxOutlined, TeamOutlined, NodeIndexOutlined, LineChartOutlined, UserOutlined } from '@ant-design/icons';

const icons = {
  AuditOutlined,
  CodeSandboxOutlined,
  TeamOutlined,
  NodeIndexOutlined,
  LineChartOutlined,
  UserOutlined
};

const pages = {
  id: 'group-pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'transactions',
      title: 'Transaction Records',
      type: 'item',
      url: '/transactions',
      icon: icons.AuditOutlined,
      breadcrumbs: false
    },
    {
      id: 'inventory',
      title: 'Inventory',
      type: 'item',
      url: '/inventory',
      icon: icons.CodeSandboxOutlined,
      breadcrumbs: false
    },
    {
      id: 'b2c',
      title: 'B2C',
      type: 'item',
      url: '/b2c',
      icon: icons.TeamOutlined,
      breadcrumbs: false
    },
    {
      id: 'b2b',
      title: 'B2B',
      type: 'item',
      url: '/b2b',
      icon: icons.TeamOutlined,
      breadcrumbs: false
    },
    {
      id: 'routes',
      title: 'Route Schedule',
      type: 'item',
      url: '/routes',
      icon: icons.NodeIndexOutlined,
      breadcrumbs: false
    },
    {
      id: 'sales',
      title: 'Sales Report',
      type: 'item',
      url: '/sales',
      icon: icons.LineChartOutlined,
      breadcrumbs: false
    },
    {
      id: 'account',
      title: 'Account',
      type: 'item',
      url: '/account',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default pages;
