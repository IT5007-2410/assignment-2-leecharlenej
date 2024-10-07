const logMessageFlag = true;
const totalNumSeats = 10;

const departureStation = "Singapore Station";
const arrivalStation = "Bangkok Station";
const departureTime = new Date(2024, 9, 10, 8, 15, 0).toLocaleString();

/* -------------------------------------------
   Section: CSS
------------------------------------------- */
const mainStyle = {
  fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontSize: '14px',
  color: '#33312f',
  lineHeight: '1.5',
}

const headerStyle ={
  margin: '0px 0px 5px 0px',
}

const navStyle = {
  backgroundColor: '#e8f1fa',
  borderBottom: '1px solid #33312f',
  padding: '10px',
}

const containerStyle = {
  paddingLeft: '10px',
  paddingRight: '10px',
  display: 'grid',
  gridTemplateColumns: '20% auto',
}

const seatDetailsStyle = {
  width: '50px',
}

const trainLayoutStyle = {
  border: '1px solid #33312f',
  display: 'grid',
  gridTemplateRows: 'repeat(3,auto)',
  justifyItems: 'center',
  width: '120px',
  gap: '5px',
}

const seatLayoutStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 20px)',
  gridGap: '10px',
}

const legendStyle = {
  display: 'grid',
  gridTemplateColumns: '80px 80px 100px',
}

const seatStyle = (seatColor) => ({
  backgroundColor: seatColor,
  width: '20px',
  height: '20px',
  border: '1px solid black',
  display: 'inline-block',
});

/* -------------------------------------------
   Section: Helper functions/ components - Log message, TrainDetails, SeatDetails
------------------------------------------- */
const logMessage = (message) => {
    if (logMessageFlag) {
        console.log(message);
    };
};

