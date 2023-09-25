// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting{
    struct Canditate{
        string name;
        uint256 voteCount;
    }
    Canditate[] public Canditates;
    address owner;
    mapping(address => bool) public voters;
    uint256 votingstart;
    uint256 votingend;
     constructor(string[] memory _Canditatesnames, uint256 _durationminutes){
        for(uint256 i=0; i <_Canditatesnames.length;i++){
            Canditates.push(Canditate({
                name : _Canditatesnames[i],
                voteCount : 0
            }));
        }
        owner = msg.sender;
        votingstart = block.timestamp;
        votingend = block.timestamp + (_durationminutes * 1 minutes);
     }
     modifier onlyowner{
        require(msg.sender == owner);
        _;
     }
     function addCanditate(string memory _name) public onlyowner{
        Canditates.push(Canditate({
            name : _name,
            voteCount : 0
        }));
     }
     function vote(uint256 _canditateIndex) public{
        require(!voters[msg.sender],"You have already voted");
        require(_canditateIndex < Canditates.length , "Invalid vote");

        Canditates[_canditateIndex].voteCount++;
        voters[msg.sender] = true;
     }
     function getAllvotes() public view returns (Canditate[] memory){
        return Canditates;
     }
     function getcurrentstatus() public view returns (bool){
        return(block.timestamp >= votingstart && block.timestamp < votingend);
     }
     function getremainingtime() public view returns (uint256){
        require(block.timestamp >= 0,"Voting has not yet started");
        if(block.timestamp < votingend){
            return 0;
        }
        return votingend - block.timestamp;
     }



}