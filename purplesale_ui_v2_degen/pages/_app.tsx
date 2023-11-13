// import "@/styles/globals.css";
// import type { AppProps } from "next/app";
// import "@rainbow-me/rainbowkit/styles.css";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import {
//   darkTheme,
//   getDefaultWallets,
//   RainbowKitProvider,
// } from "@rainbow-me/rainbowkit";
// import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import {
//   mainnet,
//   polygon,
//   optimism,
//   arbitrum,
//   zora,
//   polygonMumbai,
// } from "wagmi/chains";
// import { publicProvider } from "wagmi/providers/public";
// import DefaultNav from "@/components/Navbar/DefaultNav";
// import FormProvider from "@/contexts/create/FormProvider";
// import { SnackbarProvider } from "notistack";
// const { chains, publicClient } = configureChains(
//   [mainnet, polygon, optimism, arbitrum, zora, polygonMumbai],
//   [
//     alchemyProvider({ apiKey: "64Bhe8uZTKyZc7rOCgS5lpKvKO3TXRxU" }),
//     publicProvider(),
//   ],
// );
//
// const { connectors } = getDefaultWallets({
//   appName: "purplesale",
//   projectId: "c081cba5403b9fd597db9c7da7bc3edd",
//   chains,
// });
//
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient,
// });
//
// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <FormProvider>
//       <SnackbarProvider maxSnack={3}>
//         <WagmiConfig config={wagmiConfig}>
//           <RainbowKitProvider chains={chains} theme={darkTheme()}>
//             <DefaultNav>
//               <Component className="dark:bg-black" {...pageProps} />
//             </DefaultNav>
//           </RainbowKitProvider>
//         </WagmiConfig>
//       </SnackbarProvider>
//     </FormProvider>
//   );
// }

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { alchemyProvider } from "wagmi/providers/alchemy";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  polygonMumbai,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import DefaultNav from "@/components/Navbar/DefaultNav";
import FormProvider from "@/contexts/create/FormProvider";
import { SnackbarProvider } from "notistack";
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora, polygonMumbai],
  [
    alchemyProvider({ apiKey: "64Bhe8uZTKyZc7rOCgS5lpKvKO3TXRxU" }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: "purplesale",
  projectId: "c081cba5403b9fd597db9c7da7bc3edd",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
const lock = true;
const frontendResponse = "Loading...";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <FormProvider>
      <SnackbarProvider maxSnack={3}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            {lock ? (
              <DefaultNav>
                <Component className="dark:bg-black" {...pageProps} />
              </DefaultNav>
            ) : (
              frontendResponse
            )}
          </RainbowKitProvider>
        </WagmiConfig>
      </SnackbarProvider>
    </FormProvider>
  );
}
