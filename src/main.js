/* eslint-disable prettier-vue/prettier */
import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import router from '@/router'
import VueMeta from 'vue-meta'
import Bowser from 'bowser'
import Cookies from 'js-cookie'
import SlideUpDown from "vue-slide-up-down";
import axios from 'axios'
import Web3 from 'web3'
import smoothscroll from 'smoothscroll-polyfill';

import './assets/sass/app.scss'

import Helpers from './utils/helpers.js'
import data from '@/utils/data.js'
import {
  addressOpensea,
  abiOpensea,
  addressEther,
  abiEther
} from '@/utils/contracts.js'

const delimiter = 1e18

const infura = 'https://mainnet.infura.io/v3/4a91eb50e36d430681e0000756d6261b'

const requestMethods = {
  getAccountsList: 'eth_accounts',
  callWalletConnection: 'eth_requestAccounts',
  callSwitchWallet: 'wallet_requestPermissions',
}

const walletConnectionProcessStartedErrorCode = -32002
const walletConnectionHeaderErrorCode = -32000

Vue.component("slide-up-down", SlideUpDown);

// kick off the polyfill!
smoothscroll.polyfill();
Vue.use(Helpers)
Vue.use(Helpers)
Vue.use(Notifications)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
Vue.config.productionTip = false

