
import style from '../styles/style.scss';
import Layout from '../layout';

import React from 'react';
import Link from 'next/link' 


export const Index = (props) => {
  
    const { loading ,allCenters} = props
    
    return (
    <Layout>
  
      <div className="container is-mobile">
        
        <section class="columns">
          {!loading && allCenters.map(center=>( <div key={center.id} class="column">
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
             <Link href={{ pathname: '/queue', query: { id : center.id ,
               queue: center.queue.id,
               lastMan: center.queue.lastMan,
               ra:center.ra,
               rac: center.rac,
               racc: center.racc,
               lgaCode: center.lgaCode,
               lgaName: center.lga.name,
               lgaId: center.lga.id
                 } }}>
             <a class="button is-warning ">View Line</a>
      </Link>
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
  