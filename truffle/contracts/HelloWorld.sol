// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
    uint256 value;

    event MessageChanged(address indexed setter);

    /**
     * @notice Get the value
     * @return Value
     */
    function read() public view returns (uint256) {
        return value;
    }

    /**
     * @notice Set the value
     * @param newValue   Value
     */
    function write(uint256 newValue) public {
        value = newValue;
        emit MessageChanged(msg.sender);
    }
}
