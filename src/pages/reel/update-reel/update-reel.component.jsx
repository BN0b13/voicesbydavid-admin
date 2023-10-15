import { useEffect, useState } from 'react';

import AdminModal from '../../../components/reusable/admin-modal/admin-modal.component';
import Button from '../../../components/reusable/button/button.component';
import Spinner from '../../../components/reusable/spinner/spinner.component';

import Client from '../../../tools/client';
import { formatYoutubeUrl } from '../../../tools/tools';

import {
    ContactInfoContainer,
    DeleteReelButton,
    UpdateReelDataContainer,
    UpdateReelContainer,
    ButtonContainer,
    MainTitle,
    UpdateReelInput,
    UpdateReelOption,
    UpdateReelSelect,
    UpdateReelTextarea
} from './update-reel.styles';

const client = new Client();

const UpdateReel = ({ reel, completeUpdate }) => {
    const [ loading, setLoading ] = useState(true);
    const [ categories, setCategories ] = useState('');
    const [ category, setCategory ] = useState(reel.Category.id);
    const [ title, setTitle ] = useState(reel.title ? reel.title : '');
    const [ url, setUrl ] = useState(reel.url ? formatYoutubeUrl(reel.url) : '');
    const [ position, setPosition ] = useState(reel.position ? reel.position : '');
    const [ company, setCompany ] = useState(reel.company ? reel.company : '');
    const [ companyUrl, setCompanyUrl ] = useState(reel.companyUrl ? reel.companyUrl : '');
    const [ reelDate, setReelDate ] = useState(reel.reelDate ? reel.reelDate : '');
    const [ description, setDescription ] = useState(reel.description ? reel.description : '');
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            const res = await client.getCategories();
            setCategories(res.rows);
            setLoading(false);
        }

        getCategories();
    }, []);


    const positionHandler = (value) => {
        if(value < 0) {
            return
        }

        setPosition(value);
    }

    const submitReelUpdate = async () => {
        if(category === '' ||
            url === '' ||
            title === '') {
            return
        }
        
        const data = {
            id: reel.id,
            categoryId: category,
            title,
            description,
            company,
            companyUrl,
            url,
            reelDate,
            position: position ? parseInt(position) : 0
        }

        await client.updateYoutubeReel(data);
        await completeUpdate();
    }

    const deleteHandler = () => {
        setShowDeleteModal(true);
    }

    const deleteReel = async () => {
        await client.deleteReel({ id: reel.id });
        window.location.href = '/reels';
    }

    return (
        <>
            <AdminModal 
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                title={'Delete Reel'}
                message={'Are you sure you want to delete this reel forever?'} 
                action={deleteReel} 
                actionText={'Delete'}
            />
            {loading ?
             <Spinner />
            :
                <>
                    <MainTitle>Update Reel</MainTitle>
                            <UpdateReelContainer>
                                <UpdateReelInput type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                                <UpdateReelTextarea rows="5" cols="50" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                            </UpdateReelContainer>
                    <UpdateReelDataContainer>
                        <ContactInfoContainer>
                            <UpdateReelInput type='number' value={position} onChange={(e) => positionHandler(e.target.value)} placeholder='Position' />
                            <UpdateReelInput type='text' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Company' />
                            <UpdateReelInput type='text' value={companyUrl} onChange={(e) => setCompanyUrl(e.target.value)} placeholder='Company URL' />
                        </ContactInfoContainer>
                        <ContactInfoContainer>
                            <UpdateReelSelect name='reelType' onChange={(e) => setCategory(e.target.value)} defaultValue={reel.Category.id}>
                                {categories.map((item, index) => (
                                    <UpdateReelOption key={index} value={item.id}>{item.name}</UpdateReelOption>
                                ))}
                            </UpdateReelSelect>
                            <UpdateReelInput type='date' value={reelDate} onChange={(e) => setReelDate(e.target.value)} />
                            <UpdateReelInput type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Reel URL' />
                        </ContactInfoContainer>
                    </UpdateReelDataContainer>
                    
                    <ButtonContainer>
                        <Button onClick={async () => await completeUpdate()}>Cancel</Button>
                        <Button onClick={() => submitReelUpdate()}>Update</Button>
                    </ButtonContainer>
                    <DeleteReelButton color='red' onClick={() => deleteHandler()}>DELETE</DeleteReelButton>
                </>
            }
        </>
    )
}

export default UpdateReel;