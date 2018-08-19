

import React  from 'react';
import { Query } from 'react-apollo'
import { compose ,withState , hoistStatics } from 'recompose';
import { QueueList, allQueueQueryVars } from '../data/queue';
import { Queue } from '../containers/queue';




  const listRegistrant =  (props)=>{
      console.log('list registrant props', props)
      return (<Query query = {QueueList} 
    variables ={{...allQueueQueryVars,queueId: props.Queryinfo.queue}}>
    {({loading ,error, data, fetchMore})=>(
      <Queue 
      loading ={loading}
      error = {error}
      queue = {data.Queue}
      loadMoreOnQueue= {()=>fetchMore({
            variables: {
                skip: data.Queue.registrants.length
            },
            updateQuery : (previousResult, {fetchMoreResult})=>{
              if (!fetchMoreResult) {
                  return previousResult
                }
                return Object.assign({}, previousResult, {
                  // Append the new posts results to the old one
                  allRegCenters: [...previousResult.Queue, ...fetchMoreResult.Queue]
                })
            }
        })
    }
    />
    )
    
  }

</Query>)}

listRegistrant.getInitialProps =  async ({ req, query})=>{
  
    return {
        myName: 'queue',
       Queryinfo: query
   }
 
 }
//  Queue.propTypes = {
//    Queryinfo: PropTypes.object.isRequired
//    }

const Composer = compose(
    withState('pageName', 'setPageName','queue page')
)


export default  hoistStatics(Composer, {})(listRegistrant)
 
