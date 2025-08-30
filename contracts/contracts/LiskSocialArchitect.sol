// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title LiskSocialArchitect
 * @dev Social Architect NFT contract for Lisk network
 * Provides community building and social protocol features
 */
contract LiskSocialArchitect is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // Maximum supply of Social Architect NFTs
    uint256 public constant MAX_SUPPLY = 10000;
    
    // Social Architect specific data
    struct SocialArchitectData {
        string name;
        string title;
        string realm;
        string rarity;
        uint256 mintedAt;
        bool isActive;
        uint256 communityScore;    // Community building score
        uint256 protocolsBuilt;    // Number of protocols built
        uint256 connectionsMade;   // Number of connections made
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
    event ProtocolBuilt(address indexed player, uint256 indexed tokenId, string protocolName, uint256 complexity);
    event ConnectionMade(address indexed player, uint256 indexed tokenId, address connectedPlayer);
    event CommunityScoreUpdated(address indexed player, uint256 indexed tokenId, uint256 newScore);
    
    constructor() ERC721("Lisk Social Architect", "SOCIAL") {
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
        require(_tokenIds.current() < MAX_SUPPLY, "Maximum supply reached");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _socialArchitectData[newTokenId] = SocialArchitectData({
            name: name,
            title: title,
            realm: "Lisk",
            rarity: "Epic",
            mintedAt: block.timestamp,
            isActive: true,
            communityScore: 100, // Starting community score
            protocolsBuilt: 0,
            connectionsMade: 0
        });
        
        _playerSocialArchitect[player] = newTokenId;
        _hasSocialArchitect[player] = true;
        
        _safeMint(player, newTokenId);
        
        emit SocialArchitectMinted(player, newTokenId, name);
    }
    
    /**
     * @dev Build a protocol and update Social Architect stats
     * @param protocolName The name of the protocol being built
     * @param complexity The complexity level (1-10)
     */
    function buildProtocol(string memory protocolName, uint256 complexity) external {
        require(_hasSocialArchitect[msg.sender], "Player does not have Social Architect");
        require(complexity >= 1 && complexity <= 10, "Complexity must be between 1 and 10");
        
        uint256 tokenId = _playerSocialArchitect[msg.sender];
        SocialArchitectData storage architectData = _socialArchitectData[tokenId];
        
        require(architectData.isActive, "Social Architect is not active");
        
        architectData.protocolsBuilt++;
        
        // Update community score based on protocol complexity
        uint256 scoreIncrease = complexity * 5; // 5-50 points based on complexity
        architectData.communityScore += scoreIncrease;
        
        emit ProtocolBuilt(msg.sender, tokenId, protocolName, complexity);
        emit CommunityScoreUpdated(msg.sender, tokenId, architectData.communityScore);
    }
    
    /**
     * @dev Make a connection with another player
     * @param connectedPlayer The address of the player to connect with
     */
    function makeConnection(address connectedPlayer) external {
        require(_hasSocialArchitect[msg.sender], "Player does not have Social Architect");
        require(connectedPlayer != msg.sender, "Cannot connect to yourself");
        require(connectedPlayer != address(0), "Invalid connected player address");
        
        uint256 tokenId = _playerSocialArchitect[msg.sender];
        SocialArchitectData storage architectData = _socialArchitectData[tokenId];
        
        require(architectData.isActive, "Social Architect is not active");
        
        architectData.connectionsMade++;
        
        // Update community score for making connections
        architectData.communityScore += 10;
        
        emit ConnectionMade(msg.sender, tokenId, connectedPlayer);
        emit CommunityScoreUpdated(msg.sender, tokenId, architectData.communityScore);
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
     * @dev Get remaining supply
     */
    function remainingSupply() external view returns (uint256) {
        return MAX_SUPPLY - _tokenIds.current();
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
