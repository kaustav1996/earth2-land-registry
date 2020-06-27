import React, { Component } from 'react';
import SmartDataTable from 'react-smart-data-table'

const sematicUI = {
  segment: 'ui segment',
  message: 'ui message',
  labeledInput: 'ui right labeled input',
  iconInput: 'ui icon input',
  searchIcon: 'search icon',
  rowsIcon: 'numbered list icon',
  table: 'ui compact selectable table',
  select: 'ui dropdown',
  refresh: 'ui labeled primary icon button',
  refreshIcon: 'sync alternate icon',
  change: 'ui labeled secondary icon button',
  changeIcon: 'exchange icon',
  checkbox: 'ui toggle checkbox',
  loader: 'ui active text loader',
  deleteIcon: 'trash red icon',
}

const apiDataUrls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/todos',
  'https://jsonplaceholder.typicode.com/albums',
  'https://jsonplaceholder.typicode.com/photos',
]
// const generateData = (numResults = 0) => {
//   const data = this.props.products.map((product) => ({
//     id: product.id.toString() , 
//     name: product.name,
//     email:product.email,
//     latitude: product.latitude,
//     longitude:product.longitude,
//     land : window.web3.utils.fromWei((product.price/0.13).toString(), 'Ether'),
//     owner : product.owner
//   })
//   );
//   return data
// }

