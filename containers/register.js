import React ,{Component}from 'react'
import Layout from "../layout";
import PropTypes from 'prop-types'


export default class Register extends Component { 


    static async getInitialProps ({ req, query}){
   
            return {
               regCenter: query
           }
       
       }
       
       async addRegistrant(event){

        console.log('add reg props',this.props)
        try{
            let newReg =  await this.props.createRegistrant(this.props.firstName,
                this.props.lastName,
                this.props.phoneNumber,
                this.props.regCenter.queue,
                parseInt(this.props.regCenter.lastMan)+1,
                'New',
                 0)
        console.log('new reg', newReg)
        }catch(e){
            console.log('reg error', e)
        }
    
        
    }
   
    render() { 
        return (<Layout>
        <div class="field">
            <label class="label">First Name</label>
            <p class="control">
                <input class="input" name="FirstName" type="text" placeholder="Text input"  onChange={this.props.onChange}/>
            </p>
        </div>
        <div class="field">
            <label class="label">Last Name</label>
            <p class="control">
                <input class="input" name="LastName" type="text" placeholder="Text input" onChange={this.props.onChange} />
            </p>
        </div>
        <div class="field">
            <label class="label">Phone Number</label>
            <p class="control">
                <input class="input" name="PhoneNumber" type="text" placeholder="Text input" onChange={this.props.onChange} />
            </p>
        </div>
        <div class="field is-grouped">
            <p class="control">
                <button class="button is-primary" onClick={this.addRegistrant.bind(this)}>Submit</button>
            </p>
            <p class="control">
                <button class="button is-link">Cancel</button>
            </p>
        </div>

    </Layout>)
    }
}

