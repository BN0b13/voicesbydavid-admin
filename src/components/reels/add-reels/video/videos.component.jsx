import { useEffect, useState } from "react";

import AddVideo from "./addVideo/add-video.component";
import Spinner from '../../reusable/spinner/spinner.component';

import Client from '../../../tools/client';

import {
    MainContainer,
    VideosTable,
    VideosTableHeader,
    VideosTableHead,
    VideosTableBody,
    VideosTableRow,
    VideosTitle,
    VideosTableData
} from './videos.styles';

const client = new Client();

const Videos = () => {
    const [ loading, setLoading ] = useState(true);
    const [ videos, setVideos ] = useState('');

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        setLoading(true);
        const res = await client.getVideoReels();
        setVideos(res.rows);
        setLoading(false);
    }

    return (
        <MainContainer>
            <AddVideo getVideos={getVideos} />
            {loading ? 
                <Spinner />
            :
                videos ?
                    <VideosTable>
                        <VideosTableHeader>
                            <VideosTableRow>
                                <VideosTableHead>Position</VideosTableHead>
                                <VideosTableHead>Title</VideosTableHead>
                                <VideosTableHead>Active</VideosTableHead>
                            </VideosTableRow>
                        </VideosTableHeader>
                        <VideosTableBody>
                            {videos.map((video, index) => (
                                <VideosTableRow key={index} onClick={() => window.location.href = `/reels/videos/${video.id}`}>
                                    <VideosTableData>{video.position}</VideosTableData>
                                    <VideosTableData>{video.title ? video.title : 'No Title'}</VideosTableData>
                                    <VideosTableData>{video.active ? 'Yes' : 'No'}</VideosTableData>
                                </VideosTableRow>
                            ))}
                        </VideosTableBody>
                    </VideosTable>
                :
                    <VideosTitle>No Videos To Display</VideosTitle>
            }
        </MainContainer>
    )
}

export default Videos;