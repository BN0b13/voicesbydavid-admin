import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import Client from '../../../tools/client';

import { HeaderNav } from './header.styles';

const client = new Client();

const Header = () => {
    const [ newAccounts, setNewAccounts ] = useState(0);
    const [ newOrders, setNewOrders ] = useState(0);

    useEffect(() => {
        getAccounts();
        getOrders();
    }, []);

    const getAccounts = async () => {
        const res = await client.getCustomers();
        const today = dayjs().format('MM/DD/YY');
        const signUpsToday = res.rows.filter(customer =>  dayjs(customer.createdAt).format('MM/DD/YY') == today);
        setNewAccounts(signUpsToday.length);
    }

    const getOrders= async () => {
        const res = await client.getOrders();
        const newOrderArr = res.rows.filter(order => order.status.toLowerCase() === 'new');
        setNewOrders(newOrderArr.length);
    }

    return(
        <HeaderNav>
            {newAccounts !== 0 &&
                <h4 onClick={() => window.location.href = '/accounts'}>{newAccounts} New Account(s)</h4>
            }
            {newOrders !== 0 &&
                <h4 onClick={() => window.location.href = '/orders'}>{newOrders} New Order(s)</h4>
            }
        </HeaderNav>
    )
};

export default Header;