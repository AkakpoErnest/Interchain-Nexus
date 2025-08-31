// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EnsIdentityGuardianSimple is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // ENS Registry address on Sepolia
    address public constant ENS_REGISTRY = 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e;
    
    // Pioneer type for ENS
    uint256 public constant ENS_PIONEER_TYPE = 1;
    
    // Mapping to track who has minted
    mapping(address => bool) public hasPioneerMapping;
    mapping(address => uint256) public playerPioneer;
    
    // Events
    event PioneerMinted(address indexed player, uint256 tokenId, uint256 pioneerType);
    
    constructor() ERC721("ENS Identity Guardian", "ENSIG") Ownable() {}
    
    /**
     * @dev Mint a Pioneer NFT for the player
     * @param pioneerType The type of pioneer (should be 1 for ENS)
     * @param playerAddress The address of the player
     */
    function mintPioneer(uint256 pioneerType, address playerAddress) external nonReentrant {
        require(pioneerType == ENS_PIONEER_TYPE, "Invalid pioneer type");
        require(!hasPioneerMapping[playerAddress], "Player already has ENS Guardian");
        require(playerAddress != address(0), "Invalid player address");
        
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        
        hasPioneerMapping[playerAddress] = true;
        playerPioneer[playerAddress] = tokenId;
        
        _safeMint(playerAddress, tokenId);
        
        emit PioneerMinted(playerAddress, tokenId, pioneerType);
    }
    
    /**
     * @dev Check if player has a pioneer
     */
    function hasPioneer(address player) external view returns (bool) {
        return hasPioneerMapping[player];
    }
    
    /**
     * @dev Get player's pioneer token ID
     */
    function getPlayerPioneer(address player) external view returns (uint256) {
        return playerPioneer[player];
    }
    
    /**
     * @dev Check if minting is available (always true for unlimited minting)
     */
    function isMintingAvailable() external pure returns (bool) {
        return true;
    }
    
    /**
     * @dev Get total supply
     */
    function totalSupply() external view returns (uint256) {
        return _tokenIds.current();
    }
    
    /**
     * @dev Get contract info
     */
    function name() public view override returns (string memory) {
        return "ENS Identity Guardian";
    }
    
    function symbol() public view override returns (string memory) {
        return "ENSIG";
    }
}
