import gql from "graphql-tag";
const POSTS_PER_PAGE = 10


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