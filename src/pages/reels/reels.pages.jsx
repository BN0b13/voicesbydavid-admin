import { useState } from 'react';

import {
    MainContainer,
    MainSubtitle,
    MainText,
    MainTitle,
    TabContainer,
    TabSelector
} from './reels.styles';

const ReelsPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);

    const activateTabOne = () => {
        setCurrentTab(1);
        setTabOneActive(true);
        setTabTwoActive(false);
    }

    const activateTabTwo = () => {
        setCurrentTab(2);
        setTabOneActive(false);
        setTabTwoActive(true);
    }

    const showCurrentTab = () => {

        if(currentTab === 2) {
            return (
                <>
                    <MainSubtitle>Video</MainSubtitle>
                    <MainText>Coming Soon...</MainText>
                </>
            )
        }

        return (
            <>
                <MainSubtitle>Audio</MainSubtitle>
                <MainText>Coming Soon...</MainText>
            </>
        )
    }

    return (
        <MainContainer>
            <TabContainer>
                        <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Audio</TabSelector>
                        <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Video</TabSelector>
                    </TabContainer>
            <MainTitle>Reels</MainTitle>
            { showCurrentTab() }
        </MainContainer>
    )
}

export default ReelsPage;