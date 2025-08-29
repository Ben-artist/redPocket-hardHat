import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "ethers"; // 导入 ethers 的 parseEther

export default buildModule("RedPacketModule", (m) => {
  const packetCount = 5; // 红包数量
  const initialAmount = parseEther("0.1"); // 0.1 ETH 转换为 wei

  const redPacket = m.contract("RedPacket", [packetCount], {
    value: initialAmount, // 发送 ETH 到合约
    from: m.getAccount(0), // 使用第一个账户（基于 SEPOLIA_PRIVATE_KEY）
  });

  return { redPacket };
});