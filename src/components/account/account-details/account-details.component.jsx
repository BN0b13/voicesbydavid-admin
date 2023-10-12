import React, { useEffect, useState } from 'react';

import Address from '../../reusable/address/address.component';
import Button from '../../reusable/button/button.component';
import Snackbar from '../../reusable/snackbar/snackbar.component';
import Spinner from '../../reusable/spinner/spinner.component';


import Client from '../../../tools/client';
import { setMobileView } from '../../../tools/mobileView';

import {
    AccountDetailsContainer,
    AccountDetailsTextContainer,
    AccountEditContainer,
    AccountDetailsSubtitle,
    AccountDetailsInlineTitle,
    AccountDetailsText,
    AccountDetailsTitle,
    AccountAddressContainer,
    AddressBottomContainer,
    AddressContainer,
    AccountDetailsInput,
    TextRowContainer,
    UpdateButtonContainer,
    UpdatePasswordLink
} from './account-details.styles';

const client = new Client();

const AccountDetails = () => {
    const [ loading, setLoading ] = useState(false);
    const [ showEdit, setShowEdit ] = useState(false);
    const [ user, setUser ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ address, setAddress ] = useState({});
    const [ input, setInput ] = useState('');
    const [ showMsg, setShowMsg ] = useState(false);
    const [ msgContent, setMsgContent ] = useState('');
    const [ msgType, setMsgType ] = useState('error');

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        const res = await client.getUser();
        setUser(res);
        setEmail(res.email);
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setPhone(res.phone);
        setAddress(res.address);
    }

    const handlePhoneChange = (data) => {
        const reg = /^\d+$/;
        if(data === '' || (reg.test(data) && data.length <= 10)) {
            setPhone(data);
        } else {
            return
        }
    }

    const updateAddress = (data) => {
        setAddress({
            ...address,
            ...data
        });
    }

    const checkFields = () => {
        if(firstName === '' || 
            lastName === '' || 
            phone === '' ||
            phone.length < 10 ||
            address.addressOne  === '' ||
            address.city  === '' ||
            address.zipCode  === '') {
                setMsgContent('Please fill out all fields to update your account.');
                setMsgType('error');
                setShowMsg(true);
                return false;
        }
        return true;
    }

    const updateUserDetails = async () => {
        if(!checkFields()) {
            return
        }
        const data = {
            firstName,
            lastName,
            phone,
            address
        };

        await client.updateAccount(data);

        await getUser();
        setShowEdit(false);
    }

    return (
        <>
            {loading ?
                <Spinner />
                :
                showEdit ?
                    <AccountEditContainer>
                        <AccountDetailsTitle>
                            Update Account
                        </AccountDetailsTitle>
                        <AccountDetailsInput type={'text'} name={'firstName'} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={'First Name'} />
                        <AccountDetailsInput type={'text'} name={'lastName'} value={lastName} onChange={(e) => setLastName(e.target.value)}  placeholder={'Last Name'} />
                        <AccountDetailsInput type={'text'} name={'phone'} value={phone} onChange={(e) => handlePhoneChange(e.target.value)} maxLength={12}  placeholder={'Phone'} />
                        <AccountAddressContainer setMobileView={setMobileView()}>
                            <AddressContainer setMobileView={setMobileView()}>
                                <AccountDetailsSubtitle>Address</AccountDetailsSubtitle>
                                <Address address={address} updateAddress={updateAddress} customSelector={'address'} />
                            </AddressContainer>
                        </AccountAddressContainer>
                        {showMsg &&
                            <Snackbar msg={msgContent} type={msgType} show={setShowMsg} />
                        }
                        <UpdateButtonContainer>
                            <Button onClick={() => setShowEdit(false)}>Cancel</Button>
                            <Button onClick={() => updateUserDetails()}>Update</Button>
                        </UpdateButtonContainer>
                        <UpdatePasswordLink onClick={() => window.location.href ='/configuration/update-password'}>Update Password</UpdatePasswordLink>
                    </AccountEditContainer>
                :
                    <AccountDetailsContainer>
                        <AccountDetailsTitle>
                            Account Details
                        </AccountDetailsTitle>
                        <AccountDetailsTextContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>Email: </AccountDetailsInlineTitle>
                                <AccountDetailsText id='accountEmail'>{ email }</AccountDetailsText>
                            </TextRowContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>First Name: </AccountDetailsInlineTitle>
                                <AccountDetailsText id='accountFirstName'>{ firstName }</AccountDetailsText>
                            </TextRowContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>Last Name:</AccountDetailsInlineTitle>
                                <AccountDetailsText id='accountLastName'>{ lastName }</AccountDetailsText>
                            </TextRowContainer>
                            <TextRowContainer>
                                <AccountDetailsInlineTitle>Phone:</AccountDetailsInlineTitle>
                                <AccountDetailsText id='accountPhone'>{ phone }</AccountDetailsText>
                            </TextRowContainer>
                            <AccountDetailsSubtitle>Address:</AccountDetailsSubtitle>
                            <AccountDetailsText id='addressOne'>{ address.addressOne }</AccountDetailsText>
                            {address.addressTwo &&
                                <AccountDetailsText id='addressTwo'>{ address.addressTwo }</AccountDetailsText>
                            }
                            <AddressBottomContainer>
                                <AccountDetailsText id='addressCity'>{ address.city }, </AccountDetailsText>
                                <AccountDetailsText id='addressState'>{ address.state } </AccountDetailsText>
                                <AccountDetailsText id='addressZipCode'>{ address.zipCode }</AccountDetailsText>
                            </AddressBottomContainer>
                        </AccountDetailsTextContainer>
                        <UpdateButtonContainer>
                            <Button onClick={() => setShowEdit(true)}>Update Account</Button>
                        </UpdateButtonContainer>
                    </AccountDetailsContainer>
                
            }
        </>
    );
}

export default AccountDetails;