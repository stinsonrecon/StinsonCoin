import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { TaskArguments } from "hardhat/types";
import type { NartCoin } from "../../types/NartCoin";
import type { NartCoin__factory } from "../../types/factories/NartCoin__factory";

import { task } from "hardhat/config";

task("deploy:NartCoin")
    .setAction(async function (taskArguments:TaskArguments, { ethers }) {
        const signers : SignerWithAddress[] = await ethers.getSigners();
        const nartCoinFactory: NartCoin__factory = <NartCoin__factory> await ethers.getContractFactory("NartCoin");
        const nartCoin: NartCoin = <NartCoin> await nartCoinFactory.connect(signers[0]).deploy();
        await nartCoin.deployed();
        console.log("NartCoin deployed to: ", nartCoin.address); 
    });
