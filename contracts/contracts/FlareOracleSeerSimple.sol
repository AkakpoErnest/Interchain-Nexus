// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FlareOracleSeerSimple is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // Player tracking
    mapping(address => bool) private _hasOracleSeer;
    mapping(address => uint256) private _playerOracleSeer;
    
    // Events
    event OracleSeerMinted(address indexed player, uint256 indexed tokenId, string name);
    
    constructor() ERC721("Flare Oracle Seer", "ORACLE") Ownable() {}
    
    /**
     * @dev Public minting function that anyone can call
     * @param pioneerType The type of pioneer (for compatibility)
     * @param playerAddress The address to mint to
     */
    function mintPioneer(uint256 pioneerType, address playerAddress) external nonReentrant {
        require(!_hasOracleSeer[playerAddress], "Player already has Oracle Seer");
        require(playerAddress != address(0), "Invalid player address");
        require(msg.sender == playerAddress, "Can only mint for yourself");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _playerOracleSeer[playerAddress] = newTokenId;
        _hasOracleSeer[playerAddress] = true;
        
        _safeMint(playerAddress, newTokenId);
        
        emit OracleSeerMinted(playerAddress, newTokenId, "Oracle Seer");
    }
    
    /**
     * @dev Check if a player has an Oracle Seer
     */
    function hasPioneer(address player) external view returns (bool) {
        return _hasOracleSeer[player];
    }
    
    /**
     * @dev Get the player's Oracle Seer token ID
     */
    function getPlayerPioneer(address player) external view returns (uint256) {
        require(_hasOracleSeer[player], "Player does not have Oracle Seer");
        return _playerOracleSeer[player];
    }
    
    /**
     * @dev Get total supply
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIds.current();
    }
    
    /**
     * @dev Check if minting is available (always true)
     */
    function isMintingAvailable() external view returns (bool) {
        return true;
    }
    
    /**
     * @dev Set base URI (owner only)
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        // Implementation can be added later
    }
}
