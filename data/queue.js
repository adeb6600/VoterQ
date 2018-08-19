import gql from "graphql-tag";
const POSTS_PER_PAGE = 10

export const QueueList = gql`
query getQueue($queueId:ID! ,$first: Int!, $skip: Int!) {
    Queue(id:$queueId) {
      lastMan
      registrants(first: $first, skip: $skip){
        id
        firstName
        lastName
        queueNumber
      }
      regCenter{
        longitude
        latitude
        lga{
          id
          name
        }
        ra
        rac
        racc
      }
    }
  }`
export const allQueueQueryVars = {
    skip: 0,
    first: POSTS_PER_PAGE
  }