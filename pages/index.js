import React from 'react';
import style from '../styles/style.scss';
import Layout from '../layout'
import {geolocated} from 'react-geolocated'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link' 
import {
  compose
} from 'recompose'
const POSTS_PER_PAGE = 10

const Index = (props) => {
  console.log('regit props', props.data)
  const { loading ,allRegCenters} = props.data
  
  return (
  <Layout>

    <div className="container is-mobile">
      
      <section class="columns">
        {!loading && allRegCenters.map(center=>( <div key={center.id} class="column">
         <div class="card ">
           <div class="card-content">
             <div class="media">
               <div class="media-left">
                 <figure class="image is-48x48">
                   <img src="http://bulma.io/images/placeholders/96x96.png" alt="Image"/>
                 </figure>
               </div>
               <div class="media-content">
                 <p class="title is-4">{center.rac}</p>
                
               </div>
             </div>
         
             <div class="content">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
               Phasellus nec iaculis mauris. <a>@bulmaio</a>.
               <a>#css</a> <a>#responsive</a>
               <br/>
               <small>11:09 PM - 1 Jan 2016</small>
             </div>
           </div>
           <div class="card-footer is-pulled-right">
           <Link href={{ pathname: '/register', query: { id : center.id ,
             queue: center.queue.id,
             lastMan: center.queue.lastMan,
             ra:center.ra,
             rac: center.rac,
             racc: center.racc,
             lgaCode: center.lgaCode,
             lgaName: center.lga.name,
             lgaId: center.lga.id
               } }}>
           <a class="button is-primary ">Register</a>
    </Link>
          
             </div>
         </div>
        </div>))}
       
      </section>
    </div>
   
  </Layout>
)};


export const RegCenterList = gql`
query allRegCenters($first: Int!, $skip: Int!) {
    allRegCenters( first: $first, skip: $skip) {
		queue {
      id
      lastMan
    }
    lga{
      name
      id
    }
    state{
      name
      id
    }
    lgaCode
   ra
   rac
   racc
   id
  }
  
}`
export const allRegCenterQueryVars = {
    skip: 0,
    first: POSTS_PER_PAGE
  }


  const loadData = graphql(RegCenterList , {
      options: {
          variables: allRegCenterQueryVars
      }, 
      props : ({data})=>{
          return ({
              data , 
              loadMorePosts: ()=>{
                  return data.fetchMore({
                      variables: {
                          skip: data.allRegCenters.length
                      },
                      updateQuery : (previousResult, {fetchMoreResult})=>{
                        if (!fetchMoreResult) {
                            return previousResult
                          }
                          return Object.assign({}, previousResult, {
                            // Append the new posts results to the old one
                            allPosts: [...previousResult.allRegCenters, ...fetchMoreResult.allRegCenters]
                          })
                      }
                  })
              }
          })
      }
  })
export default compose(
  geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
}) ,
loadData
)(Index);


