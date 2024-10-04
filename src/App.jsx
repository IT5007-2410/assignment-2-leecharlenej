const logMessageFlag = true;

/* -------------------------------------------
   Section: Helper functions - Log message
------------------------------------------- */

const logMessage = (message) => {
    if (logMessageFlag) {
        console.log(message);
    };
};

/* -------------------------------------------
   Section: Question 1
------------------------------------------- */
/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, bookingTime: new Date(),
    name: "Jack", phone: 88885555, email: "jack@gmail.com",
    departureTime: new Date(), departureStation: "Singapore",
    arrivalStation: "Bangkok",
  },
  {
    id: 2, bookingTime: new Date(),
    name: "Rose", phone: 88884444, email: "rose@gmail.com",
    departureTime: new Date(), departureStation: "Singapore",
    arrivalStation: "Japan",
  },
];


/* -------------------------------------------
   Section: Question 2
------------------------------------------- */
function Navigation( {setSelectedPage} ) {
  logMessage("Navigation called.");

  return (
    <div>
      <button onClick={() => setSelectedPage(1)}>Homepage</button>
      <button onClick={() => setSelectedPage(2)}>Display Travellers</button>
      <button onClick={() => setSelectedPage(3)}>Add Traveller</button>
      <button onClick={() => setSelectedPage(4)}>Delete Traveller</button>
    </div>
  );
}

function Container( {travellers, setTravellers, selectedPage}) {
  logMessage("Container called.");

  return (
    <div>
    {selectedPage === 1 && <Homepage travellers = {travellers}/>}
    {selectedPage === 2 && <DisplayTravellers travellers = {travellers} setTravellers= {setTravellers}/>}
    {selectedPage === 3 && <AddTraveller travellers = {travellers} setTravellers= {setTravellers}/>}
    {selectedPage === 4 && <DeleteTraveller travellers = {travellers} setTravellers = {setTravellers}/>}
    </div>
  );
}

/* -------------------------------------------
   Section: Question 3
------------------------------------------- */
function DisplayTravellerRow( {traveller}) {
  logMessage("DisplayTravellerRow called.");
  // logMessage(`check: ${JSON.stringify(traveller, null, 2)}`);

  return (
    <>
    <td>{traveller.id}</td>
    <td>{new Date(traveller.bookingTime).toLocaleString()}</td>
    <td>{traveller.name}</td>
    <td>{traveller.phone}</td>
    <td>{traveller.email}</td>
    <td>{new Date(traveller.departureTime).toLocaleString()}</td>
    <td>{traveller.departureStation}</td>
    <td>{traveller.arrivalStation}</td>
    </>
  );
}

function DisplayTravellers({travellers, setTravellers}){
  logMessage("DisplayTravellers called.");
  // logMessage(`check: ${JSON.stringify(travellers, null, 2)}`);

  /* -------------------------------------------
   Section: Question 5 - Delete traveller row.
  ------------------------------------------- */
  const deleteTravellerRow = (id) => {
    const newTravellers = travellers.filter(traveller => traveller.id !== id);
    setTravellers(newTravellers);
  }

  if (travellers.length === 0) {
    return (
      <div>
          <h2>Display Travellers</h2>
          <p>No travellers to display</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Display Travellers</h2>
        <table className="bordered-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Booking Time</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Departure Time</th>
              <th>Departure Station</th>
              <th>Arrival Station</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {travellers.map(traveller =>
            <tr key={traveller.id}>
              <DisplayTravellerRow traveller={traveller} />
              <td><button onClick={()=>deleteTravellerRow(traveller.id)}>Delete</button></td>
            </tr>)}
          </tbody>
        </table>
      </div>);
  }
}

/* -------------------------------------------
   Section: Question 4
------------------------------------------- */
function AddTraveller({travellers, setTravellers}){
  logMessage("AddTraveller called.");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTraveller = {
      id: travellers.length + 1,
      bookingTime: new Date(),
      name: e.target.travellername.value,
      phone: e.target.travellerphone.value,
      email: e.target.travelleremail.value,
      departureTime: e.target.travellerdeparturetime.value,
      departureStation: e.target.travellerdeparturestation.value,
      arrivalStation: e.target.travellerarrivalstation.value,
    };
    
    setTravellers([...travellers, newTraveller]);
    e.target.reset();
  }

  React.useEffect(
    () => {logMessage(`Add new traveller: ${JSON.stringify(travellers, null, 2)}`);}, [travellers]
  );

  return (
    <div>
      <h2>Add Traveller</h2>
      <form name="addTraveller" onSubmit={handleSubmit}>
        <label>Name: <input type="text" name="travellername" placeholder="" required/></label>
        <br/><label>Phone: <input type="text" name="travellerphone" placeholder="" required/></label>
        <br/><label>Email: <input type="email" name="travelleremail" placeholder="" required /></label>
        <br/><label>Departure Time: <input type="datetime-local" name="travellerdeparturetime" placeholder="Departure Time" required/></label>
        <br/><label>Departure Station: <input type="text" name="travellerdeparturestation" placeholder="" required/></label>
        <br/><label>Arrival Station: <input type="text" name="travellerarrivalstation" placeholder="" required/></label>
        <br/><button>Add Traveller</button>
      </form>
    </div>
  );
}

