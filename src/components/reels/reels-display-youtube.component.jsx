import ReactPlayer from 'react-player';

import Button from '../reusable/button/button.component.jsx';

import Client from '../../tools/client.js';
import { formatInputDate, formatYoutubeUrl } from '../../tools/tools.js';

import {
    ActivationButton,
    ButtonContainer,
    MainTitle,
    ReelContainerColumn,
    ReelContainerRow,
    ReelText
} from './display.styles';

const client = new Client();

const ReelsDisplayYoutube = ({ reel, getReel, setShowUpdate, setLoading }) => {

    const changeActivationStatus = async () => {
        setLoading(true);
        await client.changeActivationStatus({ id: reel.id });
        await getReel();
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

export default ReelsDisplayYoutube;