window.appVue = new Vue({
  data() {
    return {
      data: data,
      windowTop: 0,
      width: null,
      height: null,
      desctopMinBreakpoint: 1500,
      tabletBreakpoint: 1200,
      tabletSmallBreakpoint: 1024,
      mobileBreakpoint: 768,
      bowser: null,
      isMetaMaskInstalled: false,
      isWalletConnected: false,
      currentWallet: null,
      authToken: Cookies.get('token'),
      web3: new Web3(Web3.givenProvider || infura),
      contractOpensea: null,
      contractEther: null,
      amountOpensea: 0,
      amountWhitelist: 1,
      countDown: {
        startTimePreSale: new Date('2023-02-02315:46:00.000+03:00').getTime(),
        endTimePreSale: new Date('2023-02-07T22:00:00.000+03:00').getTime(),
        days: null,
        hours: null,
        minutes: null,
        seconds: null
      },
      countDownPublic: {
        startTimePublicSale: new Date('2023-02-07T23:07:00.000+03:00').getTime(),
        endTimePublicSale: new Date('2023-02-08T22:00:00.000+03:00').getTime(),
        days: null,
        hours: null,
        minutes: null,
        seconds: null
      }
    }
  },
  computed: {
    isDesctopMin() {
      return this.width <= this.desctopMinBreakpoint
    },
    isTablet() {
      return this.width <= this.tabletBreakpoint
    },
    isSmallTablet() {
      return this.width <= this.tabletSmallBreakpoint
    },
    isMobile() {
      return this.width <= this.mobileBreakpoint
    },
    headers() {
      return {
        headers: {
          Authorization: `Bearer ${this.authToken}`
        }
      }
    },
    inWhitelist() {
      return this.amountOpensea > this.amountWhitelist
    },
    isPresaleOn() {
      return Math.sign(this.countDown.days) === -1;
    },
  },
  watch: {
    currentWallet(newV, oldV) {
      if (newV !== null) {
        this.getAmountOpensea()
      }
    }
  },
  async created() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.bowser = Bowser.parse(window.navigator.userAgent)

    await this.checkNetwork()
    await this.initContracts()
    this.initMetamask()

    this.handleTimerCountDown()
    setInterval(() => {
      this.handleTimerCountDown()
    }, 1000)

    this.handleTimerPublicSaleCountDown()
    setInterval(() => {
      this.handleTimerPublicSaleCountDown()
    }, 1000)
  },
  mounted() {
    this.addListeners()
  },
  methods: {
    async initContracts() {
      this.contractOpensea = new this.web3.eth.Contract(abiOpensea, addressOpensea)
      this.contractEther = new this.web3.eth.Contract(abiEther, addressEther)

      return Promise.resolve()
    },
    initMetamask() {
      const ethereum = window.ethereum

      this.isMetaMaskInstalled = ethereum.isMetaMask

      if (this.isMetaMaskInstalled) {
        ethereum.on('accountsChanged', accounts => {
          this.handleAccountsChange(accounts)
        })
        this.ethereumRequest(requestMethods.getAccountsList)
      }
    },
    handleAccountsChange(accounts) {
      this.setWalletConnectionStatus(accounts)
    },
    connectMetaMask() {
      if (this.isWalletConnected) {
        this.$notify({
          group: 'app-notifications',
          type: 'success',
          text: 'Metamask is already connected'
        })

        this.switchWallet()
      } else {
        if (this.isMetaMaskInstalled) {
          this.ethereumRequest(requestMethods.callWalletConnection)
        } else {
          this.deepLink()

          this.$notify({
            group: 'app-notifications',
            type: 'error',
            title: 'MetaMask is not installed',
            text: `<a href="https://metamask.io/download.html" target="_blank">Download here</a>`
          })
        }
      }
    },
    deepLink() {
      if (this.isMobile || this.bowser.platform.type !== 'desktop') {
        document.location.href = 'https://metamask.app.link/dapp/etherdaddy.io/'
      }
    },
    async setWalletConnectionStatus(accounts) {
      this.isWalletConnected = !!accounts.length
      if (this.isWalletConnected) {
        if (this.currentWallet) {}
        this.currentWallet = accounts[0].toLowerCase()
      } else {
        this.currentWallet = null
      }
    },
    ethereumRequest(method) {
      const ethereum = window.ethereum

      ethereum.request({
          method
        })
        .then(response => {
          if (method === requestMethods.getAccountsList) {
            this.setWalletConnectionStatus(response)
          }
        })
        .catch(error => {
          if (error.code === walletConnectionProcessStartedErrorCode) {
            this.$notify({
              group: 'app-notifications',
              type: 'error',
              text: 'Wallet connection process already started. Please finish or cancel it.'
            })
          }
          if (error.code === walletConnectionHeaderErrorCode) {}
        })
    },
    switchWallet() {
      const ethereum = window.ethereum

      ethereum.request({
          method: requestMethods.callSwitchWallet,
          params: [{
            eth_accounts: {}
          }]
        })
        .then(() => {})
    },
    async checkNetwork() {
      const netId = await this.web3.eth.getChainId().catch(error => {
        console.log(error)
      })

      switch (netId) {
        case 1:
          console.log('This is mainnet')
          break
        case 2:
          console.log('This is the deprecated Morden test network.')
          break
        case 3:
          console.log('This is the ropsten test network.')
          break
        default:
          console.log('This is an unknown network.')
      }

      if (Number(netId) !== 1) {
        this.web3 = new Web3(infura)

        this.$notify({
          group: 'app-notifications',
          type: 'error',
          text: 'You are on the wrong network. Please switch to Ethereum Mainnet!'
        })
      }

      return Promise.resolve()
    },
    addListeners() {
      window.addEventListener('scroll', this.onScroll)
      window.addEventListener('resize', this.onResize)
      document.addEventListener('gesturestart', function (e) {
        e.preventDefault()
      })
    },
    onScroll(e) {
      this.windowTop = window.pageYOffset
    },
    onResize(state) {
      this.width = window.innerWidth
      this.height = window.innerHeight
      document.body.classList.remove('scroll-off')
    },
    async getAmountOpensea() {
      this.amountOpensea = Cookies.get(`amountOpensea_${this.currentWallet}`) || 0

      const events = await this.contractOpensea.getPastEvents('OrdersMatched', {
        filter: {
          maker: this.currentWallet
        },
        fromBlock: 0,
        toBlock: 'latest'
      }).catch(error => {
        console.log(error)
      })

      let amount = 0

      events.forEach(event => {
        amount += event.returnValues.price / delimiter
      });

      this.amountOpensea = amount

      Cookies.set(`amountOpensea_${this.currentWallet}`, amount)
    },
    async getTransactions() {
      const latestBlock = await this.web3.eth.getBlock('latest');

      const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${this.currentWallet}&startblock=0&endblock=${latestBlock.number}&sort=desc&apikey=ISJRU82G5DAII9QVVVGVY7ERE7GDTFPJY2`).catch(error => {
        console.log(error)
        return error
      })

      console.log(response)

      if (parseInt(response.data.status) !== 1) {
        setTimeout(() => {
          this.getTransactions()
        }, 1500);
      }
    },
    handleTimerCountDown() {
      const currentTime = new Date().getTime()
      const distancPreSaleStart = this.countDown.startTimePreSale - currentTime

      this.countDown.days = Math.floor(distancPreSaleStart / (1000 * 60 * 60 * 24))
      this.countDown.hours = Math.floor(
        (distancPreSaleStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      this.countDown.minutes = Math.floor((distancPreSaleStart % (1000 * 60 * 60)) / (1000 * 60))
      this.countDown.seconds = Math.floor((distancPreSaleStart % (1000 * 60)) / 1000)
    },
    handleTimerPublicSaleCountDown() {
      const currentTime = new Date().getTime()
      const distancPublicSaleStart = this.countDownPublic.startTimePublicSale - currentTime

      this.countDownPublic.days = Math.floor(distancPublicSaleStart / (1000 * 60 * 60 * 24))
      this.countDownPublic.hours = Math.floor(
        (distancPublicSaleStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      this.countDownPublic.minutes = Math.floor((distancPublicSaleStart % (1000 * 60 * 60)) / (1000 * 60))
      this.countDownPublic.seconds = Math.floor((distancPublicSaleStart % (1000 * 60)) / 1000)
    },
    async goTo(link) {
      if (!this.$scrollTo(link)) {
        try {
          await this.$router.push({
            path: '/'
          })
        } catch (error) {}
        setTimeout(() => {
          this.$scrollTo(link)
        }, 500)
      }
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')
