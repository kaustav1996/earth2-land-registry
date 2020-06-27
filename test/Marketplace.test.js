const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
  let marketplace

  before(async () => {
    marketplace = await Marketplace.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await marketplace.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await marketplace.name()
      assert.equal(name, 'Earth 2.0 Land Blockchain Registry')
    })
  })

  describe('products', async () => {
    let result, productCount

    before(async () => {
      result = await marketplace.createProduct('name','email','10','20', 1,{ from: buyer, value: web3.utils.toWei('1', 'Ether')})
      productCount = await marketplace.productCount()
    })

    it('creates and sells products', async () => {
      // Track the seller balance before purchase
      let oldSellerBalance
      oldSellerBalance = await web3.eth.getBalance(deployer)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)

      // SUCCESS: Buyer makes purchase
      result = await marketplace.createProduct('name','email','10','20', 1,{ from: buyer, value: web3.utils.toWei('1', 'Ether')})
      // Check logs
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), productCount.toNumber()*2, 'id is correct')
      assert.equal(event.name, 'Earth 2.0 Land Blockchain Registry', 'name is correct')
      assert.equal(event.latitude, '10', 'latitude is correct')
      assert.equal(event.email, ':)', 'email is correct')
      assert.equal(event.longitude, '20', 'longitude is correct')
      assert.equal(event.price.toNumber(), 1, 'price is correct')
      assert.equal(event.owner, deployer, 'owner is correct')
      assert.equal(event.purchased, false, 'purchased is correct')
      const event1 = result.logs[1].args
      assert.equal(event1.id.toNumber(), productCount.toNumber()*2, 'id is correct')
      assert.equal(event1.name, 'name', 'name is correct')
      assert.equal(event1.latitude, '10', 'latitude is correct')
      assert.equal(event1.email, 'email', 'email is correct')
      assert.equal(event1.longitude, '20', 'longitude is correct')
      assert.equal(event1.price.toNumber(), 1, 'price is correct')
      assert.equal(event1.owner, buyer, 'owner is correct')
      assert.equal(event1.purchased, true, 'purchased is correct')

      // Check that seller received funds
      let newSellerBalance
      newSellerBalance = await web3.eth.getBalance(deployer)
      newSellerBalance = new web3.utils.BN(newSellerBalance)

      let price
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)

      const exepectedBalance = oldSellerBalance.add(price)

      assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

    })

    it('lists products', async () => {
      const product = await marketplace.products(productCount)
      assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
      assert.equal(product.name, 'name', 'name is correct')
      assert.equal(product.email, 'email', 'email is correct')
      assert.equal(product.latitude, '10', 'latitude is correct')
      assert.equal(product.longitude, '20', 'longitude is correct')
      assert.equal(product.price, '1', 'price is correct')
      assert.equal(product.owner, buyer, 'owner is correct')
      assert.equal(product.purchased, true, 'purchased is correct')
    })
  })
})
