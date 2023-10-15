import { useEffect, useState } from 'react';

import CurrentWelcomeImages from '../../components/welcome/current/current.component';
import ImportWelcomeImage from '../../components/welcome/import/import.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import Welcome from '../../components/welcome/welcome.component';

import Client from "../../tools/client";

import {
    ContentContainer,
    MainContainer,
    TabContainer,
    TabSelector
} from './welcome.styles';

const client = new Client();

const WelcomePage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ welcomeSection, setWelcomeSection ] = useState('');
    const [ images, setImages ] = useState(null);
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);

    useEffect(() => {
        getWelcomeSection();
    }, []);

    const getWelcomeSection = async () => {
        setLoading(true);
        const getWelcomeSection = await client.getWelcomeSection();
        const welcomeImages = getWelcomeSection.rows[0].SectionImages;

        welcomeImages.sort((a, b) => a.position - b.position);

        setWelcomeSection(getWelcomeSection.rows[0]);
        setImages(welcomeImages);
        setLoading(false);
    }

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
            return (
                <div>
                    <ImportWelcomeImage welcomeSection={welcomeSection} getWelcomeSection={getWelcomeSection} />
                    <CurrentWelcomeImages images={images} getWelcomeSection={getWelcomeSection} />
                </div>
            )
        }

        if(currentTab === 3) {
            return (
                <div>
                    <h2>About Configuration</h2>
                    <h4>Title</h4>
                    <h4>Description</h4>
                </div>
            )
        }

        return (<Welcome welcomeSection={welcomeSection} getWelcomeSection={getWelcomeSection} />);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <TabContainer>
                        <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Welcome Content</TabSelector>
                        <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Welcome Images</TabSelector>
                        {/* <TabSelector active={tabThreeActive} onClick={() => activateTabThree()}></TabSelector> */}
                    </TabContainer>
                    <ContentContainer>
                        { showCurrentTab() }
                    </ContentContainer>
                </>
            }
        </MainContainer>
    )
}

export default WelcomePage;