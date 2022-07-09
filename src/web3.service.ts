import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract'
import { getBalanceABI } from './abis/getBalanceAbi';


@Injectable()
export class Web3Service {
    web3: Web3;
      
    contractLSS: Contract;
      
    constructor(private configService: ConfigService) {
        this.web3 = new Web3(configService.get('nodeProvider'));
        this.contractLSS = new this.web3.eth.Contract(getBalanceABI, configService.get('tokenAddressLSS'));
    }

    async getBalance(accAddress: string) {
        const result = await this.contractLSS.methods.balanceOf(accAddress).call();
        const balance = this.web3.utils.fromWei(result);
        return balance;
    }

    signMsg(message: string, pk: string) {
        const res = this.web3.eth.accounts.sign(message, pk);
        return res;
    }

    verifySignature(message: string, address: string, signature: string) {
        const acc = this.web3.eth.accounts.recover(message, signature); 
        return acc.toLowerCase() === address.toLowerCase();
    }
}
