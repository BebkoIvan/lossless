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
  async sign(@Args('pk') pk: string, @Args('message') message: string ) {
    return this.web3.signMsg(message, pk)?.signature;
  }

  @Mutation(returns => Boolean)
  async checkSignature(@Args('signature') signature: string, @Args('message') message: string, @Args('address') address: string ) {
    return this.web3.verifySignature(message, address, signature);
  }
}