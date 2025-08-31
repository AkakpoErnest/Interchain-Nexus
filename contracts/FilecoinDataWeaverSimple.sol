// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title FilecoinDataWeaverSimple
 * @dev Simplified Data Weaver NFT contract for Filecoin network
 */
contract FilecoinDataWeaverSimple is ERC721, Ownable, ReentrancyGuard {
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
    }
    
    // Mapping from token ID to Data Weaver data
    mapping(uint256 => DataWeaverData) private _dataWeaverData;
    
    // Mapping from player address to token ID
    mapping(address => uint256) private _playerDataWeaver;
    
    // Mapping to check if player has Data Weaver
    mapping(address => bool) private _hasDataWeaver;
    
    // Events
    event DataWeaverMinted(address indexed player, uint256 indexed tokenId, string name);
    
    constructor() ERC721("Filecoin Data Weaver", "WEAVER") {}
    
    /**
     * @dev Public minting function for users to mint their own Data Weaver
     * @param pioneerType The type of pioneer (for compatibility with frontend)
     * @param playerAddress The address of the player minting the NFT
     */
    function mintPioneer(uint256 pioneerType, address playerAddress) external nonReentrant {
        require(!_hasDataWeaver[playerAddress], "Player already has Data Weaver");
        require(playerAddress != address(0), "Invalid player address");
        require(pioneerType == 2, "Invalid pioneer type for Data Weaver"); // PioneerType.DATA_WEAVER = 2
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _dataWeaverData[newTokenId] = DataWeaverData({
            name: "The Data Weaver",
            title: "Archivist of the Nexus",
            realm: "Filecoin",
            rarity: "Epic",
            mintedAt: block.timestamp,
            isActive: true
        });
        
        _playerDataWeaver[playerAddress] = newTokenId;
        _hasDataWeaver[playerAddress] = true;
        
        _safeMint(playerAddress, newTokenId);
        
        emit DataWeaverMinted(playerAddress, newTokenId, "The Data Weaver");
    }
    
    /**
     * @dev Check if player has Pioneer (alias for hasDataWeaver for compatibility)
     */
    function hasPioneer(address player) external view returns (bool) {
        return _hasDataWeaver[player];
    }
    
    /**
     * @dev Get player's Pioneer token ID (alias for getPlayerDataWeaver for compatibility)
     */
    function getPlayerPioneer(address player) external view returns (uint256) {
        require(_hasDataWeaver[player], "Player does not have Data Weaver");
        return _playerDataWeaver[player];
    }
    
    /**
     * @dev Get Pioneer data for a token ID (compatibility function)
     */
    function getPioneerData(uint256 tokenId) external view returns (
        uint8 pioneerType,
        string memory name,
        string memory title,
        string memory realm,
        string memory rarity,
        uint256 mintedAt,
        bool isActive
    ) {
        require(_exists(tokenId), "Token does not exist");
        DataWeaverData memory data = _dataWeaverData[tokenId];
        
        return (
            2, // PioneerType.DATA_WEAVER
            data.name,
            data.title,
            data.realm,
            data.rarity,
            data.mintedAt,
            data.isActive
        );
    }
    
    /**
     * @dev Get total supply of Data Weavers
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIds.current();
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
}

