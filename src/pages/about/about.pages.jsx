import { useEffect, useState } from 'react';

import About from '../../components/about/about.component';
import CurrentAboutImages from '../../components/about/current/current.component';
import ImportAboutImage from '../../components/about/import/import.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from "../../tools/client";

import {
    ContentContainer,
    MainContainer,
    TabContainer,
    TabSelector
} from './about.styles';

const client = new Client();

const AboutPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ aboutSection, setAboutSection ] = useState('');
    const [ images, setImages ] = useState(null);
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ tabThreeActive, setTabThreeActive ] = useState(false);

    useEffect(() => {
        getAboutSection();
    }, []);

    const getAboutSection = async () => {
        setLoading(true);
        const getAboutSection = await client.getAboutSection();
        const aboutImages = getAboutSection.rows[0].SectionImages;

        aboutImages.sort((a, b) => a.position - b.position);

        setAboutSection(getAboutSection.rows[0]);
        setImages(aboutImages);
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
                    <ImportAboutImage aboutSection={aboutSection} getAboutSection={getAboutSection} />
                    <CurrentAboutImages images={images} getAboutSection={getAboutSection} />
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

        return (<About aboutSection={aboutSection} getAboutSection={getAboutSection} />);
    }

    return (
        <MainContainer>
            {loading ?
                <Spinner />
            :
                <>
                    <TabContainer>
                        <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>About Content</TabSelector>
                        <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>About Images</TabSelector>
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

export default AboutPage;