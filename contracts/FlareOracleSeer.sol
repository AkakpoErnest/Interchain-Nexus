// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title FlareOracleSeer
 * @dev Oracle Seer NFT contract for Flare network
 * Provides oracle-related functionality and data verification features
 */
contract FlareOracleSeer is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // No maximum supply limit - infinite minting allowed
    
    // Oracle Seer specific data
    struct OracleSeerData {
        string name;
        string title;
        string realm;
        string rarity;
        uint256 mintedAt;
        bool isActive;
        uint256 oracleAccuracy; // Oracle prediction accuracy score
        uint256 dataVerified;   // Number of data points verified
        uint256 predictionsMade; // Number of predictions made
    }
    
    // Mapping from token ID to Oracle Seer data
    mapping(uint256 => OracleSeerData) private _oracleSeerData;
    
    // Mapping from player address to token ID
    mapping(address => uint256) private _playerOracleSeer;
    
    // Mapping to check if player has Oracle Seer
    mapping(address => bool) private _hasOracleSeer;
    
    // Oracle Seer metadata
    string private _baseTokenURI;
    
    // Oracle Seer specific events
    event OracleSeerMinted(address indexed player, uint256 indexed tokenId, string name);
    event DataVerified(address indexed player, uint256 indexed tokenId, string dataType, bool accuracy);
    event PredictionMade(address indexed player, uint256 indexed tokenId, string prediction, uint256 confidence);
    event OracleAccuracyUpdated(address indexed player, uint256 indexed tokenId, uint256 newAccuracy);
    
    constructor() ERC721("Flare Oracle Seer", "ORACLE") {
        _baseTokenURI = "https://ipfs.io/ipfs/";
    }
    
    /**
     * @dev Mint Oracle Seer NFT for a player
     * @param player The address of the player
     * @param name The name of the Oracle Seer
     * @param title The title of the Oracle Seer
     */
    function mintOracleSeer(
        address player,
        string memory name,
        string memory title
    ) external nonReentrant {
        require(!_hasOracleSeer[player], "Player already has Oracle Seer");
        require(player != address(0), "Invalid player address");
        // No supply limit - infinite minting allowed
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _oracleSeerData[newTokenId] = OracleSeerData({
            name: name,
            title: title,
            realm: "Flare",
            rarity: "Legendary",
            mintedAt: block.timestamp,
            isActive: true,
            oracleAccuracy: 100, // Starting accuracy
            dataVerified: 0,
            predictionsMade: 0
        });
        
        _playerOracleSeer[player] = newTokenId;
        _hasOracleSeer[player] = true;
        
        _safeMint(player, newTokenId);
        
        emit OracleSeerMinted(player, newTokenId, name);
    }
    
    /**
     * @dev Public minting function for users to mint their own Oracle Seer
     * @param pioneerType The type of pioneer (for compatibility with frontend)
     * @param playerAddress The address of the player minting the NFT
     */
    function mintPioneer(uint256 pioneerType, address playerAddress) public nonReentrant {
        require(!_hasOracleSeer[playerAddress], "Player already has Oracle Seer");
        require(playerAddress != address(0), "Invalid player address");
        require(msg.sender == playerAddress, "Can only mint for yourself");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _oracleSeerData[newTokenId] = OracleSeerData({
            name: "Oracle Seer",
            title: "Truth Seeker of the Cosmos",
            realm: "Flare",
            rarity: "Epic",
            mintedAt: block.timestamp,
            isActive: true,
            oracleAccuracy: 0,
            dataVerified: 0,
            predictionsMade: 0
        });
        
        _playerOracleSeer[playerAddress] = newTokenId;
        _hasOracleSeer[playerAddress] = true;
        
        _safeMint(playerAddress, newTokenId);
        
        emit OracleSeerMinted(playerAddress, newTokenId, "Oracle Seer");
    }
    
    /**
     * @dev Verify data and update Oracle Seer accuracy
     * @param dataType The type of data being verified
     * @param isAccurate Whether the verification was accurate
     */
    function verifyData(string memory dataType, bool isAccurate) external {
        require(_hasOracleSeer[msg.sender], "Player does not have Oracle Seer");
        
        uint256 tokenId = _playerOracleSeer[msg.sender];
        OracleSeerData storage seerData = _oracleSeerData[tokenId];
        
        require(seerData.isActive, "Oracle Seer is not active");
        
        seerData.dataVerified++;
        
        // Update accuracy based on verification result
        if (isAccurate) {
            seerData.oracleAccuracy = (seerData.oracleAccuracy * 9 + 100) / 10; // Increase accuracy
        } else {
            seerData.oracleAccuracy = (seerData.oracleAccuracy * 9 + 0) / 10; // Decrease accuracy
        }
        
        emit DataVerified(msg.sender, tokenId, dataType, isAccurate);
        emit OracleAccuracyUpdated(msg.sender, tokenId, seerData.oracleAccuracy);
    }
    
    /**
     * @dev Make a prediction and update Oracle Seer stats
     * @param prediction The prediction being made
     * @param confidence The confidence level (0-100)
     */
    function makePrediction(string memory prediction, uint256 confidence) external {
        require(_hasOracleSeer[msg.sender], "Player does not have Oracle Seer");
        require(confidence <= 100, "Confidence must be between 0 and 100");
        
        uint256 tokenId = _playerOracleSeer[msg.sender];
        OracleSeerData storage seerData = _oracleSeerData[tokenId];
        
        require(seerData.isActive, "Oracle Seer is not active");
        
        seerData.predictionsMade++;
        
        emit PredictionMade(msg.sender, tokenId, prediction, confidence);
    }
    
    /**
     * @dev Get Oracle Seer data for a token ID
     */
    function getOracleSeerData(uint256 tokenId) external view returns (OracleSeerData memory) {
        require(_exists(tokenId), "Token does not exist");
        return _oracleSeerData[tokenId];
    }
    
    /**
     * @dev Get player's Oracle Seer token ID
     */
    function getPlayerOracleSeer(address player) external view returns (uint256) {
        require(_hasOracleSeer[player], "Player does not have Oracle Seer");
        return _playerOracleSeer[player];
    }
    
    /**
     * @dev Check if player has Oracle Seer
     */
    function hasOracleSeer(address player) external view returns (bool) {
        return _hasOracleSeer[player];
    }
    
    /**
     * @dev Get total supply of Oracle Seers
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIds.current();
    }
    
    /**
     * @dev Check if minting is still available (always true for infinite supply)
     */
    function isMintingAvailable() external view returns (bool) {
        return true; // Always available since there's no supply limit
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
        require(from == address(0) || to == address(0), "Oracle Seer NFTs are non-transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
    /**
     * @dev Deactivate Oracle Seer (emergency function)
     */
    function deactivateOracleSeer(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _oracleSeerData[tokenId].isActive = false;
    }
}
