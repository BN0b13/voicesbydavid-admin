import { useEffect, useState } from 'react';

import AddReels from '../../components/reels/add-reels/add-reels.component';
import Spinner from '../../components/reusable/spinner/spinner.component';

import Client from '../../tools/client';

import {
    MainContainer,
    MainTitle,
    ReelsTable,
    ReelsTableHeader,
    ReelsTableHead,
    ReelsTableBody,
    ReelsTableRow,
    ReelsTableData,
    ReelsTitle,
    TabContainer,
    TabSelector
} from './reels.styles';

const client = new Client();

const ReelsPage = () => {
    const [ loading, setLoading ] = useState(true);
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ tabOneActive, setTabOneActive ] = useState(true);
    const [ tabTwoActive, setTabTwoActive ] = useState(false);
    const [ reels, setReels ] = useState('');

    useEffect(() => {
        getReels();
    }, []);

    const getReels = async () => {
        setLoading(true);
        const res = await client.getReels();
        const sortReelsByCategory = res.rows.sort((a, b) => a.Category.name.localeCompare(b.Category.name));
        setReels(sortReelsByCategory);
        setLoading(false);
    }

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
            return (<AddReels />);
        }

        return (
            <>
                <MainTitle>Reels</MainTitle>
                {loading ? 
                    <Spinner />
                :
                    reels ?
                        <ReelsTable>
                            <ReelsTableHeader>
                                <ReelsTableRow>
                                    <ReelsTableHead>Category</ReelsTableHead>
                                    <ReelsTableHead>Type</ReelsTableHead>
                                    <ReelsTableHead>Position</ReelsTableHead>
                                    <ReelsTableHead>Title</ReelsTableHead>
                                    <ReelsTableHead>Active</ReelsTableHead>
                                </ReelsTableRow>
                            </ReelsTableHeader>
                            <ReelsTableBody>
                                {reels.map((reel, index) => (
                                    <ReelsTableRow key={index} onClick={() => window.location.href = `/reels/${reel.id}`}>
                                        <ReelsTableData>{reel.Category.name}</ReelsTableData>
                                        <ReelsTableData>{reel.reelType}</ReelsTableData>
                                        <ReelsTableData>{reel.position}</ReelsTableData>
                                        <ReelsTableData>{reel.title ? reel.title : 'No Title'}</ReelsTableData>
                                        <ReelsTableData>{reel.active ? 'Yes' : 'No'}</ReelsTableData>
                                    </ReelsTableRow>
                                ))}
                            </ReelsTableBody>
                        </ReelsTable>
                    :
                        <ReelsTitle>No Reels To Display</ReelsTitle>
                }
            </>
        );
    }

    return (
        <MainContainer>
            <TabContainer>
                        <TabSelector active={tabOneActive} onClick={() => activateTabOne()}>Library</TabSelector>
                        <TabSelector active={tabTwoActive} onClick={() => activateTabTwo()}>Add Reel</TabSelector>
                    </TabContainer>
            { showCurrentTab() }
        </MainContainer>
    )
}

export default ReelsPage;