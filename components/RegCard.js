const RegCard = (props)=>{
  console.log('reg props', props)
  return(
    <div class="card">
    
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="http://bulma.io/images/placeholders/96x96.png" alt="Image"/>
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{props.center.racc}</p>
            <p class="subtitle is-6">@johnsmith</p>
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
    </div>
)}

export default RegCard