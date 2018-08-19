
import { geolocated } from 'react-geolocated'
import PropTypes from 'prop-types'
import {  Mutation } from 'react-apollo'
import React from 'react'
import {
    compose, withState, withHandlers, hoistStatics
} from 'recompose'
import { getOnQueue } from '../data/register';
import  Register from '../containers/register';




const mutateRegistrant  = (props) => (<Mutation mutation ={getOnQueue}>
    {(createRegistrant, {data})=>{
      return (<Register  {...props} createRegistrant={createRegistrant}/>)
    }}
</Mutation>)
// const mutateRegistrant = graphql(getOnQueue, {
//     props: ({ ownProps, mutate }) => ({
//         createRegistrant: (firstName, lastName, phoneNumber,queueId, queueNumber, regType, notifCount) =>
//             mutate({
//                 variables: { firstName, lastName, phoneNumber, queueId, queueNumber, regType, notifCount },
//                 // optimisticResponse: {
//                 //     __typename: 'Mutation',
//                 //     updatePost: {
//                 //         __typename: 'Post',
//                 //         id: ownProps.id,
//                 //         votes: ownProps.votes + 1
//                 //     }
//                 // }
//             })
//     })
// })


mutateRegistrant.getInitialProps =  async ({ req, query})=>{
   
    return {
       regCenter: query
   }

}
mutateRegistrant.propTypes = {
   regCenter: PropTypes.object.isRequired
   
 }
const Composer =  compose(
   withState('lastOnQueue', 'getLastOnQueue', 0),
   withState('firstName', 'setFirstName' , ''),
   withState('lastName', 'setLastName',''),
   withState('phoneNumber', 'setPhoneNumber'),
   withHandlers({
    onChange : props=>event=>{
        let funcName = `set${event.target.name}`
        props[funcName](event.target.value)
   },
    addRegistrant: props =>async (event)=>{
        console.log('add reg props',props)
        try{
            let newReg =  await props.createRegistrant(props.firstName,
                props.lastName,
                props.phoneNumber,
                props.regCenter.queue,
                parseInt(props.regCenter.lastMan)+1,
                'New',
                 0)
        console.log('new reg', newReg)
        }catch(e){
            console.log('reg error', e)
        }
    
        
    }
   }),
    geolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    }),

   
)
export default hoistStatics(Composer,{})(mutateRegistrant)

