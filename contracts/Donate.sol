// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./Ownable.sol";

/// @title Donate
/// @author ImInnocent
/// @notice 외부에서 기부를 하면 대상의 지갑으로 이더를 쏴줍니다
contract Donate is Ownable {
    // 가입된 내용 목록
    mapping (string => address payable) public registered;
    // 유저별 받은 커피 합계
    mapping (string => uint) public sum;
    // 커피 가격
    uint public coffeePrice = 0.01 ether;
    // 내 유저이름
    string public ownerName = "goldfish";

    /// @notice owner의 주소를 등록함. 
    constructor() {
        setRegistered(ownerName, payable(_msgSender()));
    }

    /// @notice registered를 조회
    /// @param _name 조회할 이름
    function getRegistered(string memory _name) public view returns (address) {
        return registered[_name];
    }

    /// @notice 내부적으로 사용되는 사용자 등록 로직
    /// @param _name 등록자 이름
    /// @param _addr 등록할 주소
    function setRegistered(string memory _name, address payable _addr) private {
        registered[_name] = _addr;
    }

    /// @notice 받은 커피의 개수를 보여줌. 소수점 없이 정수.
    /// @param _user 조회할 유저의 이름
    /// @return 받은 커피의 개수.
    function getReceivedCoffee(string calldata _user) view external returns (uint) {
        require(getRegistered(_user) != address(0));

        return sum[_user] / coffeePrice;
    }

    /// @notice 커피 가격 바꾸기 (소유자 전용)
    /// @param _coffeePrice 바꿀 가격 (0보다 커야 함)
    function changeCoffeePrice(uint _coffeePrice) external onlyOwner {
        require(_coffeePrice > 0);

        coffeePrice = _coffeePrice;
    }

    /// @notice 소유자의 주소를 바꿔주는 함수. (소유자 전용)
    /// @param _addr 바꿀 새 주소
    function changeReceiveAddress(address _addr) external onlyOwner {
        require(getRegistered(ownerName) != payable(_addr));

        setRegistered(ownerName, payable(_addr));
    }

    /// @notice 기부를 받으면 컨트랙트의 주인 주소로 보내주는 함수
    /// @param _user 기부를 받을 유저 이름
    function donate(string calldata _user) payable external {
        // 등록된 주소가 있어야 기부 가능
        require(registered[_user] != address(0));

        registered[_user].transfer(msg.value);
        sum[_user] = sum[_user] + msg.value;
    }

    /// @notice 새로운 사람을 등록하는 함수
    /// @param _user 유저 이름
    /// @param _addr 등록할 주소
    function register(string calldata _user, address _addr) external {
        // 등록된 주소가 없어야 등록 가능
        require(getRegistered(_user) == address(0));

        setRegistered(_user, payable(_addr));
    }
}
