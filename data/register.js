import gql from "graphql-tag";

export const getOnQueue = gql`
    mutation createRegistrant(
    $firstName:String!
    $lastName: String!,
    $phoneNumber: String!,
    $queueId: ID!
    $queueNumber:Int!,
    $regType: RegistrationType!,
    $notifCount:Int!){
      createRegistrant(firstName:$firstName,
          lastName:$lastName,
        phoneNumber :$phoneNumber,
        queueId: $queueId,
        regType:$regType,
        queueNumber:$queueNumber,
        notificationCount: $notifCount
        
      ){
      id 
      firstName
      lastName
      queueNumber
      regType
      notificationCount
      queue{
        lastMan
        regCenter {
          id
          ra
          rac
          racc
        }
      }
    }
    }`
  