const TrainDetails = () => {
  logMessage("TrainDetails called.");

  return (
    <div>
      <h3>Train details</h3>
      <table className="bordered-table">
        <tbody>
          <tr>
            <td><strong>Departure Station</strong></td>
            <td>{departureStation}</td>
          </tr>
          <tr>
            <td><strong>Arrival Station</strong></td>
            <td>{arrivalStation}</td>
          </tr>
          <tr>
            <td><strong>Departure Time</strong></td>
            <td>{departureTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const SeatDetails = ({seatNumOccupied, seatNumEmpty}) => {
  logMessage("SeatDetails called.");

  return (
    <div>
      <h3>Seat details</h3>
      <table className="bordered-table">
        <tbody>
          <tr>
            <td><strong>Total Seats</strong></td>
            <td style={seatDetailsStyle}>{totalNumSeats}</td>
          </tr>
          <tr>
            <td><strong>Occupied Seats</strong></td>
            <td style={seatDetailsStyle}>{seatNumOccupied}</td>
          </tr>
          <tr>
            <td><strong>Empty Seats</strong></td>
            <td style={seatDetailsStyle}>{seatNumEmpty}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------------------
   Section: Question 1
------------------------------------------- */
const initialTravellers = [
  {
    id: 1, bookingTime: new Date(),
    name: "Jack", phone: 88885555, email: "jack@gmail.com", mealOption: "Vegetarian",
    departureTime: departureTime, departureStation: departureStation,
    arrivalStation: arrivalStation,
    emergencyContact: {name: "Jill", phone: 88886666},
  },
  {
    id: 2, bookingTime: new Date(),
    name: "Rose", phone: 88884444, email: "rose@gmail.com", mealOption: "NA",
    departureTime: departureTime, departureStation: departureStation,
    arrivalStation: arrivalStation,
    emergencyContact: {name: "James", phone: 88887777},
  },
];


/* -------------------------------------------
   Section: Question 2
------------------------------------------- */
function Navigation( {setSelectedPage} ) {
  logMessage("Navigation called.");

  return (
    <>
      <button style={{...mainStyle, marginRight: '5px'}} onClick={() => setSelectedPage(1)}>Homepage</button>
      <button style={{...mainStyle, marginRight: '5px'}} onClick={() => setSelectedPage(2)}>Display Travellers</button>
      <button style={{...mainStyle, marginRight: '5px'}} onClick={() => setSelectedPage(3)}>Add Traveller</button>
      <button style={mainStyle} onClick={() => setSelectedPage(4)}>Delete Traveller</button>
    </>
  );
}

function Container( {selectedPage, travellers, setTravellers} ) {
  logMessage("Container called.");

  return (
    <>
    {selectedPage === 1 && <Homepage travellers = {travellers} />}
    {selectedPage === 2 && <DisplayTravellers travellers = {travellers} setTravellers= {setTravellers} />}
    {selectedPage === 3 && <AddTraveller travellers = {travellers} setTravellers= {setTravellers} />}
    {selectedPage === 4 && <DeleteTraveller travellers = {travellers} setTravellers = {setTravellers} />}
    </>
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
    <td>{traveller.mealOption}</td>
    <td>{new Date(traveller.departureTime).toLocaleString()}</td>
    <td>{traveller.departureStation}</td>
    <td>{traveller.arrivalStation}</td>
    <td>{traveller.emergencyContact.name}</td>
    <td>{traveller.emergencyContact.phone}</td>
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
          <p>No travellers to display.</p>
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
              <th>Meal Option</th>
              <th>Departure Time</th>
              <th>Departure Station</th>
              <th>Arrival Station</th>
              <th>Emergency Contact</th>
              <th>Emergency Contact Phone</th>
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
  logMessage(`SeatNumEmpty: ${seatNumEmpty}`);

  const seatNumEmpty = totalNumSeats - travellers.length;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTraveller = {
      id: travellers.reduce((maxId, traveller) => traveller.id > maxId ? traveller.id : maxId, 0) + 1,
      bookingTime: new Date(),
      name: e.target.travellerName.value,
      phone: e.target.travellerPhone.value,
      email: e.target.travellerEmail.value,
      mealOption: e.target.mealOption.value,
      departureTime: departureTime,
      departureStation: departureStation,
      arrivalStation: arrivalStation,
      emergencyContact: {
        name: e.target.emergencyContactName.value,
        phone: e.target.emergencyContactPhone.value,
      },
    };
    
    setTravellers([...travellers, newTraveller]);
    e.target.reset();
  }

  React.useEffect(
    () => {logMessage(`Add new traveller: ${JSON.stringify(travellers, null, 2)}`);}, [travellers]
  );

  if (seatNumEmpty === 0) {
    return (
      <div>
        <h2>Add Traveller</h2>
        <p>Empty seats available: {seatNumEmpty}</p>
        <p>No more seats are available.</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Add Traveller</h2>
        <p>Empty seats available: {seatNumEmpty}</p>
        <form name="addTraveller" onSubmit={handleSubmit}>
          <label>Name: <input type="text" name="travellerName" placeholder="" required/></label>
          <br/><label>Phone: <input type="text" name="travellerPhone" placeholder="" required/></label>
          <br/><label>Email: <input type="email" name="travellerEmail" placeholder="" required /></label>
          <br /><label>Meal Option: <select name="mealOption"  defaultValue="NA">
            <option value="NA">NA</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select></label>
          <br/><label>Emergency Contact Name: <input type="text" name="emergencyContactName" placeholder="" required/></label>
          <br/><label>Emergency Contact Number: <input type="text" name="emergencyContactPhone" placeholder="" required/></label>
          
          <br/><button>Add Traveller</button>
        </form>
      </div>
    );
  }
}

/* -------------------------------------------
  Section: Question 5
------------------------------------------- */
function DeleteTraveller({travellers, setTravellers}){
  logMessage("DeleteTraveller called.");

  const seatNumEmpty = totalNumSeats - travellers.length;
  const [attribute, setAttribute] = React.useState('');

  const displayAttribute = () => {
      if (attribute === ''){
      return (<>Select a method to delete traveller!</>);
    }  else {
      const labelName = attribute === 'name' ? 'Name' : 'Booking ID';
      const inputType = attribute === 'name' ? 'text' : 'number';

      return (
        <>
          <form name="deleteTraveller" onSubmit={handleSubmit}>
              <label>{labelName} <input type={inputType} name="travellername" placeholder="" min={attribute==='id'? "1" : undefined} required/></label>
              <button style={{...mainStyle, marginLeft:'5px'}}>Delete Traveller</button>
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
  
  if (travellers.length === 0) {
    return (
      <div>
        <h2>Delete Traveller</h2>
        <p>Empty seats available: {seatNumEmpty}</p>
        <p>No travellers to delete.</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Delete Traveller</h2>
        <p>Empty seats available: {seatNumEmpty}</p>
        <button style={{...mainStyle, marginRight: '5px'}} onClick = {()=>{setAttribute('name')}}>Delete by Name</button>
        <button style={mainStyle} onClick = {()=>{setAttribute('id')}}>Delete by Booking ID</button>
        <p></p>
        <div>
        {displayAttribute()}
        </div>
      </div>
    );
  }
}

/* -------------------------------------------
  Section: Question 6
------------------------------------------- */
function Homepage({travellers}){
  logMessage("Homepage called.");

  const seatNumOccupied = travellers.length;
  const seatNumEmpty = totalNumSeats - travellers.length;

  const displaySeatLayout = (seatNumber, color) => {
    return (
      <>
        {Array.from({length: seatNumber}, (s, index) => index+1).map(seat => (
        <div key={seat} style={seatStyle(color)} />))}
      </>
    );
  }

  return (
    <div>
      <h2>Homepage</h2>

       <div style={legendStyle}>
        <span><strong>Legend</strong></span>
        <span><div style={seatStyle('green')} /> Empty</span>
        <span><div style={seatStyle('lightGrey')} /> Occupied</span>
       </div>

       <div>
        <h3>Seat Layout</h3>
        <div style={trainLayoutStyle}>
          <span><em>(front)</em></span>
          <div style={seatLayoutStyle}>
            {displaySeatLayout(seatNumOccupied, 'lightGrey')}
            {displaySeatLayout(seatNumEmpty, 'green')}
            </div>
            <span><em>(back)</em></span>
        </div>
        
       </div>
    </div>
  );
}

/* -------------------------------------------
  Section: Main app
------------------------------------------- */
function TicketToRide() {
  logMessage("TicketToRide called.");
  //logMessage(JSON.stringify(initialTravellers, null, 2));

  const [selectedPage, setSelectedPage] = React.useState(1);
  const [travellers, setTravellers] = React.useState(initialTravellers);

  return (
      <div style={mainStyle}>

        <div style={navStyle}>
          <h1 style={headerStyle}>Ticket To Ride</h1>
          <Navigation setSelectedPage = {setSelectedPage}/>
          <p></p>
        </div>

        <p></p>
        <div style={containerStyle}>
          <div style={{borderRight:'1px solid #33312f', paddingRight:'20px'}}>
            <TrainDetails />
            <SeatDetails seatNumOccupied = {travellers.length} seatNumEmpty = {totalNumSeats - travellers.length} />
          </div>
          <div style={{marginLeft:'20px'}} ><Container selectedPage = {selectedPage} travellers = {travellers} setTravellers = {setTravellers} /></div>
          
        </div>
        
      </div>
  );
}

const element = <TicketToRide />;
ReactDOM.render(element, document.getElementById('contents'));
