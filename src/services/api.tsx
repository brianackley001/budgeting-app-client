import { axiosInstance as api } from "../utils/axiosInstance";
import React from 'react';
//import { toast } from 'react-toastify';
import { PlaidLinkOnSuccessMetadata } from 'react-plaid-link';
import { useAppSelector } from "../hooks/storeHooks";
import { selectAccessToken, selectUid } from "../store/msalSlice";

export default () => {
  const accessToken = useAppSelector(selectAccessToken);
    // get link_token from your server when component mounts
    React.useEffect(() => {//
      const config = {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        method: 'POST'
      };
      api.options
      
    }, []);
};

const getLoginUser = (userId: string) =>
  api.post("/sessions", { userId });

// assets
export const addAsset = (userId: number, description: string, value: number) =>
  api.post('/assets', { userId, description, value });
export const getAssetsByUser = (userId: number) => api.get(`/assets/${userId}`);
export const deleteAssetByAssetId = (assetId: number) =>
  api.delete(`/assets/${assetId}`);

// users
export const getUsers = () => api.get('/users');
export const getUserById = (userId: number) => api.get(`/users/${userId}`);
export const addNewUser = (username: string) =>
  api.post('/users', { username });
export const deleteUserById = (userId: number) =>
  api.delete(`/users/${userId}`);

// items
export const getItemById = (id: number) => api.get(`/items/${id}`);
export const getItemsByUser = (userId: number) =>
  api.get(`/users/${userId}/items`);
export const deleteItemById = (id: number) => api.delete(`/items/${id}`);
export const setItemState = (itemId: number, status: string) =>
  api.put(`items/${itemId}`, { status });
// This endpoint is only availble in the sandbox enviornment
export const setItemToBadState = (itemId: number) =>
  api.post('/items/sandbox/item/reset_login', { itemId });

export const getLinkToken = (userId: number, itemId: number) =>
  api.post(`/link-token`, {
    userId,
    itemId,
  });

// accounts
export const getAccountsByItem = (itemId: number) =>
  api.get(`/items/${itemId}/accounts`);
export const getAccountsByUser = (userId: number) =>
  api.get(`/users/${userId}/accounts`);

// transactions
export const getTransactionsByAccount = (accountId: number) =>
  api.get(`/accounts/${accountId}/transactions`);
export const getTransactionsByItem = (itemId: number) =>
  api.get(`/items/${itemId}/transactions`);
export const getTransactionsByUser = (userId: number) =>
  api.get(`/users/${userId}/transactions`);

// institutions
export const getInstitutionById = (instId: string) =>
  api.get(`/institutions/${instId}`);
export { getLoginUser };


// misc
export const postLinkEvent = (event: any) => api.post(`/link-event`, event);

export const exchangeToken = async (
  publicToken: string,
  institution: any,
  accounts: PlaidLinkOnSuccessMetadata['accounts'],
  userId: number
) => {
  try {
    const { data } = await api.post('/items', {
      publicToken,
      institutionId: institution.institution_id,
      userId,
      accounts,
    });
    return data;
  } catch (err) {
    console.log(err);
    //const { response } = err;
    // if (response && response.status === 409) {
    //   toast.error(
    //     <DuplicateItemToastMessage institutionName={institution.name} />
    //   );
    // } else {
    //   toast.error(`Error linking ${institution.name}`);
    // }
  }
};
