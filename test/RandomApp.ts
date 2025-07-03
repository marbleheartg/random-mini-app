import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { isAddress } from "viem";

describe("RandomApp", function () {
  async function fixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const randomapp = await hre.viem.deployContract("RandomApp", [
      "0x3157497b82eC91A234f11Ee44553D2a303e8d59e",
    ]);
    const publicClient = await hre.viem.getPublicClient();
    return { randomapp, owner, otherAccount, publicClient };
  }

  describe("", function () {
    it("", async function () {
      const { randomapp } = await loadFixture(fixture);

      expect(isAddress(randomapp.address));
    });
  });
});
