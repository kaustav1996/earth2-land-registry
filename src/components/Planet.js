import React, { Component } from 'react';
import Globe from 'react-globe.gl';
import * as d3 from 'd3';




class Planet extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
          data: [],
        }
    
        this.setNewData = this.setNewData.bind(this)
      }
    
      componentDidMount() {
        const { numResults } = this.state
        this.setNewData(numResults)
      }
      setNewData() {
        const { numResults } = this.state
        if(this.props.products){
        const data = this.props.products.map((product) => ({
          
          id: product.id.toString() , 
          name: product.name,
          email:product.email,
          latitude: product.latitude,
          longitude:product.longitude,
          owner : product.owner,
          lat: +(parseInt(product.latitude)-90),
          lng: +(parseInt(product.longitude)-180),
          land: +parseInt(window.web3.utils.fromWei((product.price/0.13).toString(), 'Ether')),
          // color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
        })
        );
        this.setState({
          data: data,
        })
      }
      else{
        console.log('No Data in Props');
      }
      }

render() {
    const {
        data
      } = this.state
      // console.log(data)
      const weightColor = d3.scaleSequentialSqrt(d3.interpolateYlOrRd)
      .domain([0, 1e7])
      // console.log(data)
      function mousehover(d){
        var result=``
        d.points.forEach(element => {
          result=result+`<div>ID : <b>${element.id}</b></div>
          <div>${element.name} - ${element.owner}</div>
        <div> Land :  <i>${element.land}</i></div>`
        });
        return result
      }
      
return (
  <>


    <div className='container-flex planet'>
<Globe
      width={700}
      height={600}
      
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      // labelsData={data}
      // labelLat={d => d.lat}
      // labelLng={d => d.lng}
      // labelText={d => d.name}
      // labelSize={1.7}
      // labelDotRadius={0.4}
      // labelColor={() => 'rgba(255, 165, 0, 0.75)'}
      // labelResolution={2}
      // labelLabel={d => `
      //   <div><b> Owner : ${d.owner}</b></div>
      //   <div>Land Owned (Acres) : <i>${d.land}</i></div>
      // `}
      // onLabelClick={d => window.open('http://www.banerjee.life', '_blank')}
      hexBinPointsData={data}
      hexBinPointLat='lat'
      hexBinPointLng='lng'
      hexBinPointWeight="land"
      hexAltitude={d => d.sumWeight*10000*6e-8}
      hexBinResolution={4}
      enablePointerInteraction={true}
      hexTopColor={d => Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}
      hexSideColor={d => Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}
      hexBinMerge={false}
      hexLabel={d => 
        `${ 
          mousehover(d)
         }`
        }

    />
    </div>

</>
    )
  }
}

export default Planet;