// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./Ownable.sol";

/// @title Donate
/// @author ImInnocent
/// @notice 외부에서 기부를 하면 내 지갑으로 돈을 쏴줍니다
contract Donate is Ownable {
    uint public sum;
    address payable private receiveAddress;
    uint public coffeePrice = 0.01 ether;

    constructor() {
        receiveAddress = payable(_msgSender());
    }

    function getReceiveAddress() view external onlyOwner returns (address) {
        return receiveAddress;
    }

    /// @notice 받은 커피의 개수를 보여줌. 소수점 없이 정수.
    /// @return 받은 커피의 개수.
    function getReceivedCoffee() view external returns (uint) {
        return sum / coffeePrice;
    }

    /// @notice 돈을 받을 주소를 바꿔주는 함수. (소유자 전용)
    /// @param _addr 바꿀 새 주소
    function changeReceiveAddress(address _addr) external onlyOwner {
        require(receiveAddress != payable(_addr));
        receiveAddress = payable(_addr);
    }

    /// @notice 돈을 받으면 컨트랙트의 주인 주소로 보내주는 함수
    function donate() payable external {
        receiveAddress.transfer(msg.value);
        sum = sum + msg.value;
    }
}
