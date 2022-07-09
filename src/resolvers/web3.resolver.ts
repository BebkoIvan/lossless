import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Web3Service } from "src/web3.service";

@Resolver()
export class Web3Resolver {

  constructor(private web3: Web3Service) {}

  @Query(() => String)
  async getBalance(@Args('address') address: string): Promise<string> {
    return await this.web3.getBalance(address);
  }

  @Mutation(returns => String)
  async checkSignature(@Args('message') message: string, @Args('address') address: string ) {
    return JSON.stringify({message, address});
  }
}