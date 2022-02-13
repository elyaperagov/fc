<template>
  <section class="projects" id="projects">
    <div class="container">
      <h2>Projects</h2>

      <div class="projects__inner">
        <div class="projects__tabs">
          <div class="projects__tab-wrapper" v-for="(tab, i) in tabs" :key="i">
            <p
              class="projects__tab"
              :class="{ 'projects__tab--active': tab.active }"
              @click="toggle(i)"
              v-html="tab.text"
            ></p>
          </div>
        </div>
        <div class="projects__blocks">
          <div v-for="(item, j) in items" v-show="item.active" :key="j" class="projects__block">
            <div class="projects__texts">
              <span class="projects__subtitle" v-html="item.subtitle"></span>
              <div class="projects__content" v-html="item.text"></div>
            </div>
            <div class="projects__img-wrapper">
              <div class="projects__img">
                <img :src="item.img" :alt="item.subtitle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      tabs: [
        {
          active: true,
          text: 'Mars staking'
        },
        {
          active: false,
          text: 'NFT collection'
        },
        {
          active: false,
          text: 'Stablecoin'
        },
        {
          active: false,
          text: 'Axie NFT Token'
        },
        {
          active: false,
          text: 'NFT Game Analytics'
        }
      ],
      items: [
        {
          active: true,
          subtitle: 'Mars staking',
          text: '<p>Development of a staking contract for ERC-20 token.</p><p>Development of a staking contract for ERC-20 token. Solidity Smart Contract development with an original logic and high-security requirements. Adding the ability to update using the developed Proxy contract based on ERC1967 and creating Web interfacefor MVP.</p>',
          img: require('@/assets/img/globe.png')
        },
        {
          active: false,
          subtitle: 'NFT collection',
          text: '<p>Creating an NFT collection on the Ethereum network.</p><p>Development of an ERC721 smart contract for Solidity, which includes the logic of a private presale, gas savings, and limiting the number of sales per wallet.</p><p>Creation of a landing page for mint new tokens, integration with MetaMask and WalletConnect. Generate a collection of pseudo-random images and attributes depending on the weights of different layers types. Create an IPFS node and pin an NFT collection to it. Integration of the collection with the OpenSea auction.</p>',
          img: require('@/assets/img/eth.png')
        },
        {
          active: false,
          subtitle: 'Stablecoin',
          text: '<p>Creation of White Paper for the Stablecoin protocol.</p><p>AlgoEURS is a decentralized finance (DeFi) protocol on Ethereum blockchain that allows users to borrow AEUR, a stablecoin pegged to the euro, using a wide range of on-chain assets as collateral including plain Ether, other stable coins, non-stable fungible tokens, and various non-fungible assets.</p><p>The protocol allows borrowers to insure against the liquidation of the collateral assets and provides a platform for investors to make money as insurers.</p><p>To create the possibility of insuring the collateral and making money on it, the protocol issues AEPUT token on Ethereum blockchain.</p>',
          img: require('@/assets/img/coin.png')
        },
        {
          active: false,
          subtitle: 'Axie NFT Token',
          text: '<p>Creating an NFT collection for authorization.</p><p>Development of an ERC721 smart contract for Solidity on the BSC network for getting verified users one unique key to access other products of in-progress DAO. Creating Proxy Contract for future upgradability and development of NFT-based authorization tools for web and Telegram.</p>',
          img: require('@/assets/img/axie.png')
        },
        {
          active: false,
          subtitle: 'Axie NFT Token',
          text: '<p>Development of a strategy for the onchain NFT game.</p><p>Strategy development to increase the value of the investor`s collection. Smart Contracts audits for Solidity in Ethereum and Polygon networks and creation of a real-time monitoring system with the collection of more than 20 different metrics of in-game mechanics. Setting up Telegram Bots for Instant Analytics</p>',
          img: require('@/assets/img/nft.png')
        }
      ]
    }
  },
  methods: {
    scrollAnimation() {
      const div = document.getElementById('projects')
      if (!div) {
        return
      }
      const divPosition = div.getBoundingClientRect().top + (window.scrollY - 1000)
      const scrollItems = document.querySelectorAll('.projects__tab-wrapper')

      if (window.scrollY >= divPosition) {
        scrollItems.forEach((el, i) => {
          setTimeout(function () {
            const elementPosY = document.documentElement.clientHeight - el.offsetHeight
            if (
              el.getBoundingClientRect().top < elementPosY ||
              el.getBoundingClientRect().top < document.documentElement.clientHeight / 1.5
            ) {
              el.classList.add('is-active')
            } else {
              el.classList.remove('is-active')
            }
          }, 500 + i * 500)
        })
      }
    },
    toggle(i) {
      this.tabs[i].active = !this.tabs[i].active
      this.items[i].active = true
      this.tabs.forEach((element, key) => {
        if (key !== i) {
          element.active = false
        }
      })
      this.items.forEach((element, key) => {
        if (key !== i) {
          element.active = false
        }
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollAnimation()
    })
  }
}
</script>

<style></style>
