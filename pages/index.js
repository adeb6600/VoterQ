import React from 'react';
import {geolocated} from 'react-geolocated'

import {Query } from 'react-apollo'

import { RegCenterList, allRegCenterQueryVars } from '../data';
import { Index } from '../containers';





const  loadData = (props)=>(<Query query = {RegCenterList} 
          variables ={allRegCenterQueryVars}>
          {({loading ,error, data, fetchMore})=>(
            <Index 
            loading ={loading}
            error = {error}
            allCenters = {data.allRegCenters || []}
            loadMorePosts= {()=>fetchMore({
                  variables: {
                      skip: data.allRegCenters.length
                  },
                  updateQuery : (previousResult, {fetchMoreResult})=>{
                    if (!fetchMoreResult) {
                        return previousResult
                      }
                      return Object.assign({}, previousResult, {
                        // Append the new posts results to the old one
                        allRegCenters: [...previousResult.allRegCenters, ...fetchMoreResult.allRegCenters]
                      })
                  }
              })
          }
          />
          )
          
        }

</Query>)
  
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(loadData)


