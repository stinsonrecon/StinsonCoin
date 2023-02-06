import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { getAddress } from "ethers/lib/utils";

export function shouldBehaveLikeNartCoin() : void {
    it("should return smart contract owner", async function () {
        expect(await this.nartCoin.connect(this.signers.admin).owner()).to.equal("0x678b2d8A16b14ac185dA59d02D2a82AEe27d80C6");
    });

    it("should return smart contract name", async function() {
        expect(await this.nartCoin.connect(this.signers.admin).name()).to.equal("NartCoin");
    });

    it("should return smart contract symbol", async function () {
        expect(await this.nartCoin.connect(this.signers.admin).symbol()).to.equal("NC");
    });

    it("should return smart contract decimals", async function () {
        expect(await this.nartCoin.connect(this.signers.admin).decimals()).to.equal(9);
    });

    it("should return smart contract's total supply", async function () {
        expect(await this.nartCoin.connect(this.signers.admin).totalSupply()).to.equal(1000000000000n);
    });

    it("should return balance of owner wallet", async function () {
        expect(await this.nartCoin.connect(this.signers.admin).balanceOf(this.signers.admin.address)).to.equal(1000000000000n);
    });

    it("should transfer from owner wallet to customer wallet", async function () {
        const signers: SignerWithAddress[] = await ethers.getSigners();
        this.signers.admin = signers[0];
        this.signers.customer = signers[1];
        
        expect(await this.nartCoin.connect(this.signers.admin).balanceOf(this.signers.admin.address)).to.equal(1000000000000n);
        expect(await this.nartCoin.connect(this.signers.customer).balanceOf(this.signers.customer.address)).to.equal(0);

        await this.nartCoin.connect(this.signers.admin).transfer(this.signers.customer.address, 1);

        expect(await this.nartCoin.connect(this.signers.admin).balanceOf(this.signers.admin.address)).to.equal(999999999999n);
        expect(await this.nartCoin.connect(this.signers.customer).balanceOf(this.signers.customer.address)).to.equal(1);
    });

    it("should return allowance", async function () {
        expect(await this.nartCoin.connect(this.signers.admin).allowance(this.signers.admin.address, this.signers.admin.address)).to.equal(0);
    });

    it("should increase owner wallet's allowance", async function () {
        expect(await this.nartCoin.connect(this.signers.admin).allowance(this.signers.admin.address, this.signers.admin.address)).to.equal(0);

        await this.nartCoin.connect(this.signers.admin).increaseAllowance(this.signers.admin.address, 1);

        expect(await this.nartCoin.connect(this.signers.admin).allowance(this.signers.admin.address, this.signers.admin.address)).to.equal(1);
    });

    it("should transfer specific amount from sender to recipient", async function () {
        const signers: SignerWithAddress[] = await ethers.getSigners();
        this.signers.admin = signers[0];
        this.signers.customer = signers[1];

        expect(await this.nartCoin.connect(this.signers.admin).balanceOf(this.signers.admin.address)).to.equal(1000000000000n);
        expect(await this.nartCoin.connect(this.signers.customer).balanceOf(this.signers.customer.address)).to.equal(0);

        await this.nartCoin.connect(this.signers.admin).increaseAllowance(this.signers.admin.address, 1);
        await this.nartCoin.connect(this.signers.admin).transferFrom(this.signers.admin.address, this.signers.customer.address, 1);

        expect(await this.nartCoin.connect(this.signers.admin).balanceOf(this.signers.admin.address)).to.equal(999999999999n);
        expect(await this.nartCoin.connect(this.signers.customer).balanceOf(this.signers.customer.address)).to.equal(1);
    });

    it("should decrease allowance", async function () {
        await this.nartCoin.connect(this.signers.admin).increaseAllowance(this.signers.admin.address, 1);
        expect(await this.nartCoin.connect(this.signers.admin).allowance(this.signers.admin.address, this.signers.admin.address)).to.equal(1);

        await this.nartCoin.connect(this.signers.admin).decreaseAllowance(this.signers.admin.address, 1);
        expect(await this.nartCoin.connect(this.signers.admin).allowance(this.signers.admin.address, this.signers.admin.address)).to.equal(0);
    });

    it("should update max transaction amount", async function () {
        await this.nartCoin.connect(this.signers.admin).updateMaxTransactionAmount(1);
    });

    it("should update max wallet amount", async function () {
        await this.nartCoin.connect(this.signers.admin).updateMaxWalletAmount(5);
    });

    it("should withdraw Eth Pool", async function () {
        await this.nartCoin.connect(this.signers.admin).withdrawEthPool();
    });

    it("should renounce ownership", async function () {
        await this.nartCoin.connect(this.signers.admin).renounceOwnership();

        expect(await this.nartCoin.connect(this.signers.admin).owner()).to.equal("0x0000000000000000000000000000000000000000");
    });
}