/* -------------------------------------------
  Section: Question 5
------------------------------------------- */
function DeleteTraveller({travellers, setTravellers}){
  logMessage("DeleteTraveller called.");

  const [attribute, setAttribute] = React.useState('');

  const displayAttribute = () => {
    if (attribute === ''){
      return (<>Select a method to delete Traveller!</>);
    }  else {
      const labelName = attribute === 'name' ? 'Name' : 'Booking ID';
      const inputType = attribute === 'name' ? 'text' : 'number';

      return (
        <>
          <form name="deleteTraveller" onSubmit={handleSubmit}>
              <label>{labelName} <input type={inputType} name="travellername" placeholder="" min={attribute==='id'? "0" : undefined} required/></label>
              <button>Delete Traveller</button>
            </form>
        </>
      );
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const travellerToBeDeleted = attribute === 'name' ? e.target.travellername.value : parseInt(e.target.travellername.value);
    const attributeExists = travellers.some(traveller => traveller[attribute] === travellerToBeDeleted);

    if(attributeExists){
      const newTravellers = travellers.filter(traveller => traveller[attribute] !== travellerToBeDeleted);
      setTravellers(newTravellers);
      e.target.reset();
    } else {
      alert('Traveller not found!');
    }
  }

  React.useEffect(
    () => {logMessage(`Deleted traveller: ${JSON.stringify(travellers, null, 2)}`);}, [travellers]
  );

  return (
    <div>
      <h2>Delete Traveller</h2>
      <button onClick = {()=>{setAttribute('name')}}>Delete by Name</button>
      <button onClick = {()=>{setAttribute('id')}}>Delete by Booking ID</button>
      <p></p>
      <div>
      {displayAttribute()}
      </div>
    </div>
  );
}

/* -------------------------------------------
  Section: Question 5
------------------------------------------- */
function Homepage(){
  logMessage("Homepage called.");
  return (
    <div>
      <h2>Homepage</h2>
       {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    </div>
  );
}

/* -------------------------------------------
  Section: Main app
------------------------------------------- */
function TicketToRide() {
  logMessage("TicketToRide called.");
  //logMessage(JSON.stringify(initialTravellers, null, 2));

  const [travellers, setTravellers] = React.useState(initialTravellers);
  const [selectedPage, setSelectedPage] = React.useState(1);

  return (
      <div>
        <h1>Ticket To Ride</h1>

        <Navigation setSelectedPage = {setSelectedPage}/>
        <p></p>
        <Container travellers = {travellers} setTravellers = {setTravellers} selectedPage = {selectedPage} />
          
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
        {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
        {/*Q3. Code to call component that Displays Travellers.*/}
        
        {/*Q4. Code to call the component that adds a traveller.*/}
        {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
      </div>
  );
}

// class TicketToRide extends React.Component {
//   constructor() {
//     super();
//     this.state = { travellers: [], selector: 1};
//     this.bookTraveller = this.bookTraveller.bind(this);
//     this.deleteTraveller = this.deleteTraveller.bind(this);
//   }

//   setSelect(value)
//   {
//   	/*Q2. Function to set the value of component selector variable based on user's button click.*/
//   }
//   componentDidMount() {
//     this.loadData();
//   }

//   loadData() {
//     setTimeout(() => {
//       this.setState({ travellers: initialTravellers });
//     }, 500);
//   }

//   bookTraveller(passenger) {
// 	    /*Q4. Write code to add a passenger to the traveller state variable.*/
//   }

//   deleteTraveller(passenger) {
// 	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
//   }
//   render() {
//     return (
//       <div>
//         <h1>Ticket To Ride</h1>
// 	<div>
// 	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
// 	</div>
// 	<div>
// 		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
// 		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
// 		{/*Q3. Code to call component that Displays Travellers.*/}
		
// 		{/*Q4. Code to call the component that adds a traveller.*/}
// 		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
// 	</div>
//       </div>
//     );
//   }
// }


const element = <TicketToRide />;
ReactDOM.render(element, document.getElementById('contents'));
