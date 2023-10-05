import {
  VscPieChart,
  VscSettingsGear
} from 'react-icons/vsc';

export const menuItemsLoggedIn = [
  {
    title: 'Metrics',
    path: '/',
    icon: (<VscPieChart />)
  },
  {
    title: 'Configuration',
    path: '/configuration',
    icon: (<VscSettingsGear />)
  },
];