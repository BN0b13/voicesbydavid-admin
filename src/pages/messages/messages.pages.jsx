import { useEffect, useState } from 'react';

import Message from './message/message.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';


import {
    MainContainer,
    MessagesTable,
    MessagesTableHeader,
    MessagesTableHead,
    MessagesTableBody,
    MessagesTableRow,
    MessagesTitle,
    TabContainer,
    TabSelector
} from './messages.styles';

const client = new Client();

const MessagesPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);
    const [ newMessages, setNewMessages ] = useState('');
    const [ readMessages, setReadMessages ] = useState('');

    useEffect(() => {
        const getMessages = async () => {
            const getMessages = await client.getMessages();
            console.log('GET Messages: ', getMessages.rows);
            const newMessageFilter = getMessages.rows.filter(message => message.status === 'new');
            const readMessageFilter = getMessages.rows.filter(message => message.status === 'read');

            setNewMessages(newMessageFilter);
            setReadMessages(readMessageFilter);
            setLoading(false);
        }

        getMessages();
    }, []);

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
        setTabThreeActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
        setTabThreeActive(false);
    }

    const activateTabThree = () => {
        setCurrentTab(3);
        setTabOneActive(false);
        setTabTwoActive(false);
        setTabThreeActive(true);
    }

    const showCurrentTab = () => {

        if(currentTab === 2) {
            return newMessages.map((message, index) => (
                <MessagesTableRow onClick={() => window.location = `/messages/${message.id}`}>
                    <Message key={index} message={message} />
                </MessagesTableRow>
            ));
        }

        if(currentTab === 3) {
            return readMessages.map((message, index) => (
                <MessagesTableRow onClick={() => window.location = `/messages/${message.id}`}>
                    <Message key={index} message={message} />
                </MessagesTableRow>
            ));
        }

        return (
            <>
                {newMessages.map((message, index) => (
                    <MessagesTableRow onClick={() => window.location = `/messages/${message.id}`}>
                        <Message key={index} message={message} />
                    </MessagesTableRow>
                ))}
                {readMessages.map((message, index) => (
                    <MessagesTableRow onClick={() => window.location = `/messages/${message.id}`}>
                        <Message key={index} message={message} />
                    </MessagesTableRow>
                ))}
            </>
        )
    }

    return (
        <>
            {loading ?
                <Spinner />
            :
                <MainContainer>
                    <TabContainer>
                        <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>All</TabSelector>
                        <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>New</TabSelector>
                        <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}>Read</TabSelector>
                    </TabContainer>
                    <MessagesTitle>Messages</MessagesTitle>
                    <MessagesTable>
                        <MessagesTableHeader>
                            <MessagesTableRow>
                                <MessagesTableHead>Status</MessagesTableHead>
                                <MessagesTableHead>Replied</MessagesTableHead>
                                <MessagesTableHead>Name</MessagesTableHead>
                                <MessagesTableHead>Date</MessagesTableHead>
                            </MessagesTableRow>
                        </MessagesTableHeader>
                        <MessagesTableBody>
                            { showCurrentTab() }
                        </MessagesTableBody>
                    </MessagesTable>
                </MainContainer>

            }
        </>
    )
}

export default MessagesPage;