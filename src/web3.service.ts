import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract'
import { getBalanceABI } from './abis/getBalanceAbi';

@Injectable()
export class Web3Service {
    web3: Web3;
      
    contract: Contract;
      
    constructor(private configService: ConfigService) {
        this.web3 = new Web3(configService.get('nodeProvider'));
        this.contract = new this.web3.eth.Contract(getBalanceABI, configService.get('tokenAddress'));
    }

    async getBalance(accAddress: string) {
        const result = await this.contract.methods.balanceOf(accAddress).call();
        const balance = this.web3.utils.fromWei(result);
        return balance;
    }
}
