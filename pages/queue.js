

import style from '../styles/style.scss';
import Layout from '../layout'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import RegCard from '../components/RegCard'
const POSTS_PER_PAGE = 10
export const Queue = (props) => {
     const{allRegCenters} = props.data
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
            {allRegCenters.map(regCenter=><RegCard center ={regCenter} />)}
        </div>
    </Layout>)
}


export const QueueList = gql`
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
  }
  
}`
export const allQueueQueryVars = {
    skip: 0,
    first: POSTS_PER_PAGE
  }


  export default graphql(QueueList , {
      options: {
          variables: allQueueQueryVars
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
  })(Queue)