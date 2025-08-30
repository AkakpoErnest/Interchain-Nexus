// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title ENSIdentityGuardian
 * @dev Identity Guardian NFT contract for ENS network
 * Provides identity management and naming functionality
 */
contract ENSIdentityGuardian is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // Identity Guardian specific data
    struct IdentityGuardianData {
        string name;
        string title;
        string realm;
        string rarity;
        uint256 mintedAt;
        bool isActive;
        uint256 domainsManaged;      // Number of ENS domains managed
        uint256 identitiesVerified;  // Number of identities verified
        uint256 attestationsIssued;  // Number of attestations issued
        uint256 trustScore;          // Overall trust and reputation score
    }
    
    // Mapping from token ID to Identity Guardian data
    mapping(uint256 => IdentityGuardianData) private _identityGuardianData;
    
    // Mapping from player address to token ID
    mapping(address => uint256) private _playerIdentityGuardian;
    
    // Mapping to check if player has Identity Guardian
    mapping(address => bool) private _hasIdentityGuardian;
    
    // Identity Guardian metadata
    string private _baseTokenURI;
    
    // Identity Guardian specific events
    event IdentityGuardianMinted(address indexed player, uint256 indexed tokenId, string name);
    event DomainManaged(address indexed player, uint256 indexed tokenId, string domainName, bool isActive);
    event IdentityVerified(address indexed player, uint256 indexed tokenId, address verifiedAddress, string identityType);
    event AttestationIssued(address indexed player, uint256 indexed tokenId, address attestedAddress, string attestationType);
    event TrustScoreUpdated(address indexed player, uint256 indexed tokenId, uint256 newScore);
    
    constructor() ERC721("ENS Identity Guardian", "GUARDIAN") {
        _baseTokenURI = "https://ipfs.io/ipfs/";
    }
    
    /**
     * @dev Mint Identity Guardian NFT for a player
     * @param player The address of the player
     * @param name The name of the Identity Guardian
     * @param title The title of the Identity Guardian
     */
    function mintIdentityGuardian(
        address player,
        string memory name,
        string memory title
    ) external onlyOwner nonReentrant {
        require(!_hasIdentityGuardian[player], "Player already has Identity Guardian");
        require(player != address(0), "Invalid player address");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _identityGuardianData[newTokenId] = IdentityGuardianData({
            name: name,
            title: title,
            realm: "ENS",
            rarity: "Rare",
            mintedAt: block.timestamp,
            isActive: true,
            domainsManaged: 0,
            identitiesVerified: 0,
            attestationsIssued: 0,
            trustScore: 100 // Starting trust score
        });
        
        _playerIdentityGuardian[player] = newTokenId;
        _hasIdentityGuardian[player] = true;
        
        _safeMint(player, newTokenId);
        
        emit IdentityGuardianMinted(player, newTokenId, name);
    }
    
    /**
     * @dev Manage an ENS domain and update Identity Guardian stats
     * @param domainName The name of the domain being managed
     * @param isActive Whether the domain is active
     */
    function manageDomain(string memory domainName, bool isActive) external {
        require(_hasIdentityGuardian[msg.sender], "Player does not have Identity Guardian");
        
        uint256 tokenId = _playerIdentityGuardian[msg.sender];
        IdentityGuardianData storage guardianData = _identityGuardianData[tokenId];
        
        require(guardianData.isActive, "Identity Guardian is not active");
        
        if (isActive) {
            guardianData.domainsManaged++;
            guardianData.trustScore += 25; // Increase score for managing domains
        }
        
        emit DomainManaged(msg.sender, tokenId, domainName, isActive);
        emit TrustScoreUpdated(msg.sender, tokenId, guardianData.trustScore);
    }
    
    /**
     * @dev Verify an identity and update Identity Guardian stats
     * @param verifiedAddress The address being verified
     * @param identityType The type of identity being verified
     */
    function verifyIdentity(address verifiedAddress, string memory identityType) external {
        require(_hasIdentityGuardian[msg.sender], "Player does not have Identity Guardian");
        require(verifiedAddress != address(0), "Invalid address");
        
        uint256 tokenId = _playerIdentityGuardian[msg.sender];
        IdentityGuardianData storage guardianData = _identityGuardianData[tokenId];
        
        require(guardianData.isActive, "Identity Guardian is not active");
        
        guardianData.identitiesVerified++;
        guardianData.trustScore += 50; // Increase score for each verification
        
        emit IdentityVerified(msg.sender, tokenId, verifiedAddress, identityType);
        emit TrustScoreUpdated(msg.sender, tokenId, guardianData.trustScore);
    }
    
    /**
     * @dev Issue an attestation and update Identity Guardian stats
     * @param attestedAddress The address being attested
     * @param attestationType The type of attestation being issued
     */
    function issueAttestation(address attestedAddress, string memory attestationType) external {
        require(_hasIdentityGuardian[msg.sender], "Player does not have Identity Guardian");
        require(attestedAddress != address(0), "Invalid address");
        
        uint256 tokenId = _playerIdentityGuardian[msg.sender];
        IdentityGuardianData storage guardianData = _identityGuardianData[tokenId];
        
        require(guardianData.isActive, "Identity Guardian is not active");
        
        guardianData.attestationsIssued++;
        guardianData.trustScore += 75; // Increase score for each attestation
        
        emit AttestationIssued(msg.sender, tokenId, attestedAddress, attestationType);
        emit TrustScoreUpdated(msg.sender, tokenId, guardianData.trustScore);
    }
    
    /**
     * @dev Get Identity Guardian data for a token ID
     */
    function getIdentityGuardianData(uint256 tokenId) external view returns (IdentityGuardianData memory) {
        require(_exists(tokenId), "Token does not exist");
        return _identityGuardianData[tokenId];
    }
    
    /**
     * @dev Get player's Identity Guardian token ID
     */
    function getPlayerIdentityGuardian(address player) external view returns (uint256) {
        require(_hasIdentityGuardian[player], "Player does not have Identity Guardian");
        return _playerIdentityGuardian[player];
    }
    
    /**
     * @dev Check if player has Identity Guardian
     */
    function hasIdentityGuardian(address player) external view returns (bool) {
        return _hasIdentityGuardian[player];
    }
    
    /**
     * @dev Get total supply of Identity Guardians
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIds.current();
    }
    
    /**
     * @dev Set base URI for metadata
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    /**
     * @dev Override _baseURI to return the base URI
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    /**
     * @dev Override _beforeTokenTransfer to make NFTs non-transferable (soulbound)
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        require(from == address(0) || to == address(0), "Identity Guardian NFTs are non-transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
    /**
     * @dev Deactivate Identity Guardian (emergency function)
     */
    function deactivateIdentityGuardian(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _identityGuardianData[tokenId].isActive = false;
    }
}
