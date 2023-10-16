import { useState } from 'react';

import AccountPage from '../account/account.pages';
import SocialMedia from '../../components/social-media/social-media.component';

import {
    ContentContainer,
    MainContainer,
    TabContainer,
    TabSelector
} from './configuration.styles';

const ConfigurationPage = () => {
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);

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
            return (<SocialMedia />)
        }

        if(currentTab === 3) {
            return (<></>)
        }

        return (<AccountPage />);
    }

    return (
        <MainContainer>
            <TabContainer>
                <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Account</TabSelector>
                <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Social Media</TabSelector>
                {/* <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}></TabSelector> */}
            </TabContainer>
            <ContentContainer>
                { showCurrentTab() }
            </ContentContainer>
        </MainContainer>
    )
}

export default ConfigurationPage;