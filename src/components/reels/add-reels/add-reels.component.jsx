import { useState } from 'react';

import Youtube from './youtube/youtube.component';

import {
    MainContainer,
    MainSubtitle,
    MainTitle,
    ReelOption,
    ReelSelect
} from './add-reels.styles';

const Reels = () => {
    const [ reelType, setReelType ] = useState('');
    
    const display = () => {
        if(reelType === 'audio') {
            return (
                <>
                    <MainTitle>Audio Coming Soon</MainTitle>
                </>
            )
        }

        if(reelType === 'video') {
            return (
                <>
                    <MainTitle>Video Coming Soon</MainTitle>
                </>
            )
        }

        if(reelType === 'youtube') {
            return (<Youtube />)
        }
    }

    return (
        <MainContainer>
            <MainTitle>Add Reel</MainTitle>
            <MainSubtitle>Select Reel Type</MainSubtitle>

            <ReelSelect name='reelType' onChange={(e) => setReelType(e.target.value)} defaultValue={0}>
                <ReelOption value={0} disabled> -- Reel Type -- </ReelOption>
                <ReelOption value={'audio'}>Audio</ReelOption>
                <ReelOption value={'video'}>Video</ReelOption>
                <ReelOption value={'youtube'}>Youtube</ReelOption>
            </ReelSelect>

            { display() }

        </MainContainer>
    )
}

export default Reels;