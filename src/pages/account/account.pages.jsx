import AccountDetails from '../../components/account/account-details/account-details.component';

import {
    AccountPageContainer
} from './account.styles';

const AccountPage = () => {

    return (
        <AccountPageContainer>
            <AccountDetails />
        </AccountPageContainer>
        
    );
};

export default AccountPage;