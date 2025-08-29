import type { HardhatUserConfig } from "hardhat/config";
import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import hardhatVerify from "@nomicfoundation/hardhat-verify";
const config: HardhatUserConfig = {
  verify: {
    etherscan: {
      apiKey: "USAKI6Z2INSM5XRW1JTEUZB753473IM37Q",
    },
  },
  plugins: [hardhatToolboxViemPlugin, hardhatVerify],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: `https://sepolia.infura.io/v3/28b48ace2abf40e4ad15359cf9e3a39d`,
      accounts: ["0x8dcea7f9383f456fe7c028ad563a20496fdbfff0f776e619663ffc3bc77a4d70"],
      chainId: 11155111,
      gasPrice: 20000000000, // 20 Gwei
      timeout: 60000, // 60 秒超时
    },
  },
};

export default config;
