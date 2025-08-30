// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title BaseSocialArchitect
 * @dev Social Architect NFT contract for Base network
 * Provides social features and community building functionality
 */
contract BaseSocialArchitect is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // Social Architect specific data
    struct SocialArchitectData {
        string name;
        string title;
        string realm;
        string rarity;
        uint256 mintedAt;
        bool isActive;
        uint256 communitiesBuilt;    // Number of communities created
        uint256 socialConnections;   // Number of social connections made
        uint256 dAppsIntegrated;     // Number of dApps integrated
        uint256 socialScore;         // Overall social impact score
    }
    
    // Mapping from token ID to Social Architect data
    mapping(uint256 => SocialArchitectData) private _socialArchitectData;
    
    // Mapping from player address to token ID
    mapping(address => uint256) private _playerSocialArchitect;
    
    // Mapping to check if player has Social Architect
    mapping(address => bool) private _hasSocialArchitect;
    
    // Social Architect metadata
    string private _baseTokenURI;
    
    // Social Architect specific events
    event SocialArchitectMinted(address indexed player, uint256 indexed tokenId, string name);
    event CommunityBuilt(address indexed player, uint256 indexed tokenId, string communityName, uint256 memberCount);
    event SocialConnectionMade(address indexed player, uint256 indexed tokenId, address connectedPlayer);
    event DAppIntegrated(address indexed player, uint256 indexed tokenId, string dAppName);
    event SocialScoreUpdated(address indexed player, uint256 indexed tokenId, uint256 newScore);
    
    constructor() ERC721("Base Social Architect", "SOCIAL") {
        _baseTokenURI = "https://ipfs.io/ipfs/";
    }
    
    /**
     * @dev Mint Social Architect NFT for a player
     * @param player The address of the player
     * @param name The name of the Social Architect
     * @param title The title of the Social Architect
     */
    function mintSocialArchitect(
        address player,
        string memory name,
        string memory title
    ) external onlyOwner nonReentrant {
        require(!_hasSocialArchitect[player], "Player already has Social Architect");
        require(player != address(0), "Invalid player address");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _socialArchitectData[newTokenId] = SocialArchitectData({
            name: name,
            title: title,
            realm: "Base",
            rarity: "Common",
            mintedAt: block.timestamp,
            isActive: true,
            communitiesBuilt: 0,
            socialConnections: 0,
            dAppsIntegrated: 0,
            socialScore: 100 // Starting social score
        });
        
        _playerSocialArchitect[player] = newTokenId;
        _hasSocialArchitect[player] = true;
        
        _safeMint(player, newTokenId);
        
        emit SocialArchitectMinted(player, newTokenId, name);
    }
    
    /**
     * @dev Build a community and update Social Architect stats
     * @param communityName The name of the community being built
     * @param memberCount The initial number of members
     */
    function buildCommunity(string memory communityName, uint256 memberCount) external {
        require(_hasSocialArchitect[msg.sender], "Player does not have Social Architect");
        
        uint256 tokenId = _playerSocialArchitect[msg.sender];
        SocialArchitectData storage architectData = _socialArchitectData[tokenId];
        
        require(architectData.isActive, "Social Architect is not active");
        
        architectData.communitiesBuilt++;
        architectData.socialScore += memberCount * 10; // Increase score based on community size
        
        emit CommunityBuilt(msg.sender, tokenId, communityName, memberCount);
        emit SocialScoreUpdated(msg.sender, tokenId, architectData.socialScore);
    }
    
    /**
     * @dev Make a social connection with another player
     * @param connectedPlayer The address of the player being connected to
     */
    function makeSocialConnection(address connectedPlayer) external {
        require(_hasSocialArchitect[msg.sender], "Player does not have Social Architect");
        require(connectedPlayer != msg.sender, "Cannot connect to yourself");
        require(connectedPlayer != address(0), "Invalid player address");
        
        uint256 tokenId = _playerSocialArchitect[msg.sender];
        SocialArchitectData storage architectData = _socialArchitectData[tokenId];
        
        require(architectData.isActive, "Social Architect is not active");
        
        architectData.socialConnections++;
        architectData.socialScore += 50; // Increase score for each connection
        
        emit SocialConnectionMade(msg.sender, tokenId, connectedPlayer);
        emit SocialScoreUpdated(msg.sender, tokenId, architectData.socialScore);
    }
    
    /**
     * @dev Integrate with a dApp and update Social Architect stats
     * @param dAppName The name of the dApp being integrated
     */
    function integrateDApp(string memory dAppName) external {
        require(_hasSocialArchitect[msg.sender], "Player does not have Social Architect");
        
        uint256 tokenId = _playerSocialArchitect[msg.sender];
        SocialArchitectData storage architectData = _socialArchitectData[tokenId];
        
        require(architectData.isActive, "Social Architect is not active");
        
        architectData.dAppsIntegrated++;
        architectData.socialScore += 100; // Increase score for each dApp integration
        
        emit DAppIntegrated(msg.sender, tokenId, dAppName);
        emit SocialScoreUpdated(msg.sender, tokenId, architectData.socialScore);
    }
    
    /**
     * @dev Get Social Architect data for a token ID
     */
    function getSocialArchitectData(uint256 tokenId) external view returns (SocialArchitectData memory) {
        require(_exists(tokenId), "Token does not exist");
        return _socialArchitectData[tokenId];
    }
    
    /**
     * @dev Get player's Social Architect token ID
     */
    function getPlayerSocialArchitect(address player) external view returns (uint256) {
        require(_hasSocialArchitect[player], "Player does not have Social Architect");
        return _playerSocialArchitect[player];
    }
    
    /**
     * @dev Check if player has Social Architect
     */
    function hasSocialArchitect(address player) external view returns (bool) {
        return _hasSocialArchitect[player];
    }
    
    /**
     * @dev Get total supply of Social Architects
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
        require(from == address(0) || to == address(0), "Social Architect NFTs are non-transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
    /**
     * @dev Deactivate Social Architect (emergency function)
     */
    function deactivateSocialArchitect(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _socialArchitectData[tokenId].isActive = false;
    }
}
