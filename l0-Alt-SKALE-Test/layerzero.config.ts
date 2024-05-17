import { EndpointId } from '@layerzerolabs/lz-definitions'
import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'
import TokenFuji from './deployments/fuji/OGOFT.json'
import TokenEuropa from './deployments/europa/MyAltOFT.json'
//import TokenSepolia from './deployments/sepolia/MyOFT.json'

const sepoliaContract: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'OGOFT',
    contractAddress: "",
}

const fujiContract: OmniPointHardhat = {
    eid: EndpointId.AVALANCHE_V2_TESTNET,
    contractName: 'OGOFT',
    contractAddress: TokenFuji.address,
}

const skaleContract: OmniPointHardhat = {
    eid: EndpointId.SKALE_V2_TESTNET,
    contractName: 'MyOFT',
    contractAddress: TokenEuropa.address,
}

const config: OAppOmniGraphHardhat = {
    contracts: {
        fuji: fujiContract,
        europa: skaleContract,
        sepolia: sepoliaContract,
    },
    connections: [
        {
            from: fujiContract,
            to: sepoliaContract,
        },
        {
            from: sepoliaContract,
            to: fujiContract,
        },
        {
            from: fujiContract,
            to: skaleContract,
        },
        {
            from: skaleContract,
            to: fujiContract,
        },
        {
            from: sepoliaContract,
            to: skaleContract,
        },
        {
            from: skaleContract,
            to: sepoliaContract,
        },
    ],
}

export default config
