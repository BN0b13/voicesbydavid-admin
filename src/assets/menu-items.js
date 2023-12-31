import {
  BsCameraReels
} from 'react-icons/bs';

import {
  PiEnvelope
} from 'react-icons/pi';

import {
  VscPerson,
  VscPieChart,
  VscSettingsGear,
  VscSmiley,
  VscInfo
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
    icon: (<VscSmiley />)
  },
  {
    title: 'About',
    path: '/about',
    icon: (<VscInfo />)
  },
  {
    title: 'Configuration',
    path: '/configuration',
    icon: (<VscSettingsGear />)
  },
];