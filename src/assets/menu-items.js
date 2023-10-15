import {
  BsCameraReels
} from 'react-icons/bs';

import {
  FaRegAddressCard
} from 'react-icons/fa';

import {
  PiEnvelope
} from 'react-icons/pi';

import {
  VscPerson,
  VscPieChart,
  VscSettingsGear,
} from 'react-icons/vsc';

export const menuItemsLoggedIn = [
  {
    title: 'Metrics',
    path: '/',
    icon: (<VscPieChart />)
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: (<PiEnvelope />)
  },
  {
    title: 'Reels',
    path: '/reels',
    icon: (<BsCameraReels />)
  },
  {
    title: 'Testimonials',
    path: '/testimonials',
    icon: (<VscPerson />)
  },
  {
    title: 'Welcome',
    path: '/welcome',
    icon: (<VscSettingsGear />)
  },
  {
    title: 'About',
    path: '/about',
    icon: (<VscSettingsGear />)
  },
  {
    title: 'Configuration',
    path: '/configuration',
    icon: (<VscSettingsGear />)
  },
];