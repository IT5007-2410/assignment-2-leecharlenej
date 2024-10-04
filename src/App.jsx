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
    id: 1, name: "Jack", phone: 88885555, email: "jack@gmail.com",
    bookingTime: new Date(), deparatureTime: new Date(),
    departureStation: "Singapore", arrivalStation: "Bangkok", seatNumber: 1,
  },
  {
    id: 2, name: "Rose", phone: 88884444, email: "rose@gmail.com",
    bookingTime: new Date(), deparatureTime: new Date(),
    departureStation: "Singapore", arrivalStation: "Japan", seatNumber: 2,
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	<input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

/* -------------------------------------------
   Section: Question 2
------------------------------------------- */

function Navigation( {setSelectedPage} ) {
  logMessage("Navigation called.");

  return (
    <div>
      <button onClick={() => setSelectedPage(1)}>Homepage</button>
      <button onClick={() => setSelectedPage(2)}>Display Travellers</button>
      <button onClick={() => setSelectedPage(3)}>Add Travellers</button>
      <button onClick={() => setSelectedPage(4)}>Delete Travellers</button>
    </div>
  );
}

function Container( {selectedPage}) {
  logMessage("Container called.");

  return (
    <div>
    {selectedPage === 1 && <Homepage />}
    {selectedPage === 2 && <DisplayTraveller />}
    {selectedPage === 3 && <AddTraveller />}
    {selectedPage === 4 && <DeleteTraveller />}
    </div>
  );
}


function Homepage(){
  logMessage("Homepage called.");
  return (
    <div>
      Homepage test
       {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    </div>
  );
}

function DisplayTraveller(){
  logMessage("DisplayTraveller called.");
  return (
    <div>
      Display Traveller test
    </div>
  );
}

function AddTraveller(){
  logMessage("AddTraveller called.");
  return (
    <div>
      Add Traveller test
    </div>
  );
}

function DeleteTraveller(){
  logMessage("DeleteTraveller called.");
  return (
    <div>
      Delete Traveller test
    </div>
  );
}



// class Homepage extends React.Component {
// 	constructor() {
// 	super();
// 	}
// 	render(){
// 	return (
// 	<div>
// 		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
// 	</div>);
// 	}
// }

function TicketToRide() {
  logMessage("TicketToRide called.");
  //logMessage(JSON.stringify(initialTravellers, null, 2));

  const [travellers, setTravellers] = React.useState(initialTravellers);
  const [selectedPage, setSelectedPage] = React.useState(1);

  return (
      <div>
        <h1>Ticket To Ride</h1>

        <Navigation setSelectedPage = {setSelectedPage}/>
        <Container selectedPage = {selectedPage} />
          
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
