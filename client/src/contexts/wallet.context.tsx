import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { ethers } from 'ethers';

import groceryCoin from '../abi/GroceryCoinBep20.json';
import { GroceryCoinBep20 } from '../models/ethers-contracts';

interface Web3State {
  signer: ethers.providers.JsonRpcSigner;
  web3Provider: ethers.providers.Web3Provider;
  address: string;
  groceryCoinContract: GroceryCoinBep20;
}

const Web3Context = createContext<Web3State>({
  address: null,
  signer: null,
  web3Provider: null,
  groceryCoinContract: null,
});

const web3Reducer = (state: Web3State, action: any): Web3State => {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        address: action.address,
        signer: action.signer,
        web3Provider: action.web3Provider,
        groceryCoinContract: action.groceryCoinContract,
      };
  }
};

/**
 * @publicApi
 */
export const Web3ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [web3State, dispatchWeb3State] = useReducer(web3Reducer, {
    address: null,
    signer: null,
    web3Provider: null,
    groceryCoinContract: null,
  });
  useEffect(() => {
    const setup = async () => {
      try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const res = await web3Provider.send('eth_requestAccounts', []);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const groceryCoinContract = new ethers.Contract(groceryCoin.networks['5777'].address, groceryCoin.abi, signer);
        console.log(groceryCoinContract);
        dispatchWeb3State({
          type: 'SET_WEB3_PROVIDER',
          address,
          groceryCoinContract,
          signer,
          web3Provider,
        });
      } catch (error) {
        console.log(error);
      }
    };
    setup();
    return () => console.log('Cleanup..');
  }, []);

  return <Web3Context.Provider value={web3State}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);

  if (!context) {
    /**
     * {@link Web3ContextProvider}
     */
    throw new Error('useWeb3 must be used within a Web3ContextProvider');
  }

  return context;
};
