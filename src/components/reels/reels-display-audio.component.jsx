import AudioPlayer from 'react-h5-audio-player';

import Button from '../reusable/button/button.component.jsx';

import { api } from '../../config.js';
import Client from '../../tools/client.js';
import { formatInputDate } from '../../tools/tools.js';

import {
    ActivationButton,
    ButtonContainer,
    MainContainer,
    MainTitle,
    ReelContainerColumn,
    ReelContainerRow,
    ReelText
} from './display.styles';

import 'react-h5-audio-player/lib/styles.css';

const client = new Client();

const ReelsDisplayAudio = ({ reel, getReel, setShowUpdate, setLoading }) => {

    const changeActivationStatus = async () => {
        setLoading(true);
        await client.changeActivationStatus({ id: reel.id });
        await getReel();
    }

    return (
        <MainContainer>
            <AudioPlayer
                src={api + '/reels/audio/' + reel.filename}
                preload="auto"
                showJumpControls={false} // Hides fast forward & rewind buttons
                customAdditionalControls={[]} // Removes extra controls
                customVolumeControls={[]} // Optionally remove volume controls
                layout="stacked" // Optional: Adjusts layout
            />

            <MainTitle>Reel Title: {reel.title}</MainTitle>
            <ReelText>Description: {reel.description}</ReelText>
            
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
                </ReelContainerColumn>
            </ReelContainerRow>
            
            <ButtonContainer>
                <ActivationButton color={reel.active ? 'red' : 'green'} onClick={() => changeActivationStatus()}>{ reel.active ? 'DEACTIVATE' : 'ACTIVATE' }</ActivationButton>
                <Button onClick={() => setShowUpdate(true)}>Update</Button>
            </ButtonContainer>
        </MainContainer>
    )
}

export default ReelsDisplayAudio;