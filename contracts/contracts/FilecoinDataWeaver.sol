// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title FilecoinDataWeaver
 * @dev Data Weaver NFT contract for Filecoin network
 * Provides decentralized storage and data archiving functionality
 */
contract FilecoinDataWeaver is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // Data Weaver specific data
    struct DataWeaverData {
        string name;
        string title;
        string realm;
        string rarity;
        uint256 mintedAt;
        bool isActive;
        uint256 dataArchived;        // Amount of data archived (in bytes)
        uint256 storageContracts;    // Number of storage contracts created
        uint256 retrievalRequests;   // Number of data retrieval requests
        uint256 storageScore;        // Overall storage efficiency score
    }
    
    // Mapping from token ID to Data Weaver data
    mapping(uint256 => DataWeaverData) private _dataWeaverData;
    
    // Mapping from player address to token ID
    mapping(address => uint256) private _playerDataWeaver;
    
    // Mapping to check if player has Data Weaver
    mapping(address => bool) private _hasDataWeaver;
    
    // Data Weaver metadata
    string private _baseTokenURI;
    
    // Data Weaver specific events
    event DataWeaverMinted(address indexed player, uint256 indexed tokenId, string name);
    event DataArchived(address indexed player, uint256 indexed tokenId, string dataHash, uint256 dataSize);
    event StorageContractCreated(address indexed player, uint256 indexed tokenId, string contractName, uint256 storageCapacity);
    event DataRetrieved(address indexed player, uint256 indexed tokenId, string dataHash, uint256 retrievalTime);
    event StorageScoreUpdated(address indexed player, uint256 indexed tokenId, uint256 newScore);
    
    constructor() ERC721("Filecoin Data Weaver", "WEAVER") {
        _baseTokenURI = "https://ipfs.io/ipfs/";
    }
    
    /**
     * @dev Mint Data Weaver NFT for a player
     * @param player The address of the player
     * @param name The name of the Data Weaver
     * @param title The title of the Data Weaver
     */
    function mintDataWeaver(
        address player,
        string memory name,
        string memory title
    ) external onlyOwner nonReentrant {
        require(!_hasDataWeaver[player], "Player already has Data Weaver");
        require(player != address(0), "Invalid player address");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _dataWeaverData[newTokenId] = DataWeaverData({
            name: name,
            title: title,
            realm: "Filecoin",
            rarity: "Epic",
            mintedAt: block.timestamp,
            isActive: true,
            dataArchived: 0,
            storageContracts: 0,
            retrievalRequests: 0,
            storageScore: 100 // Starting storage score
        });
        
        _playerDataWeaver[player] = newTokenId;
        _hasDataWeaver[player] = true;
        
        _safeMint(player, newTokenId);
        
        emit DataWeaverMinted(player, newTokenId, name);
    }
    
    /**
     * @dev Archive data and update Data Weaver stats
     * @param dataHash The hash of the data being archived
     * @param dataSize The size of the data in bytes
     */
    function archiveData(string memory dataHash, uint256 dataSize) external {
        require(_hasDataWeaver[msg.sender], "Player does not have Data Weaver");
        require(dataSize > 0, "Data size must be greater than 0");
        
        uint256 tokenId = _playerDataWeaver[msg.sender];
        DataWeaverData storage weaverData = _dataWeaverData[tokenId];
        
        require(weaverData.isActive, "Data Weaver is not active");
        
        weaverData.dataArchived += dataSize;
        weaverData.storageScore += dataSize / 1000; // Increase score based on data size
        
        emit DataArchived(msg.sender, tokenId, dataHash, dataSize);
        emit StorageScoreUpdated(msg.sender, tokenId, weaverData.storageScore);
    }
    
    /**
     * @dev Create a storage contract and update Data Weaver stats
     * @param contractName The name of the storage contract
     * @param storageCapacity The storage capacity in bytes
     */
    function createStorageContract(string memory contractName, uint256 storageCapacity) external {
        require(_hasDataWeaver[msg.sender], "Player does not have Data Weaver");
        require(storageCapacity > 0, "Storage capacity must be greater than 0");
        
        uint256 tokenId = _playerDataWeaver[msg.sender];
        DataWeaverData storage weaverData = _dataWeaverData[tokenId];
        
        require(weaverData.isActive, "Data Weaver is not active");
        
        weaverData.storageContracts++;
        weaverData.storageScore += storageCapacity / 10000; // Increase score based on capacity
        
        emit StorageContractCreated(msg.sender, tokenId, contractName, storageCapacity);
        emit StorageScoreUpdated(msg.sender, tokenId, weaverData.storageScore);
    }
    
    /**
     * @dev Retrieve data and update Data Weaver stats
     * @param dataHash The hash of the data being retrieved
     * @param retrievalTime The time taken to retrieve the data in seconds
     */
    function retrieveData(string memory dataHash, uint256 retrievalTime) external {
        require(_hasDataWeaver[msg.sender], "Player does not have Data Weaver");
        
        uint256 tokenId = _playerDataWeaver[msg.sender];
        DataWeaverData storage weaverData = _dataWeaverData[tokenId];
        
        require(weaverData.isActive, "Data Weaver is not active");
        
        weaverData.retrievalRequests++;
        
        // Increase score based on retrieval speed (faster = higher score)
        if (retrievalTime < 5) {
            weaverData.storageScore += 100; // Very fast retrieval
        } else if (retrievalTime < 30) {
            weaverData.storageScore += 50; // Fast retrieval
        } else {
            weaverData.storageScore += 10; // Slow retrieval
        }
        
        emit DataRetrieved(msg.sender, tokenId, dataHash, retrievalTime);
        emit StorageScoreUpdated(msg.sender, tokenId, weaverData.storageScore);
    }
    
    /**
     * @dev Get Data Weaver data for a token ID
     */
    function getDataWeaverData(uint256 tokenId) external view returns (DataWeaverData memory) {
        require(_exists(tokenId), "Token does not exist");
        return _dataWeaverData[tokenId];
    }
    
    /**
     * @dev Get player's Data Weaver token ID
     */
    function getPlayerDataWeaver(address player) external view returns (uint256) {
        require(_hasDataWeaver[player], "Player does not have Data Weaver");
        return _playerDataWeaver[player];
    }
    
    /**
     * @dev Check if player has Data Weaver
     */
    function hasDataWeaver(address player) external view returns (bool) {
        return _hasDataWeaver[player];
    }
    
    /**
     * @dev Get total supply of Data Weavers
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
        require(from == address(0) || to == address(0), "Data Weaver NFTs are non-transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
    /**
     * @dev Deactivate Data Weaver (emergency function)
     */
    function deactivateDataWeaver(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _dataWeaverData[tokenId].isActive = false;
    }
}
