import React, { Component } from "react";
import HomeContainer from "./containers/HomeContainer";

import SignIn from "./containers/LoginContainer";
import SignUp from "./containers/SignUpContainer";
import { Route } from "react-router-dom";
import Globe from "./components/Globe";
import Cover from "./components/Cover";
import FavoritesContainer from "./containers/FavoritesContainer";
import "./App.css";

const token = localStorage.getItem("token");
const USERID = localStorage.getItem("user_id");
const favoritesId = localStorage.getItem("favorites_id");

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      countryId: "",
    };
  }

  componentDidMount() {
    if (token) {
      fetch(`http://localhost:3000/api/v1/users/${USERID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.countries.map((country) =>
            this.setState({
              countries: [...this.state.countries, country.country_code],
            })
          );
        });
    }
  }

  handleUser = (userData) => {
    localStorage.setItem("user_id", userData.id);
  };

  handleSearch = (event) => {
    fetch("http://localhost:3000/api/v1/countries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.filter((country) => {
          if (country.country_code === event && !this.state.countries.includes(country.country_code)) {
            this.setState({
              countries: [...this.state.countries, country.country_code],
              countryId: country.id,
            });
          } else if(this.state.countries.includes(undefined)) {
          
            window.location.reload()
            

          }
        });
      });
      this.addCountry(event)
  };

  addCountry = (event) => {
    fetch("http://localhost:3000/api/v1/countries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country_code: event,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          countries: [...this.state.countries, data.country_code],
          countryId: data.id,
        });
      });
  };

  deleteCountry = () => {
    fetch(`http://localhost:3000/api/v1/favorites/${favoritesId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  // changeFavorites = (event) => {
  // this.setState({
  //   favoritesId: event
  // })

  // }

  render() {
    return (
      <div>
        <Route
          path="/signup"
          component={(props) => (
            <SignUp {...props} handleUser={this.handleUser} />
          )}
        />

        <Route
          path="/login"
          component={(props) => (
            <SignIn {...props} handleUser={this.handleUser} />
          )}
        />
        <Route
          path="/home"
          component={(props) => (
            <HomeContainer
              {...props}
              deleteCountry={this.deleteCountry}
              handleSearch={this.handleSearch}
              countries={this.state.countries}
            />
          )}
        />
        <Route exact path="/" component={Cover} />
        <Route exact path="/" component={Globe} />
        {this.state.countryId !== "" ? (
          <FavoritesContainer countryId={this.state.countryId} />
        ) : null}
      </div>
    );
  }
}

export default App;

// export default function App() {
//   const [userId, changeUserId] = useState("");
//   const [countries, changeCountries] = useState([]);
//   const [countryId, changeCountryId] = useState("");

//   const handleUser = (userData) => {
//    localStorage.setItem("user_id", userData.id)
//   };

//   const handleSearch = (event) => {
//     fetch("http://localhost:3000/api/v1/countries", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         country_code: event,
//       }),
//     })
//       .then((resp) => resp.json())
//       .then(
//         (data) => (
//           changeCountries([...countries, data.country_code]),
//           changeCountryId(data.id)
//         )
//       );
//   };

//   useEffect(() => {
//     fetch("http://localhost:3000/api/v1/favorites", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         user_id: USERID,
//         country_id: countryId,
//       }),
//     })
//       .then((resp) => resp.json())
//       .then(data => console.log(data))
//   });

//   return (
//     <div>
//       <Route
//         path="/signup"
//         component={(props) => <SignUp {...props} handleUser={handleUser} />}
//       />
//       <Route
//         path="/login"
//         component={(props) => <SignIn {...props} handleUser={handleUser} />}
//       />
//       <Route
//         path="/home"
//         component={(props) => (
//           <HomeContainer
//             {...props}
//             handleSearch={handleSearch}
//             countries={countries}
//           />
//         )}
//       />
//       <Route exact path="/" component={Cover} />
//       <Route exact path="/" component={Globe} />

//       <FavoritesContainer countries={countries} changeCountries={changeCountries}/>

//     </div>
//   );
// }
