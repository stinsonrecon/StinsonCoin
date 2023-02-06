import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { Signers } from "../types";
import { shouldBehaveLikeNartCoin } from "./NartCoin.behavior";
import { deployNartCoinFixture } from "./NartCoin.fixture";

describe("NartCoin Unit tests", function () {
    before(async function () {
        this.signers = {} as Signers;

        const signers: SignerWithAddress[] = await ethers.getSigners();
        this.signers.admin = signers[0];

        this.loadFixture = loadFixture;
    });

    describe("NartCoin", function() {
        beforeEach(async function () {
            const { nartCoin } = await this.loadFixture(deployNartCoinFixture);
            this.nartCoin = nartCoin;
        });

        shouldBehaveLikeNartCoin();
    })
})