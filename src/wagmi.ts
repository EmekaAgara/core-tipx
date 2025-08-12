import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { coreDao, coreTestnet2 } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "ecb15083d8dfecb97c3270a5ece45e35",
  chains: [
    {
      ...coreDao,
      rpcUrls: {
        default: { http: ["https://rpc.coredao.org"] },
      },
    },
    {
      ...coreTestnet2,
      rpcUrls: {
        default: { http: ["https://rpc.test2.coredao.org"] },
      },
    },
  ],
  ssr: true,
});
