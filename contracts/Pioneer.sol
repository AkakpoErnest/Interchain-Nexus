// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title Pioneer
 * @dev NFT contract for Interchain Nexus Pioneer cards
 * @notice Each Pioneer represents a different blockchain ecosystem
 */
contract Pioneer is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Pioneer types mapping
    enum PioneerType {
        SOCIAL_ARCHITECT,    // Base - Builder of Worlds
        IDENTITY_GUARDIAN,   // ENS - Keeper of Names  
        DATA_WEAVER,         // Filecoin - Archivist of the Nexus
        ORACLE_SEER          // Flare - Truth Seeker of the Cosmos
    }
    
    // Pioneer metadata
    struct PioneerData {
        PioneerType pioneerType;
        string name;
        string title;
        string realm;
        string rarity;
        uint256 mintedAt;
        bool isActive;
    }
    
    // Mapping from token ID to pioneer data
    mapping(uint256 => PioneerData) public pioneers;
    
    // Mapping from address to their pioneer token ID
    mapping(address => uint256) public playerPioneers;
    
    // Pioneer type configurations
    mapping(PioneerType => string) public pioneerNames;
    mapping(PioneerType => string) public pioneerTitles;
    mapping(PioneerType => string) public pioneerRealms;
    mapping(PioneerType => string) public pioneerRarities;
    
    // Base URI for metadata
    string private _baseTokenURI;
    
    // Events
    event PioneerMinted(
        address indexed player,
        uint256 indexed tokenId,
        PioneerType pioneerType,
        string name
    );
    
    event PioneerActivated(uint256 indexed tokenId, address indexed player);
    
    constructor() ERC721("Interchain Nexus Pioneers", "INP") {
        _initializePioneerTypes();
    }
    
    /**
     * @dev Initialize pioneer type configurations
     */
    function _initializePioneerTypes() private {
        // Social Architect (Base)
        pioneerNames[PioneerType.SOCIAL_ARCHITECT] = "The Social Architect";
        pioneerTitles[PioneerType.SOCIAL_ARCHITECT] = "Builder of Worlds";
        pioneerRealms[PioneerType.SOCIAL_ARCHITECT] = "Base";
        pioneerRarities[PioneerType.SOCIAL_ARCHITECT] = "Epic";
        
        // Identity Guardian (ENS)
        pioneerNames[PioneerType.IDENTITY_GUARDIAN] = "The Identity Guardian";
        pioneerTitles[PioneerType.IDENTITY_GUARDIAN] = "Keeper of Names";
        pioneerRealms[PioneerType.IDENTITY_GUARDIAN] = "ENS";
        pioneerRarities[PioneerType.IDENTITY_GUARDIAN] = "Epic";
        
        // Data Weaver (Filecoin)
        pioneerNames[PioneerType.DATA_WEAVER] = "The Data Weaver";
        pioneerTitles[PioneerType.DATA_WEAVER] = "Archivist of the Nexus";
        pioneerRealms[PioneerType.DATA_WEAVER] = "Filecoin";
        pioneerRarities[PioneerType.DATA_WEAVER] = "Epic";
        
        // Oracle Seer (Flare)
        pioneerNames[PioneerType.ORACLE_SEER] = "The Oracle Seer";
        pioneerTitles[PioneerType.ORACLE_SEER] = "Truth Seeker of the Cosmos";
        pioneerRealms[PioneerType.ORACLE_SEER] = "Flare";
        pioneerRarities[PioneerType.ORACLE_SEER] = "Epic";
    }
    
    /**
     * @dev Mint a pioneer NFT for the player
     * @param pioneerType The type of pioneer to mint
     * @param player The address of the player
     */
    function mintPioneer(PioneerType pioneerType, address player) 
        external 
        onlyOwner 
        nonReentrant 
    {
        require(player != address(0), "Invalid player address");
        require(playerPioneers[player] == 0, "Player already has a pioneer");
        
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        
        // Create pioneer data
        PioneerData memory pioneerData = PioneerData({
            pioneerType: pioneerType,
            name: pioneerNames[pioneerType],
            title: pioneerTitles[pioneerType],
            realm: pioneerRealms[pioneerType],
            rarity: pioneerRarities[pioneerType],
            mintedAt: block.timestamp,
            isActive: true
        });
        
        pioneers[tokenId] = pioneerData;
        playerPioneers[player] = tokenId;
        
        _safeMint(player, tokenId);
        
        emit PioneerMinted(player, tokenId, pioneerType, pioneerData.name);
    }
    
    /**
     * @dev Get pioneer data for a token ID
     * @param tokenId The token ID
     * @return PioneerData The pioneer data
     */
    function getPioneerData(uint256 tokenId) external view returns (PioneerData memory) {
        require(_exists(tokenId), "Token does not exist");
        return pioneers[tokenId];
    }
    
    /**
     * @dev Get player's pioneer token ID
     * @param player The player address
     * @return tokenId The pioneer token ID (0 if no pioneer)
     */
    function getPlayerPioneer(address player) external view returns (uint256) {
        return playerPioneers[player];
    }
    
    /**
     * @dev Check if player has a pioneer
     * @param player The player address
     * @return hasPioneer True if player has a pioneer
     */
    function hasPioneer(address player) external view returns (bool) {
        return playerPioneers[player] != 0;
    }
    
    /**
     * @dev Set base URI for metadata
     * @param baseURI The base URI
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    /**
     * @dev Get base URI
     * @return The base URI
     */
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    /**
     * @dev Get total supply
     * @return The total number of minted tokens
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Override transfer to prevent trading (soulbound-like)
     * @param from The sender address
     * @param to The recipient address
     * @param tokenId The token ID
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        // Allow minting and burning, but prevent transfers
        require(from == address(0) || to == address(0), "Pioneer NFTs are not transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
    /**
     * @dev Emergency function to deactivate a pioneer
     * @param tokenId The token ID to deactivate
     */
    function deactivatePioneer(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        pioneers[tokenId].isActive = false;
    }
}
