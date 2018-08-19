import Layout from "../layout";
import RegCard from "../components/RegCard";
import PropTypes from 'prop-types'
import Registrant from "../components/Registrant";

import React  from 'react';

export const Queue = (props) => {
    console.log('Queue props', props)
     const{registrants} = props.queue
   return (<Layout>
       <div class="field is-grouped">
           <p class="control is-expanded">
               <input class="input" type="text" placeholder="Enter your Phone  Number" />
           </p>
           <p class="control">
               <a class="button is-info">
                   Search
          </a>
           </p>
       </div>
       <div class="container">
           {registrants.map(person =><Registrant person={person} />)}
       </div>
   </Layout>)
}


Queue.getInitialProps =  async ({ req, query})=>{
  
   return {
      Queryinfo: query
  }

}
Queue.propTypes = {
  Queryinfo: PropTypes.object.isRequired
  
}