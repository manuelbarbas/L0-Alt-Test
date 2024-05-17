import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import layerzero_config from '../layerzero.config'

import {BridgeToken} from '../scripts/bridge'
import {SetPeer} from '../scripts/setPeer'

task('setpeer', 'Set Peer')
    .addParam('origin', 'Origin Chain')
    .addParam('destination', 'Destination Chain')
    .setAction(async (taskArgs: any) => {

    let originDetails = layerzero_config.contracts[(taskArgs.origin).toLowerCase()]
    let detinationDetails = layerzero_config.contracts[(taskArgs.destination).toLowerCase()]

    await SetPeer(originDetails,detinationDetails)

});


task('bridge', 'Bridge Token')
    .addParam('origin', 'Origin Chain')
    .addParam('destination', 'Destination Chain')
    .addParam('amount', 'Amount to be bridged')
    .setAction(async (taskArgs: any) => {

    let originDetails = layerzero_config.contracts[(taskArgs.origin).toLowerCase()]
    let detinationDetails = layerzero_config.contracts[(taskArgs.destination).toLowerCase()]

    await BridgeToken(originDetails,detinationDetails,taskArgs.amount)

});
