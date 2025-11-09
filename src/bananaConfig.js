export const CONTRACT_ADDRESS = "0xCef3d80028f70Eebfb1B9FaD8f5f49964457da11";

export const ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function mint(address to, uint256 amount) public",
  "function burn(uint256 amount) public",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];