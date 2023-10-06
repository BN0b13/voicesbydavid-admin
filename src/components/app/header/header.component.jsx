import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Client from '../../../tools/client';

import { HeaderNav } from './header.styles';

const client = new Client();

const Header = () => {

    return(
        <HeaderNav />
    )
};

export default Header;