
import style from '../styles/style.scss';
import { geolocated } from 'react-geolocated'
import Layout from '../layout'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import {
    compose, withState, withHandlers, hoistStatics
} from 'recompose'
import gql from 'graphql-tag';


const Register = (props) => {
    console.log('register props', props)
    return <Layout>
        <div class="field">
            <label class="label">First Name</label>
            <p class="control">
                <input class="input" name="FirstName" type="text" placeholder="Text input"  onChange={props.onChange}/>
            </p>
        </div>
        <div class="field">
            <label class="label">Last Name</label>
            <p class="control">
                <input class="input" name="LastName" type="text" placeholder="Text input" onChange={props.onChange} />
            </p>
        </div>
        <div class="field">
            <label class="label">Phone Number</label>
            <p class="control">
                <input class="input" name="PhoneNumber" type="text" placeholder="Text input" onChange={props.onChange} />
            </p>
        </div>
        <div class="field is-grouped">
            <p class="control">
                <button class="button is-primary" onClick={props.addRegistrant}>Submit</button>
            </p>
            <p class="control">
                <button class="button is-link">Cancel</button>
            </p>
        </div>

    </Layout>
}

Register.getInitialProps =  async ({ req, query})=>{
   
     return {
        regCenter: query
    }

}
Register.propTypes = {
    regCenter: PropTypes.object.isRequired
    
  }

const getOnQueue = gql`
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
    }
  
`
const mutateRegistrant = graphql(getOnQueue, {
    props: ({ ownProps, mutate }) => ({
        createRegistrant: (firstName, lastName, phoneNumber,queueId, queueNumber, regType, notifCount) =>
            mutate({
                variables: { firstName, lastName, phoneNumber, queueId, queueNumber, regType, notifCount },
                // optimisticResponse: {
                //     __typename: 'Mutation',
                //     updatePost: {
                //         __typename: 'Post',
                //         id: ownProps.id,
                //         votes: ownProps.votes + 1
                //     }
                // }
            })
    })
})


const Composer =  compose(
    mutateRegistrant,

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
export default hoistStatics(Composer,{})(Register)

