import { useState } from "react";

import AdminModal from '../../../reusable/admin-modal/admin-modal.component';

import { api } from '../../../../config';
import Client from "../../../../tools/client";

import {
    AboutImage,
    AboutImageDeleteButton,
    ContentContainer,
    MainContainer
} from './image.styles';

const client = new Client();

const Image = ({ image, getAboutSection }) => {
    const url = `${api}${image.path}`;

    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    const confirmDelete = () => {
        setShowDeleteModal(true);
    }

    const deleteImage = async () => {
        await client.deleteImages({
            ids: [ image.id ]
        });

        setShowDeleteModal(false);

        getAboutSection();
    }

    return (
        <MainContainer>
            <AdminModal 
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                title={'Delete Image'} 
                image={url}
                message={'Are you sure you want to delete this image forever?'} 
                action={deleteImage} 
                actionText={'Delete'}
            />
            <ContentContainer>
                <AboutImage src={url} alt={image.name} />
                <AboutImageDeleteButton onClick={() => confirmDelete()}>Delete</AboutImageDeleteButton>
            </ContentContainer>
        </MainContainer>
    )
}

export default Image;