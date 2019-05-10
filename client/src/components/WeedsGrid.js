import React, { Component } from 'react';
import Strains from '../services/Strains';
import StrainLittle from './StrainLittle';

import { Redirect, Link, BrowserRouter } from 'react-router-dom';

class WeedsGrid extends Component {
    constructor(props) {
        super(props);
        this.strainservice = new Strains();
        this.state = {
            strains: []
            };

        this.getStrains()
    }

    getStrains(){
        return this.strainservice.allStrains().then(payload=>{
           this.setState({
               ...this.state,
               strains: payload
           })
       })
    }


    render() {
        console.log(this.state.strains)
        return(
        <div>
            <h2>Weeds Catalog</h2>

            <section>
                <p>{this.state.strains.length}</p>
            </section>
            {
                this.state.strains.map((strain, idx) => {
                    return (
                      <div key={strain._id}>
                          <StrainLittle {...strain}/>
                      </div>
                    )
                })
            }

        </div>
        )
    }

}

export default WeedsGrid;