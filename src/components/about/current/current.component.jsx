import Image from "./image/image.component";

import {
    CurrentSubtitle,
    CurrentTitle,
    MainContainer
} from './current.styles';

const CurrentAboutImages = ({ images, getAboutSection }) => {

    return (
        <MainContainer>
            {images && 
                images.length === 0 || images === null ?
                <></>
                :
                <>
                    <CurrentTitle>About Image</CurrentTitle>
                    {images.map((image, index) => {
                        if(image.position === null) {
                            image.position = '';
                        }
                        return (
                            <Image key={index} image={image} getAboutSection={getAboutSection} />
                    )})}
                </>
            }
        </MainContainer>
    )
}

export default CurrentAboutImages;