class Main extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      useApi: false,
      apiData: '',
      apiIdx: -1,
      numResults: 10,
      data: [],
      filterValue: '',
      perPage: 0,
      showOnRowClick: true,
      changeOrder: false,
      orderedHeaders: [
        'id',
        'name',
        'email',
        'latitude',
        'longitude',
        'land',
        'owner',
      ],
      hideUnordered: false,
    }

    this.setNewData = this.setNewData.bind(this)
    this.setApiData = this.setApiData.bind(this)
    this.changeData = this.changeData.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnPerPage = this.handleOnPerPage.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.onRowClick = this.onRowClick.bind(this)
    this.handleOnChangeOrder = this.handleOnChangeOrder.bind(this)
  }

  componentDidMount() {
    const { numResults } = this.state
    this.setNewData(numResults)
    this.setApiData()
  }
  setNewData() {
    const { numResults } = this.state
    const data = this.props.products.map((product) => ({
      id: product.id.toString() , 
      name: product.name,
      email:product.email,
      latitude: parseInt(product.latitude)-90,
      longitude:parseInt(product.longitude)-180,
      land : window.web3.utils.fromWei((product.price/0.13).toString(), 'Ether'),
      owner : product.owner
    })
    );
    this.setState({
      data: data,
    })
  }

  setApiData() {
    let { apiIdx } = this.state
    const N = apiDataUrls.length
    apiIdx += 1
    if (apiIdx === N) apiIdx -= N
    const apiData = apiDataUrls[apiIdx]
    this.setState({ apiData, apiIdx })
  }
  handleDelete(event, idx, row) {
    event.preventDefault()
    event.stopPropagation()
    const { data } = this.state
    const { _id, id } = row
    let orgInd
    if (_id) orgInd = data.findIndex(({ _id: thisId }) => thisId === _id)
    if (id) orgInd = data.findIndex(({ id: thisId }) => thisId === id)
    data.splice(orgInd, 1)
    this.setState({ data })
  }

  handleOnChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      if (name === 'numResults') this.setNewData()
    })
  }

  handleOnChangeOrder(now, next) {
    const { orderedHeaders } = this.state
    const N = orderedHeaders.length
    let nextPos = next
    if (next < 0) {
      nextPos = N
    }
    if (next >= N) {
      nextPos = 0
    }
    const newOrderedHeaders = [...orderedHeaders]
    const mvElement = newOrderedHeaders.splice(now, 1)[0]
    newOrderedHeaders.splice(nextPos, 0, mvElement)
    this.setState({ orderedHeaders: newOrderedHeaders })
  }

  handleOnPerPage({ target: { name, value } }) {
    this.setState({ [name]: parseInt(value, 10) })
  }

  changeData() {
    const { useApi } = this.state
    this.setState({
      useApi: !useApi,
      filterValue: '',
      perPage: 0,
    })
  }

  handleCheckboxChange({ target: { name, checked } }) {
    this.setState({ [name]: checked })
  }

  onRowClick(event, { rowData, rowIndex, tableData }) {
    const { showOnRowClick } = this.state
    if (showOnRowClick) {
      const { fullName, name, id } = rowData
      let value = fullName || name || id
      if (!value) {
        const [key] = Object.keys(rowData)
        value = `${key}: ${rowData[key]}`
      }
      /* eslint-disable no-alert */
      window.alert(`You clicked ${value}'s row !`)
    } else {
      // The following results should be identical
      /* eslint-disable no-console */
      console.log(rowData, tableData[rowIndex])
    }
  }

  render() {


    const {
      useApi, apiData, data, filterValue, perPage, numResults, showOnRowClick,
      changeOrder, orderedHeaders, hideUnordered,
    } = this.state

    const divider = <span style={{ display: 'inline-block', margin: '10px' }} />
    const headers = {
      id: {
        text: 'Id',
        invisible: false,
        filterable: false,
      },
      name: {
        text: 'Name',
        sortable: false,
        filterable: true,
      },
      email: {
        text: 'Email',
        sortable: false,
        filterable: true,
      },
      latitude: {
        text: 'Latitude',
        sortable: false,
        filterable: true,
      },
      longitude: {
        text: 'Longitude',
        sortable: false,
        filterable: true,
      },
      land: {
        text: 'Land ( Acres )',
        sortable: true,
        filterable: true,
      },
      owner: {
        text: 'Owner Address',
        sortable: false,
        filterable: true,
      }
    }
    
    return (
      
      <>
      <div className="container-flex">
      <div className="row ">
      <div className="mx-auto">
      <div className="card-header">
        <h1>Earth 2.0 Land Blockchain Registry</h1>
        <code>Buy Earth 2.0 (Virtual Earth) Land using Ether and stay in the registry forever.<br></br> 
        We will send you a certificate with your wallet address and name in your mail signed by our owner.<br></br>
        Cheers !! :) 
        </code>
        <br></br>
        <br></br>
      </div>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productOwnerName.value
          const email = this.productOwnerEmail.value
          const latitude = (parseInt(this.productLatitude.value)+90).toString()
          const longitude = (parseInt(this.productLongitude.value)+180).toString()
          const price = window.web3.utils.toWei((this.productPrice.value*0.13).toString(), 'Ether')
          this.props.createProduct(name , email ,latitude,longitude, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productOwnerName"
              type="text"
              ref={(input) => { this.productOwnerName = input }}
              className="form-control"
              placeholder="Name of the owner"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productOwnerEmail"
              type="email"
              ref={(input) => { this.productOwnerEmail = input }}
              className="form-control"
              placeholder="Email of Owner"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productLatitude"
              type="number"
              min="-90" max="+90"
              placeholder="1.00000" step="0.00001"
              ref={(input) => { this.productLatitude = input }}
              className="form-control"
              placeholder="Product Latitude"
              required />
          </div>
          
          <div className="form-group mr-sm-2">
            <input
              id="productLongitude"
              type="number"
              min="-180" max="+180"
              laceholder="1.00000" step="0.00001"
              ref={(input) => { this.productLongitude = input }}
              className="form-control"
              placeholder="Product Longitude"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="number"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Enter Land Size in Acre (Price : 0.13 / Acre)"
              required />
          </div>
          <button type="submit" className="btn btn-primary ">Buy Earth 2.0 Land</button>
        </form>
        <p>&nbsp;</p>
        </div>
        </div>
      <div className="row">
      <div className="col-sm-12">
        <h2>Land Registry Blockchain</h2>
        <div className={sematicUI.segment}>
          <div className={sematicUI.iconInput}>
            <input
              type='text'
              name='filterValue'
              value={filterValue}
              placeholder='Filter results...'
              onChange={this.handleOnChange}
            />
            <i className={sematicUI.searchIcon} />
          </div>
          {/* <div className={sematicUI.checkbox}>
            <input
              type='checkbox'
              name='showOnRowClick'
              onChange={this.handleCheckboxChange}
              checked={showOnRowClick}
            />
            <label>
              Show alert on row click
            </label>
          </div>
          {divider}
          <div className={sematicUI.checkbox}>
            <input
              type='checkbox'
              name='changeOrder'
              onChange={this.handleCheckboxChange}
              checked={changeOrder}
            />
            <label>
              Change header order
            </label>
          </div>
        </div>
        {changeOrder && (
          <div className={sematicUI.segment}>
            {orderedHeaders.map((header, idx) => (
              <div key={header} style={{ marginBottom: '4px' }}>
                <div className={sematicUI.labeledInput} style={{ marginRight: '8px' }}>
                  <input
                    type='text'
                    name={header}
                    value={idx}
                    placeholder='Index'
                    style={{ width: '80px' }}
                    disabled
                  />
                  <div className='ui label'>
                    {header}
                  </div>
                </div>
                <button
                  type='button'
                  onClick={() => this.handleOnChangeOrder(idx, idx - 1)}
                >
                  before
                </button>
                <button
                  type='button'
                  onClick={() => this.handleOnChangeOrder(idx, idx + 1)}
                >
                  after
                </button>
              </div>
            ))}
          </div>
        )}
        <div className={sematicUI.message}> */}
          
        </div>
        {divider}
        <label>Show per page&nbsp;&nbsp;</label>
          <select
            name='perPage'
            value={perPage}
            className={sematicUI.select}
            onChange={this.handleOnPerPage}
          > 
          <option value='0'>
              Choose
            </option>
            <option value='10'>
              10
            </option>
            <option value='25'>
              25
            </option>
            <option value='50'>
              50
            </option>
            <option value='100'>
              100
            </option>
          </select>
          <p>
            {useApi
              ? 'While using async data, the state is controlled internally by the table'
              : `Total Land Registration: ${data.length}`}
          </p>
        <SmartDataTable
          data={data}
          dataKey=''
          headers={headers}
          orderedHeaders={orderedHeaders}
          hideUnordered={hideUnordered}
          name='land-registry'
          className={sematicUI.table}
          filterValue={filterValue}
          perPage={perPage}
          sortable
          withToggles
          withHeader
          loader={(
            <div className={sematicUI.loader}>
              Loading...
            </div>
          )}
          dynamic
          emptyTable={(
            <div className={sematicUI.message}>
              There is no data available to display.
            </div>
          )}
        />
        
        </div>
        </div>
      </div>
      </>
    )
  }
}

export default Main;
