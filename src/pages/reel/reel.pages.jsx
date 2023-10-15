import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

import Button from '../../components/reusable/button/button.component';
import Spinner from '../../components/reusable/spinner/spinner.component';
import UpdateReel from './update-reel/update-reel.component';

import Client from '../../tools/client';
import { formatInputDate, formatYoutubeUrl } from '../../tools/tools';

import {
    ActivationButton,
    BackText,
    ButtonContainer,
    MainContainer,
    MainTitle,
    ReelContainerColumn,
    ReelContainerRow,
    ReelText
} from './reel.styles';

const client = new Client();

const ReelPage = () => {
    const { id } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ reel, setReel ] = useState(true);
    const [ showUpdate, setShowUpdate ] = useState(false);

    useEffect(() => {
        getReel();
    }, []);

    const getReel = async () => {
        setLoading(true);
        const res = await client.getReelById(id);
        setReel(res);
        setLoading(false);
    }

    const changeActivationStatus = async () => {
        setLoading(true);
        await client.changeActivationStatus({ id: reel.id });
        await getReel();
    }

    const completeUpdate = async () => {
        await getReel();
        setShowUpdate(false);
    }

    const display = () => {
        if(showUpdate) {
            return (<UpdateReel reel={reel} completeUpdate={completeUpdate} />)
        }

        if(reel.reelType === 'audio') {
            return
        }
        if(reel.reelType === 'video') {
            return
        }

        return (
            <>
                <MainTitle>Reel Title: {reel.title}</MainTitle>
                <ReelText>Description: {reel.description}</ReelText>
                <ReactPlayer
                    url={reel.url}
                    height='400px'
                    width='600px'
                />
                
                <ReelContainerRow>
                    <ReelContainerColumn>
                        <ReelText>Active: {reel.active ? 'Yes' : 'No'}</ReelText>
                        <ReelText>Position: {reel.position}</ReelText>
                        <ReelText>Company: {reel.company}</ReelText>
                        <ReelText>Company URL: {reel.companyUrl}</ReelText>
                    </ReelContainerColumn>
                    <ReelContainerColumn>
                        <ReelText>Reel Category: {reel.Category.name}</ReelText>
                        <ReelText>Reel Type: {reel.reelType}</ReelText>
                        <ReelText>Reel Date: {reel.reelDate ? formatInputDate(reel.reelDate) : ''}</ReelText>
                        <ReelText>Reel URL: {reel.url ? formatYoutubeUrl(reel.url) : ''}</ReelText>
                    </ReelContainerColumn>
                </ReelContainerRow>
                
                <ButtonContainer>
                    <ActivationButton color={reel.active ? 'red' : 'green'} onClick={() => changeActivationStatus()}>{ reel.active ? 'DEACTIVATE' : 'ACTIVATE' }</ActivationButton>
                    <Button onClick={() => setShowUpdate(true)}>Update</Button>
                </ButtonContainer>
            </>
        )
    }

    return (
        <>
            <BackText onClick={() => window.location = '/reels'}>Back</BackText>
            <MainContainer>
                {loading ?
                    <Spinner />
                :
                    reel ?
                        display() 
                    :
                        <MainTitle>No Reel To Display</MainTitle>
                }
            </MainContainer>
        </>
    )
}

export default ReelPage;