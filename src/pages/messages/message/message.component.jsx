import {
    PiEnvelope,
    PiEnvelopeOpen
} from 'react-icons/pi';

import { formatDate } from '../../../tools/tools';

import {
    MessageIconContainer,
    MessageTableData
} from './message.style';

const Message = ({ message }) => (
    <>
        <MessageTableData>
            <MessageIconContainer>
                { message.status === 'new' ? 
                    <PiEnvelope /> 
                : 
                    <PiEnvelopeOpen /> 
                }
            </MessageIconContainer>
        </MessageTableData>
        <MessageTableData>{ message.replied ? 'Yes' : 'No' }</MessageTableData>
        <MessageTableData>{ `${message.firstName} ${message.lastName}` }</MessageTableData>
        <MessageTableData>{ formatDate(message.createdAt) }</MessageTableData>

    </>
);

export default Message;