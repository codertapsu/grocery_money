import { useWeb3 } from '../contexts/wallet.context';
import { BigNumber, ethers } from 'ethers';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

const Demo = () => {
  const { address: ownerAddress, groceryCoinContract, signer, web3Provider } = useWeb3();
  const [cap, setCap] = useState<string>();
  const [decimals, setDecimals] = useState<number>();
  const [name, setName] = useState<string>();
  const [owner, setOwner] = useState<string>();
  const [symbol, setSymbol] = useState<string>();
  const [balance, setBalance] = useState<string>();
  const [totalSupply, setTotalSupply] = useState<string>();

  const issueTokenInputRef = useRef<HTMLInputElement>(null);
  const burnTokenInputRef = useRef<HTMLInputElement>(null);
  const transferInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const allowanceInputRef = useRef<HTMLInputElement>(null);

  // const sendEth = useCallback(async () => {
  //   const address = addressInputRef.current.value;
  //   const amount = amountInputRef.current.value;
  //   const balance = await web3Provider.getBalance(address);
  //   const tx = {
  //     to: address,
  //     value: ethers.utils.parseEther(amount),
  //   };
  //   try {
  //     const transaction = await signer.sendTransaction(tx);
  //     const res = await transaction.wait();
  //     console.log(res);
  //   } catch (err) {
  //     console.error(JSON.stringify(err));
  //   }
  // }, [signer, web3Provider]);

  // const sendToken = useCallback(async () => {
  //   let receiver = addressInputRef.current.value;
  //   try {
  //     receiver = ethers.utils.getAddress(receiver);
  //   } catch {
  //     console.log(`Invalid address: ${receiver}`);
  //   }

  //   let amount: BigNumber;
  //   try {
  //     amount = ethers.utils.parseUnits(amountInputRef.current.value, 6);
  //     if (amount.isNegative()) {
  //       throw new Error();
  //     }
  //   } catch {
  //     console.error(`Invalid amount: ${amount}`);
  //   }

  //   const balance = await groceryCoinContract.methods.balanceOf(userAddress).call();
  //   console.log(balance);

  //   // if (balance.lt(amount)) {
  //   //   let amountFormatted = ethers.utils.formatUnits(amount, 6);
  //   //   let balanceFormatted = ethers.utils.formatUnits(balance, 6);
  //   //   console.error(`Insufficient balance receiver send ${amountFormatted} (You have ${balanceFormatted})`);
  //   // }
  //   // let amountFormatted = ethers.utils.formatUnits(amount, 6);

  //   // console.log(`Transferring ${amountFormatted} USDC receiver ${receiver}...`);
  //   // const tx = await groceryCoinContract.transfer(receiver, amount, { gasPrice: 20e9 });
  //   // console.log(`Transaction hash: ${tx.hash}`);
  //   // const receipt = await tx.wait();
  //   // console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
  // }, []);

  const getCap = useCallback(async () => {
    const cap = await groceryCoinContract.cap();
    setCap(ethers.utils.formatEther(cap));
  }, [groceryCoinContract]);

  const getDecimals = useCallback(async () => {
    const decimals = await groceryCoinContract.decimals();
    setDecimals(decimals);
  }, [groceryCoinContract]);

  const getName = useCallback(async () => {
    const name = await groceryCoinContract.name();
    setName(name);
  }, [groceryCoinContract]);

  const getOwner = useCallback(async () => {
    const owner = await groceryCoinContract.owner();
    setOwner(owner);
  }, [groceryCoinContract]);

  const getSymbol = useCallback(async () => {
    const symbol = await groceryCoinContract.symbol();
    setSymbol(symbol);
  }, [groceryCoinContract]);

  const getTotalSupply = useCallback(async () => {
    const totalSupply = await groceryCoinContract.totalSupply();
    setTotalSupply(ethers.utils.formatEther(totalSupply));
  }, [groceryCoinContract]);

  const issueToken = useCallback(async () => {
    const amount = String(issueTokenInputRef.current.value);
    const tx = await groceryCoinContract.issueToken(ethers.utils.parseEther(amount));
    console.log(tx);
  }, [groceryCoinContract]);

  // const allowanceToken = useCallback(async () => {
  //   console.log(ownerAddress);
    
  //   const tx = await groceryCoinContract.allowance(ownerAddress, String(addressInputRef.current.value));
  //   console.log(tx.toString());
  // }, [groceryCoinContract, ownerAddress]);

  const burnToken = useCallback(async () => {
    const amount = String(burnTokenInputRef.current.value);
    const tx = await groceryCoinContract.burn(ethers.utils.parseEther(amount));
    console.log(tx);
  }, [groceryCoinContract]);

  const burnTokenFrom = useCallback(async () => {
    const amount = String(burnTokenInputRef.current.value);
    const tx = await groceryCoinContract.burnFrom(String(addressInputRef.current.value), ethers.utils.parseEther(amount));
    console.log(tx);
  }, [groceryCoinContract]);

  const transferToken = useCallback(async () => {
    const amount = String(transferInputRef.current.value);
    const tx = await groceryCoinContract.transfer(String(addressInputRef.current.value), ethers.utils.parseEther(amount));
    console.log(tx);
  }, [groceryCoinContract]);

  const getBalance = useCallback(async () => {
    const balance = await groceryCoinContract.balanceOf(String(addressInputRef.current.value));
    setBalance(ethers.utils.formatEther(balance));
  }, [groceryCoinContract]);

  return (
    <div>
      <div className='cap'>
        <button type='button' onClick={getCap}>
          Cap
        </button>
        <div>uint256: {cap}</div>
      </div>
      <div className='decimals'>
        <button type='button' onClick={getDecimals}>
          Decimals
        </button>
        <div>uint8: {decimals}</div>
      </div>
      <div className='name'>
        <button type='button' onClick={getName}>
          Name
        </button>
        <div>string: {name}</div>
      </div>
      <div className='owner'>
        <button type='button' onClick={getOwner}>
          Owner
        </button>
        <div>address: {owner}</div>
      </div>
      <div className='symbol'>
        <button type='button' onClick={getSymbol}>
          Symbol
        </button>
        <div>string: {symbol}</div>
      </div>
      <div className='totalSupply'>
        <button type='button' onClick={getTotalSupply}>
          Total supply
        </button>
        <div>uint256: {totalSupply}</div>
      </div>
      <div className='issueToken'>
        <button type='button' onClick={issueToken}>
          Issue token
        </button>
        <label>
          <span>Amount: </span>
          <input ref={issueTokenInputRef} type='number' />
        </label>
      </div>
      <div className='transfer'>
        <button type='button' onClick={transferToken}>
          Transfer token
        </button>
        <label>
          <span>Amount: </span>
          <input ref={transferInputRef} type='number' />
        </label>
      </div>
      <div className='burnToken'>
        <div>
          <button type='button' onClick={burnToken}>
            Burn token
          </button>
          <button type='button' onClick={burnTokenFrom}>
            Burn token from address below:
          </button>
        </div>
        <label>
          <span>Amount: </span>
          <input ref={burnTokenInputRef} type='number' />
        </label>
      </div>
      <div className='balanceOf'>
        <button type='button' onClick={getBalance}>
          Balance of: 
        </button>
        <div>uint256: {balance}</div>
      </div>
      <div></div>
      <hr />
      <div>
        <label>
          <span>Target address: </span>
          <input ref={addressInputRef} type='string' />
        </label>
      </div>
    </div>
  );
};

export { Demo };
