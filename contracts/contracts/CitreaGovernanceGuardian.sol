// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CitreaGovernanceGuardian
 * @dev Governance Guardian NFT contract for Citrea network
 * Provides governance features and Bitcoin ZK rollup functionality
 */
contract CitreaGovernanceGuardian is ERC721, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    
    // Governance Guardian specific data
    struct GovernanceGuardianData {
        string name;
        string title;
        string realm;
        string rarity;
        uint256 mintedAt;
        bool isActive;
        uint256 proposalsCreated;     // Number of governance proposals created
        uint256 votesCast;           // Number of votes cast in governance
        uint256 zkProofsVerified;    // Number of ZK proofs verified
        uint256 governanceScore;     // Overall governance impact score
        uint256 bitcoinConnections;  // Number of Bitcoin connections made
    }
    
    // Mapping from token ID to Governance Guardian data
    mapping(uint256 => GovernanceGuardianData) private _governanceGuardianData;
    
    // Mapping from player address to token ID
    mapping(address => uint256) private _playerGovernanceGuardian;
    
    // Mapping to check if player has Governance Guardian
    mapping(address => bool) private _hasGovernanceGuardian;
    
    // Governance Guardian metadata
    string private _baseTokenURI;
    
    // Governance Guardian specific events
    event GovernanceGuardianMinted(address indexed player, uint256 indexed tokenId, string name);
    event ProposalCreated(address indexed player, uint256 indexed tokenId, string proposalTitle, uint256 proposalId);
    event VoteCast(address indexed player, uint256 indexed tokenId, uint256 proposalId, bool support);
    event ZKProofVerified(address indexed player, uint256 indexed tokenId, string proofType);
    event BitcoinConnectionMade(address indexed player, uint256 indexed tokenId, string connectionType);
    event GovernanceScoreUpdated(address indexed player, uint256 indexed tokenId, uint256 newScore);
    
    constructor() ERC721("Citrea Governance Guardian", "GOVERNANCE") {
        _baseTokenURI = "https://ipfs.io/ipfs/";
    }
    
    /**
     * @dev Mint Governance Guardian NFT for a player
     * @param player The address of the player
     * @param name The name of the Governance Guardian
     * @param title The title of the Governance Guardian
     */
    function mintGovernanceGuardian(
        address player,
        string memory name,
        string memory title
    ) external onlyOwner nonReentrant {
        require(!_hasGovernanceGuardian[player], "Player already has Governance Guardian");
        require(player != address(0), "Invalid player address");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _governanceGuardianData[newTokenId] = GovernanceGuardianData({
            name: name,
            title: title,
            realm: "Citrea",
            rarity: "Legendary",
            mintedAt: block.timestamp,
            isActive: true,
            proposalsCreated: 0,
            votesCast: 0,
            zkProofsVerified: 0,
            governanceScore: 200, // Starting governance score
            bitcoinConnections: 0
        });
        
        _playerGovernanceGuardian[player] = newTokenId;
        _hasGovernanceGuardian[player] = true;
        
        _safeMint(player, newTokenId);
        
        emit GovernanceGuardianMinted(player, newTokenId, name);
    }
    
    /**
     * @dev Create a governance proposal and update Governance Guardian stats
     * @param proposalTitle The title of the proposal being created
     * @param proposalId The unique identifier for the proposal
     */
    function createProposal(string memory proposalTitle, uint256 proposalId) external {
        require(_hasGovernanceGuardian[msg.sender], "Player does not have Governance Guardian");
        
        uint256 tokenId = _playerGovernanceGuardian[msg.sender];
        GovernanceGuardianData storage guardianData = _governanceGuardianData[tokenId];
        
        require(guardianData.isActive, "Governance Guardian is not active");
        
        guardianData.proposalsCreated++;
        guardianData.governanceScore += 150; // Increase score for creating proposals
        
        emit ProposalCreated(msg.sender, tokenId, proposalTitle, proposalId);
        emit GovernanceScoreUpdated(msg.sender, tokenId, guardianData.governanceScore);
    }
    
    /**
     * @dev Cast a vote in governance and update Governance Guardian stats
     * @param proposalId The ID of the proposal being voted on
     * @param support Whether the vote is in support of the proposal
     */
    function castVote(uint256 proposalId, bool support) external {
        require(_hasGovernanceGuardian[msg.sender], "Player does not have Governance Guardian");
        
        uint256 tokenId = _playerGovernanceGuardian[msg.sender];
        GovernanceGuardianData storage guardianData = _governanceGuardianData[tokenId];
        
        require(guardianData.isActive, "Governance Guardian is not active");
        
        guardianData.votesCast++;
        guardianData.governanceScore += 50; // Increase score for voting
        
        emit VoteCast(msg.sender, tokenId, proposalId, support);
        emit GovernanceScoreUpdated(msg.sender, tokenId, guardianData.governanceScore);
    }
    
    /**
     * @dev Verify a ZK proof and update Governance Guardian stats
     * @param proofType The type of ZK proof being verified
     */
    function verifyZKProof(string memory proofType) external {
        require(_hasGovernanceGuardian[msg.sender], "Player does not have Governance Guardian");
        
        uint256 tokenId = _playerGovernanceGuardian[msg.sender];
        GovernanceGuardianData storage guardianData = _governanceGuardianData[tokenId];
        
        require(guardianData.isActive, "Governance Guardian is not active");
        
        guardianData.zkProofsVerified++;
        guardianData.governanceScore += 100; // Increase score for ZK proof verification
        
        emit ZKProofVerified(msg.sender, tokenId, proofType);
        emit GovernanceScoreUpdated(msg.sender, tokenId, guardianData.governanceScore);
    }
    
    /**
     * @dev Make a Bitcoin connection and update Governance Guardian stats
     * @param connectionType The type of Bitcoin connection being made
     */
    function makeBitcoinConnection(string memory connectionType) external {
        require(_hasGovernanceGuardian[msg.sender], "Player does not have Governance Guardian");
        
        uint256 tokenId = _playerGovernanceGuardian[msg.sender];
        GovernanceGuardianData storage guardianData = _governanceGuardianData[tokenId];
        
        require(guardianData.isActive, "Governance Guardian is not active");
        
        guardianData.bitcoinConnections++;
        guardianData.governanceScore += 75; // Increase score for Bitcoin connections
        
        emit BitcoinConnectionMade(msg.sender, tokenId, connectionType);
        emit GovernanceScoreUpdated(msg.sender, tokenId, guardianData.governanceScore);
    }
    
    /**
     * @dev Get Governance Guardian data for a token ID
     */
    function getGovernanceGuardianData(uint256 tokenId) external view returns (GovernanceGuardianData memory) {
        require(_exists(tokenId), "Token does not exist");
        return _governanceGuardianData[tokenId];
    }
    
    /**
     * @dev Get player's Governance Guardian token ID
     */
    function getPlayerGovernanceGuardian(address player) external view returns (uint256) {
        require(_hasGovernanceGuardian[player], "Player does not have Governance Guardian");
        return _playerGovernanceGuardian[player];
    }
    
    /**
     * @dev Check if player has Governance Guardian
     */
    function hasGovernanceGuardian(address player) external view returns (bool) {
        return _hasGovernanceGuardian[player];
    }
    
    /**
     * @dev Get total supply of Governance Guardians
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
        require(from == address(0) || to == address(0), "Governance Guardian NFTs are non-transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
    /**
     * @dev Deactivate Governance Guardian (emergency function)
     */
    function deactivateGovernanceGuardian(uint256 tokenId) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _governanceGuardianData[tokenId].isActive = false;
    }
}
