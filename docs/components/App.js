import React, { Component }  from 'react';
import Web3 from 'web3'
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './Navbar'
import Main from './Main'
import Planet from './Planet'

class App extends Component {
  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      this.setState({ productCount })
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }

    this.createProduct = this.createProduct.bind(this)
  }

  createProduct(name,email,latitide , longitude , price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name,email,latitide , longitude , price).send({ from: this.state.account  , value: price})
    .once('transactionHash', (receipt) => {
      console.log('Accepted')
      window.location.reload(true);
    })  
    .once('error', (receipt) => {
      console.log('rejected')
      window.location.reload(true);
    })
  //   .on("transactionHash", function () {
  //     console.log("Hash")
  // })
  // .on("receipt", function () {
  //     console.log("Receipt");
  // })
  // .on("confirmation", function () {
  //     console.log("Confirmed");
  // })
  // .on("error", async function () {
  //     console.log("Error");
  // });
  }

  // purchaseProduct(id, price) {
  //   this.setState({ loading: true })
  //   this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
  //   .once('receipt', (receipt) => {
  //     this.setState({ loading: false })
  //   })
  // }
  setNewData() {
    const data = this.props.products.map((product) => ({
      id: product.id.toString() , 
      name: product.name,
      email:product.email,
      latitude: product.latitude,
      longitude:product.longitude,
      land : window.web3.utils.fromWei((product.price/0.13).toString(), 'Ether'),
      owner : product.owner
    })
    );
    this.setState({
      data: data,
    })
  }
  render() {
    
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="main">
              { this.state.loading
                ? <div className="main-wrapper">
                    <div className="sphere-wrapper">
                <div className="plane plane-1">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                <div className="plane plane-2">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                <div className="plane plane-3">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                 <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                <div className="plane plane-4">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                <div className="plane plane-5">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                <div className="plane plane-6">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                <div className="plane plane-7">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                <div className="plane plane-8">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                <div className="plane plane-9">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                <div className="plane plane-10">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                 <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                <div className="plane plane-11">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                <div className="plane plane-12">
                <div className="spoke spoke-1">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-2">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-3">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-4">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-5">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-6">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-7">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-8">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-9">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-10">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-11">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-12">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-13">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-14">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-15">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-16">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-17">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-18">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-19">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-20">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-21">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-22">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-23">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-24">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-25">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-26">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-27">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-28">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-29">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-30">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-31">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-32">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-33">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-34">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-35">
                <div className="dot"></div>
                </div>
                <div className="spoke spoke-36">
                <div className="dot"></div>
                </div>
                </div>
                </div>
                  </div>
                :
               <> <Planet
               products={this.state.products}
               />
                <Main
                  products={this.state.products}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct} />  </>           
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
