//SPDX-License-Identifier:MIT

pragma solidity ^0.8.11;


contract cloudService{

    struct Access{

        address user;
        bool access;

    }

    mapping(address => string[]) yourImages;

    mapping(address => Access[]) accessList;

    mapping(address => mapping(address => bool)) ownerShip;

    mapping(address => mapping(address => bool)) previousData;


function addYourImage(string memory url) external{

    yourImages[msg.sender].push(url);

}

function allowUser(address allowedUser) external{

    ownerShip[msg.sender][allowedUser] = true;

    if(previousData[msg.sender][allowedUser]){

        for(uint i=0;i<accessList[msg.sender].length;i++){

            if(accessList[msg.sender][i].user == allowedUser){

                accessList[msg.sender][i].access = true;

            }

        } 

    }
    else{
            
            accessList[msg.sender].push(Access(allowedUser , true));

            previousData[msg.sender][allowedUser] = true;

    }

}

function disallowUser(address disallowedUser) external{

    ownerShip[msg.sender][disallowedUser] = false;

    for(uint i=0;i<accessList[msg.sender].length;i++){

        if(accessList[msg.sender][i].user == disallowedUser){

            accessList[msg.sender][i].access = false;

        }

    }

}

function displayImages(address user) view external returns(string[] memory){

    require(user == msg.sender || ownerShip[user][msg.sender],"You dont have the access");

   return  yourImages[user];


}


function shareAccessList() view external returns(Access[] memory){

    return accessList[msg.sender];

}

}