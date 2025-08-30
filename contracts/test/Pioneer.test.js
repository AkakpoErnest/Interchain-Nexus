const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Pioneer Contract", function () {
  let pioneer;
  let owner;
  let player1;
  let player2;

  beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners();
    
    const Pioneer = await ethers.getContractFactory("Pioneer");
    pioneer = await Pioneer.deploy();
    await pioneer.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await pioneer.name()).to.equal("Interchain Nexus Pioneers");
      expect(await pioneer.symbol()).to.equal("INP");
    });

    it("Should set the correct owner", async function () {
      expect(await pioneer.owner()).to.equal(owner.address);
    });

    it("Should initialize with zero total supply", async function () {
      expect(await pioneer.totalSupply()).to.equal(0);
    });
  });

  describe("Pioneer Types", function () {
    it("Should have correct pioneer type configurations", async function () {
      // Social Architect (Base)
      expect(await pioneer.pioneerNames(0)).to.equal("The Social Architect");
      expect(await pioneer.pioneerTitles(0)).to.equal("Builder of Worlds");
      expect(await pioneer.pioneerRealms(0)).to.equal("Base");
      expect(await pioneer.pioneerRarities(0)).to.equal("Epic");

      // Identity Guardian (ENS)
      expect(await pioneer.pioneerNames(1)).to.equal("The Identity Guardian");
      expect(await pioneer.pioneerTitles(1)).to.equal("Keeper of Names");
      expect(await pioneer.pioneerRealms(1)).to.equal("ENS");
      expect(await pioneer.pioneerRarities(1)).to.equal("Epic");

      // Data Weaver (Filecoin)
      expect(await pioneer.pioneerNames(2)).to.equal("The Data Weaver");
      expect(await pioneer.pioneerTitles(2)).to.equal("Archivist of the Nexus");
      expect(await pioneer.pioneerRealms(2)).to.equal("Filecoin");
      expect(await pioneer.pioneerRarities(2)).to.equal("Epic");

      // Oracle Seer (Flare)
      expect(await pioneer.pioneerNames(3)).to.equal("The Oracle Seer");
      expect(await pioneer.pioneerTitles(3)).to.equal("Truth Seeker of the Cosmos");
      expect(await pioneer.pioneerRealms(3)).to.equal("Flare");
      expect(await pioneer.pioneerRarities(3)).to.equal("Epic");
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint pioneer NFT", async function () {
      await expect(pioneer.mintPioneer(0, player1.address))
        .to.emit(pioneer, "PioneerMinted")
        .withArgs(player1.address, 1, 0, "The Social Architect");

      expect(await pioneer.totalSupply()).to.equal(1);
      expect(await pioneer.ownerOf(1)).to.equal(player1.address);
      expect(await pioneer.playerPioneers(player1.address)).to.equal(1);
      expect(await pioneer.hasPioneer(player1.address)).to.be.true;
    });

    it("Should prevent non-owner from minting", async function () {
      await expect(
        pioneer.connect(player1).mintPioneer(0, player1.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should prevent minting to zero address", async function () {
      await expect(
        pioneer.mintPioneer(0, ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid player address");
    });

    it("Should prevent player from having multiple pioneers", async function () {
      await pioneer.mintPioneer(0, player1.address);
      
      await expect(
        pioneer.mintPioneer(1, player1.address)
      ).to.be.revertedWith("Player already has a pioneer");
    });

    it("Should allow different players to have different pioneers", async function () {
      await pioneer.mintPioneer(0, player1.address);
      await pioneer.mintPioneer(1, player2.address);

      expect(await pioneer.totalSupply()).to.equal(2);
      expect(await pioneer.playerPioneers(player1.address)).to.equal(1);
      expect(await pioneer.playerPioneers(player2.address)).to.equal(2);
    });
  });

  describe("Pioneer Data", function () {
    beforeEach(async function () {
      await pioneer.mintPioneer(0, player1.address);
    });

    it("Should return correct pioneer data", async function () {
      const pioneerData = await pioneer.getPioneerData(1);
      
      expect(pioneerData.pioneerType).to.equal(0); // Social Architect
      expect(pioneerData.name).to.equal("The Social Architect");
      expect(pioneerData.title).to.equal("Builder of Worlds");
      expect(pioneerData.realm).to.equal("Base");
      expect(pioneerData.rarity).to.equal("Epic");
      expect(pioneerData.isActive).to.be.true;
      expect(pioneerData.mintedAt).to.be.gt(0);
    });

    it("Should revert when getting data for non-existent token", async function () {
      await expect(
        pioneer.getPioneerData(999)
      ).to.be.revertedWith("Token does not exist");
    });
  });

  describe("Base URI", function () {
    it("Should allow owner to set base URI", async function () {
      const newBaseURI = "https://api.interchainnexus.com/metadata/";
      await pioneer.setBaseURI(newBaseURI);
      
      // We can't directly test _baseURI() as it's internal, but we can verify it doesn't revert
      expect(await pioneer.totalSupply()).to.equal(0); // Just to ensure contract is still working
    });

    it("Should prevent non-owner from setting base URI", async function () {
      const newBaseURI = "https://api.interchainnexus.com/metadata/";
      
      await expect(
        pioneer.connect(player1).setBaseURI(newBaseURI)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Soulbound-like Behavior", function () {
    beforeEach(async function () {
      await pioneer.mintPioneer(0, player1.address);
    });

    it("Should prevent transfers between addresses", async function () {
      await expect(
        pioneer.connect(player1).transferFrom(player1.address, player2.address, 1)
      ).to.be.revertedWith("Pioneer NFTs are not transferable");
    });

    it("Should prevent safe transfers", async function () {
      await expect(
        pioneer.connect(player1)["safeTransferFrom(address,address,uint256)"](player1.address, player2.address, 1)
      ).to.be.revertedWith("Pioneer NFTs are not transferable");
    });
  });

  describe("Deactivation", function () {
    beforeEach(async function () {
      await pioneer.mintPioneer(0, player1.address);
    });

    it("Should allow owner to deactivate pioneer", async function () {
      await pioneer.deactivatePioneer(1);
      
      const pioneerData = await pioneer.getPioneerData(1);
      expect(pioneerData.isActive).to.be.false;
    });

    it("Should prevent non-owner from deactivating pioneer", async function () {
      await expect(
        pioneer.connect(player1).deactivatePioneer(1)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should revert when deactivating non-existent token", async function () {
      await expect(
        pioneer.deactivatePioneer(999)
      ).to.be.revertedWith("Token does not exist");
    });
  });
});
