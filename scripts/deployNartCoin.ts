import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { NartCoin } from "../types/NartCoin";
import type { NartCoin__factory } from "../types/factories/NartCoin__factory";

import { ethers } from "hardhat";

async function main() {
    const signers : SignerWithAddress[] = await ethers.getSigners();
    const admin = signers[0];
    const nartCoinFactory: NartCoin__factory = <NartCoin__factory> await ethers.getContractFactory("NartCoin");
    const nartCoin: NartCoin = <NartCoin> await nartCoinFactory.connect(admin).deploy();
    await nartCoin.deployed();
    console.log("Deploying contracts with the account:", admin.address);
    console.log("Account balance:", (await admin.getBalance()).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });