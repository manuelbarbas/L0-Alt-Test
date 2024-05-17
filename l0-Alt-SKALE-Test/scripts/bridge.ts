import { utils,BigNumber } from 'ethers'
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { Options } from '@layerzerolabs/lz-v2-utilities'


export async function BridgeToken(originContract: any, destinationContract: any, amount: string) {

    const originAddress = originContract.contractAddress
    const originTokenFactory = await hre.ethers.getContractFactory(originContract.contractName)
    const OriginContract = originTokenFactory.attach(originAddress)

    const [owner] = await ethers.getSigners()

   const tokensToSend = utils.parseEther(amount)
   const destinationChainId = destinationContract.eid
   const destinationAddress = owner.address 

    if(originContract.eid == 40273)
    {
        const SKLContract = await hre.ethers.getContractAt("ERC20","0x6c71319b1F910Cf989AD386CcD4f8CC8573027aB")
        const tx = await SKLContract.approve(originAddress,BigNumber.from("1000000000000000000"));

        console.log(tx);
    }

   const options = Options.newOptions().addExecutorLzReceiveOption(5000000, 0).toHex().toString()

   const sendParam: SendParamStruct = {
        dstEid: destinationChainId,
        to: hre.ethers.utils.zeroPad(destinationAddress, 32),
        amountLD: tokensToSend,
        minAmountLD: tokensToSend,
        extraOptions: options,
        composeMsg: `0x`,
        oftCmd: `0x`
    };

    /**
     * Getting error here
     * For both Fuji -> SKALE europa and SKALE Europa -> Fuji
     */
   const [nativeFee] = await OriginContract.quoteSend(sendParam, false)
   //console.log(`Sending ${amount} tokens from Contract A to Contract B`)
   console.log(nativeFee)

   let tx = await OriginContract.send(sendParam, [nativeFee, 0], owner.address, {value:nativeFee})
   //console.log('Transfer successful!')
   console.log(tx)


}
