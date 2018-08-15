
import style from '../styles/style.scss';
import Layout from '../layout'
const Register = () => {

    return <Layout>
     <div class="field">
       <label class="label">First Name</label>
       <p class="control">
         <input class="input" type="text" placeholder="Text input" />
       </p>
     </div>
     <div class="field">
       <label class="label">Last Name</label>
       <p class="control">
         <input class="input" type="text" placeholder="Text input" />
       </p>
     </div>
     <div class="field">
       <label class="label">Phone Number</label>
       <p class="control">
         <input class="input" type="text" placeholder="Text input" />
       </p>
     </div>
     <div class="field is-grouped">
       <p class="control">
         <button class="button is-primary">Submit</button>
       </p>
       <p class="control">
         <button class="button is-link">Cancel</button>
       </p>
     </div>

    </Layout>
}

export default Register