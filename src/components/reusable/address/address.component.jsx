import { useEffect, useState } from 'react';

import { states } from '../../../tools/states.js';

import {
    AddressBottomContainer,
    AddressCityInput,
    AddressContainer,
    AddressDropdown,
    AddressDropdownOption,
    AddressInput,
    AddressZipCodeInput,
    AddressTopContainer
} from './address.styles';

const Address = ({ address, updateAddress, customSelector = null }) => {
    const [ addressOne, setAddressOne ] = useState(address.addressOne);
    const [ addressTwo, setAddressTwo ] = useState(address.addressTwo);
    const [ city, setCity ] = useState(address.city);
    const [ state, setState ] = useState(address.state);
    const [ zipCode, setZipCode ] = useState(address.zipCode);
    const [ selector, setSelector ] = useState('address');

    useEffect(() => {
        if(!address.state) {
            updateAddress({ state: 'AL' });
        }
        if(customSelector) {
            setSelector(customSelector);
        }
    }, []);

    const handleAddressOne = (data) => {
        setAddressOne(data);
        updateAddress({ addressOne: data });
    }

    const handleAddressTwo = (data) => {
        setAddressTwo(data);
        updateAddress({ addressTwo: data });
    }

    const handleCity = (data) => {
        setCity(data);
        updateAddress({ city: data });
    }

    const handleState = (data) => {
        setState(data);
        updateAddress({ state: data });
    }

    const handleZipCode = (data) => {
        const reg = /^\d+$/;
        if(data === '' || (reg.test(data) && data.length <= 5)) {
            setZipCode(data);
            updateAddress({ zipCode: data });
        } else {
            return
        }
    }

    return (
        <AddressContainer>
            <AddressTopContainer>
                <AddressInput
                    type='text'
                    name={`${selector}One`}
                    value={addressOne}
                    onChange={(e) => handleAddressOne(e.target.value)}
                    placeholder={'Address Line One'}
                    required
                />
                <AddressInput
                    type='text'
                    name={`${selector}Two`}
                    value={addressTwo}
                    onChange={(e) => handleAddressTwo(e.target.value)}
                    placeholder={'Address Line Two'}
                />
            </AddressTopContainer>
            <AddressBottomContainer>
                <AddressCityInput
                    type='text'
                    name={`${selector}City`}
                    value={city}
                    onChange={(e) => handleCity(e.target.value)}
                    placeholder={'City'}
                />
                <AddressDropdown
                    name={`${selector}State`}
                    id={`${selector}State`}
                    value={state}
                    onChange={(e) => handleState(e.target.value)}
                    placeholder={'State'}
                >
                    <AddressDropdownOption key={0}  disabled value={''}> -- select an option -- </AddressDropdownOption>
                    {states.map((state, index) => 
                            <AddressDropdownOption
                                key={index + 1}
                                id={state.abbreviation}
                                value={state.abbreviation}
                            >
                                { state.abbreviation }
                            </AddressDropdownOption>
                    )}
                </AddressDropdown>
                <AddressZipCodeInput
                    type='text'
                    name={`${selector}ZipCode`}
                    value={zipCode}
                    onChange={(e) => handleZipCode(e.target.value)}
                    placeholder={'Zip Code'}
                />
            </AddressBottomContainer>
        </AddressContainer>
    )
}

export default Address;