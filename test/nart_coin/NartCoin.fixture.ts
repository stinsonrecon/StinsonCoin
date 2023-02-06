import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

import type { NartCoin } from "../../types/NartCoin";
import type { NartCoin__factory } from "../../types/factories/NartCoin__factory";

export async function deployNartCoinFixture(): Promise<{ nartCoin : NartCoin }> {
    const signers : SignerWithAddress[] = await ethers.getSigners();
    const admin : SignerWithAddress = signers[0];

    const nartFactory : NartCoin__factory = <NartCoin__factory> await ethers.getContractFactory("NartCoin");
    const nartCoin : NartCoin = <NartCoin> await nartFactory.connect(admin).deploy();
    await nartCoin.deployed();

    return { nartCoin };
}