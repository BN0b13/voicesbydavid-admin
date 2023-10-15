import { useState } from "react";

import Button from "../../reusable/button/button.component";
import Snackbar from '../../reusable/snackbar/snackbar.component';

import Client from "../../../tools/client";

import {
    ImageFileInput,
    MainContainer,
    MainForm,
    MainTitle
} from './import.styles';

const client = new Client();

const ImportAboutImage = ({ aboutSection, getAboutSection }) => {
    console.log('About Section: ', aboutSection.SectionImages.length);
    const [ image, setImage ] = useState('');
    const [ imagePreview, setImagePreview ] = useState('');
    const [ fileInput, setFileInput ] = useState('');

    const [ showMsg, setShowMsg ] = useState(false);
    const [ msgContent, setMsgContent ] = useState('');
    const [ msgType, setMsgType ] = useState('error');

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);

        if(e.target.files[0] === undefined) {
            return setImagePreview('');
        }

        setImagePreview(URL.createObjectURL(e.target.files[0]));
    }

    const createAboutImage = async () => {
        if(image === '') {
            setMsgContent('Please select an image.');
            setMsgType('error');
            setShowMsg(true);
            return
        }

        let formData = new FormData();

        formData.append('files', image);
        formData.append('sectionId', aboutSection.id);

        await client.postSectionImage(formData);

        setImage('');
        setImagePreview('');
        setFileInput('');

        getAboutSection();
    }

    return (
        <MainContainer>
            {aboutSection.SectionImages.length === 0 && 
                <>
                    <MainTitle>Add New About Image</MainTitle>
                    <MainForm>
                        {imagePreview && <img src={imagePreview} width='200' height='200' />}
                        <ImageFileInput type="file" accept='image/*' name="files" value={fileInput} onChange={e => handleFileChange(e)} />
                    </MainForm>
                    {showMsg &&
                        <Snackbar msg={msgContent} type={msgType} show={setShowMsg} />
                    }
        
                    <Button onClick={() => createAboutImage()}>Add</Button>
                </>
            }
        </MainContainer>
    )
}

export default ImportAboutImage;