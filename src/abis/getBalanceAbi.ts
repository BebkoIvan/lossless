
import { AbiItem } from 'web3-utils'

export const getBalanceABI: AbiItem[] = [{
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  }];