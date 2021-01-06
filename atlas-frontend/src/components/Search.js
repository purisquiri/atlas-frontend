import React, { useEffect, useState } from "react";
import SearchBar from "material-ui-search-bar";
import SimpleModal from "./Modal";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const token = localStorage.getItem("token");

const USERID = localStorage.getItem("user_id");

function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

function Search({ handleAddReview, handleSearch, removeCountry }) {
  const classes = useStyles();
  const [modal, changeModal] = useState(false);
  const [event, newEvent] = useState("");
  const [country, newCountry] = useState([]);
  const [countryId, newId] = useState("");
  const [countryName, newCountryName] = useState("")

  // useEffect(() => {
  //   if (event !== "") {
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
  //       .then((data) => console.log(data.country_code));

  //   }

  // });


  const handleModal = (value) => {
    let countryCode = country.map(country => (
       country.country_code
    ))
    let countryIds = []
    
    changeModal(true);
    newEvent(value.newCode);
    newCountryName(value.label)
    document.getElementsByTagName("form")[0].reset();
    fetch("http://localhost:3000/api/v1/countries", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then(
        (data) =>
          (data.filter((newestCountry) => {
            if (!countryCode.includes(newestCountry.country_code)) {
              let filterCountry = newestCountry
              newCountry(country => [...country, filterCountry])
            }
        
            // newCountry(country => [...country, newestCountry.country_code])

          
          }))
 
      );
  };

  const filterCountryID = (event) => {
    country.filter((country) =>
      country.country_code === event ? newId(country.id) : null
    );
  };

  const deleteCountries = (event) => {
    let countryIds = "";
    country.filter((country) =>
      country.country_code === event ? (countryIds = country.id) : null
    );
    fetch(`http://localhost:3000/api/v1/favorites/${USERID}/${countryIds}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    removeCountry(event);
  };


  const handleSubmit = (object, value) => {
    if (value !== null) {
    handleModal(value)
    } else {
      console.log(value)
    }
  }


  return (
    <div>
      {modal ? (
        <SimpleModal
          handleAddReview={handleAddReview}
          changeModal={changeModal}
          handleSearch={handleSearch}
          event={event}
          open={modal}
          deleteCountries={deleteCountries}
          countryId={countryId}
          countries={country}

          countryName={countryName}

        />
      ) : null}
      <form>
      <Autocomplete
      onChange={handleSubmit}
      id="country-select-demo"
      style={{ width: 300 }}
      options={countries}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <React.Fragment>
          {countryToFlag(option.code)}
          {option.label} ({option.code}) {option.newCode}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(option) => (
            <React.Fragment>
              <span>{countryToFlag(option.code)}</span>
              {option.label} ({option.newCode}) +{option.phone}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </form>
    </div>

    //  <SearchBar onSubmit={(event) => handleSearch(event)}>
    //  <label>Search by Country Code:</label>
    //      <input type="text" name="search"  />
    //      <input type="submit" value="Search" />
    //   </SearchBar>
  );
}

export default Search;

const countries = [
  { code: "AD", newCode: "AND", label: "Andorra", phone: "376" },
  { code: "AE", newCode: "ARE", label: "United Arab Emirates", phone: "971" },
  { code: "AF", newCode: "AFG", label: "Afghanistan", phone: "93" },
  { code: "AG", newCode: "ATG", label: "Antigua and Barbuda", phone: "1-268" },
  { code: "AI", newCode: "AIA", label: "Anguilla", phone: "1-264" },
  { code: "AL", newCode: "ALB", label: "Albania", phone: "355" },
  { code: "AM", newCode: "ARM", label: "Armenia", phone: "374" },
  { code: "AO", newCode: "AGO", label: "Angola", phone: "244" },
  { code: "AQ", newCode: "ATA", label: "Antarctica", phone: "672" },
  { code: "AR", newCode: "ARG", label: "Argentina", phone: "54" },
  { code: "AS", newCode: "ASM", label: "American Samoa", phone: "1-684" },
  { code: "AT", newCode: "AUT", label: "Austria", phone: "43" },
  {
    code: "AU",
    newCode: "AUS",
    label: "Australia",
    phone: "61",
    suggested: true,
  },
  { code: "AW", newCode: "ABW", label: "Aruba", phone: "297" },
  { code: "AX", newCode: "ALA", label: "Alland Islands", phone: "358" },
  { code: "AZ", newCode: "AZE", label: "Azerbaijan", phone: "994" },
  { code: "BA", newCode: "BIH", label: "Bosnia and Herzegovina", phone: "387" },
  { code: "BB", newCode: "BRB", label: "Barbados", phone: "1-246" },
  { code: "BD", newCode: "BGD", label: "Bangladesh", phone: "880" },
  { code: "BE", newCode: "BEL", label: "Belgium", phone: "32" },
  { code: "BF", newCode: "BFA", label: "Burkina Faso", phone: "226" },
  { code: "BG", newCode: "BGR", label: "Bulgaria", phone: "359" },
  { code: "BH", newCode: "BHR", label: "Bahrain", phone: "973" },
  { code: "BI", newCode: "BDI", label: "Burundi", phone: "257" },
  { code: "BJ", newCode: "BEN", label: "Benin", phone: "229" },
  { code: "BL", newCode: "BLM", label: "Saint Barthelemy", phone: "590" },
  { code: "BM", newCode: "BMU", label: "Bermuda", phone: "1-441" },
  { code: "BN", newCode: "BRN", label: "Brunei Darussalam", phone: "673" },
  { code: "BO", newCode: "BOL", label: "Bolivia", phone: "591" },
  { code: "BR", newCode: "BRA", label: "Brazil", phone: "55" },
  { code: "BS", newCode: "BHS", label: "Bahamas", phone: "1-242" },
  { code: "BT", newCode: "BTN", label: "Bhutan", phone: "975" },
  { code: "BV", newCode: "BVT", label: "Bouvet Island", phone: "47" },
  { code: "BW", newCode: "BWA", label: "Botswana", phone: "267" },
  { code: "BY", newCode: "BLR", label: "Belarus", phone: "375" },
  { code: "BZ", newCode: "BLZ", label: "Belize", phone: "501" },
  { code: "CA", newCode: "CAN", label: "Canada", phone: "1", suggested: true },
  { code: "CC", newCode: "CCK", label: "Cocos (Keeling) Islands", phone: "61" },
  {
    code: "CD",
    newCode: "COD",
    label: "Congo, Democratic Republic of the",
    phone: "243",
  },
  {
    code: "CF",
    newCode: "CAF",
    label: "Central African Republic",
    phone: "236",
  },
  { code: "CG", newCode: "COG", label: "Congo, Republic of the", phone: "242" },
  { code: "CH", newCode: "CHE", label: "Switzerland", phone: "41" },
  { code: "CI", newCode: "CIV", label: "Cote d'Ivoire", phone: "225" },
  { code: "CK", newCode: "COK", label: "Cook Islands", phone: "682" },
  { code: "CL", newCode: "CHL", label: "Chile", phone: "56" },
  { code: "CM", newCode: "CMR", label: "Cameroon", phone: "237" },
  { code: "CN", newCode: "CHN", label: "China", phone: "86" },
  { code: "CO", newCode: "COL", label: "Colombia", phone: "57" },
  { code: "CR", newCode: "CRI", label: "Costa Rica", phone: "506" },
  { code: "CU", newCode: "CUB", label: "Cuba", phone: "53" },
  { code: "CV", newCode: "CPV", label: "Cape Verde", phone: "238" },
  { code: "CW", newCode: "CUW", label: "Curacao", phone: "599" },
  { code: "CX", newCode: "CXR", label: "Christmas Island", phone: "61" },
  { code: "CY", newCode: "CYP", label: "Cyprus", phone: "357" },
  { code: "CZ", newCode: "CZE", label: "Czech Republic", phone: "420" },
  {
    code: "DE",
    newCode: "DEU",
    label: "Germany",
    phone: "49",
    suggested: true,
  },
  { code: "DJ", newCode: "DJI", label: "Djibouti", phone: "253" },
  { code: "DK", newCode: "DNK", label: "Denmark", phone: "45" },
  { code: "DM", newCode: "DMA", label: "Dominica", phone: "1-767" },
  { code: "DO", newCode: "DOM", label: "Dominican Republic", phone: "1-809" },
  { code: "DZ", newCode: "DZA", label: "Algeria", phone: "213" },
  { code: "EC", newCode: "ECU", label: "Ecuador", phone: "593" },
  { code: "EE", newCode: "EST", label: "Estonia", phone: "372" },
  { code: "EG", newCode: "EGY", label: "Egypt", phone: "20" },
  { code: "EH", newCode: "ESH", label: "Western Sahara", phone: "212" },
  { code: "ER", newCode: "ERI", label: "Eritrea", phone: "291" },
  { code: "ES", newCode: "ESP", label: "Spain", phone: "34" },
  { code: "ET", newCode: "ETH", label: "Ethiopia", phone: "251" },
  { code: "FI", newCode: "FIN", label: "Finland", phone: "358" },
  { code: "FJ", newCode: "FJI", label: "Fiji", phone: "679" },
  {
    code: "FK",
    newCode: "FLK",
    label: "Falkland Islands (Malvinas)",
    phone: "500",
  },
  {
    code: "FM",
    newCode: "FSM",
    label: "Micronesia, Federated States of",
    phone: "691",
  },
  { code: "FO", newCode: "FRO", label: "Faroe Islands", phone: "298" },
  { code: "FR", newCode: "FRA", label: "France", phone: "33", suggested: true },
  { code: "GA", newCode: "GAB", label: "Gabon", phone: "241" },
  { code: "GR", newCode: "GRB", label: "United Kingdom", phone: "44" },
  { code: "GD", newCode: "GRD", label: "Grenada", phone: "1-473" },
  { code: "GE", newCode: "GEO", label: "Georgia", phone: "995" },
  { code: "GF", newCode: "GUF", label: "French Guiana", phone: "594" },
  { code: "GG", newCode: "GGY", label: "Guernsey", phone: "44" },
  { code: "GH", newCode: "GHA", label: "Ghana", phone: "233" },
  { code: "GI", newCode: "GIB", label: "Gibraltar", phone: "350" },
  { code: "GL", newCode: "GRL", label: "Greenland", phone: "299" },
  { code: "GM", newCode: "GMB", label: "Gambia", phone: "220" },
  { code: "GN", newCode: "GIN", label: "Guinea", phone: "224" },
  { code: "GP", newCode: "GLP", label: "Guadeloupe", phone: "590" },
  { code: "GQ", newCode: "GNQ", label: "Equatorial Guinea", phone: "240" },
  { code: "GR", newCode: "GRC", label: "Greece", phone: "30" },
  {
    code: "GS",
    newCode: "SGS",
    label: "South Georgia and the South Sandwich Islands",
    phone: "500",
  },
  { code: "GT", newCode: "GTM", label: "Guatemala", phone: "502" },
  { code: "GU", newCode: "GUM", label: "Guam", phone: "1-671" },
  { code: "GW", newCode: "GNB", label: "Guinea-Bissau", phone: "245" },
  { code: "GY", newCode: "GUY", label: "Guyana", phone: "592" },
  { code: "HK", newCode: "HKG", label: "Hong Kong", phone: "852" },
  {
    code: "HM",
    newCode: "HMD",
    label: "Heard Island and McDonald Islands",
    phone: "672",
  },
  { code: "HN", newCode: "HND", label: "Honduras", phone: "504" },
  { code: "HR", newCode: "HRV", label: "Croatia", phone: "385" },
  { code: "HT", newCode: "HTI", label: "Haiti", phone: "509" },
  { code: "HU", newCode: "HUN", label: "Hungary", phone: "36" },
  { code: "ID", newCode: "IDN", label: "Indonesia", phone: "62" },
  { code: "IE", newCode: "IRL", label: "Ireland", phone: "353" },
  { code: "IL", newCode: "ISR", label: "Israel", phone: "972" },
  { code: "IM", newCode: "IMN", label: "Isle of Man", phone: "44" },
  { code: "IN", newCode: "IND", label: "India", phone: "91" },
  {
    code: "IO",
    newCode: "IOT",
    label: "British Indian Ocean Territory",
    phone: "246",
  },
  { code: "IQ", newCode: "IRQ", label: "Iraq", phone: "964" },
  {
    code: "IR",
    newCode: "IRN",
    label: "Iran, Islamic Republic of",
    phone: "98",
  },
  { code: "IS", newCode: "ISL", label: "Iceland", phone: "354" },
  { code: "IT", newCode: "ITA", label: "Italy", phone: "39" },
  { code: "JE", newCode: "JEY", label: "Jersey", phone: "44" },
  { code: "JM", newCode: "JAM", label: "Jamaica", phone: "1-876" },
  { code: "JO", newCode: "JOR", label: "Jordan", phone: "962" },
  { code: "JP", newCode: "JPN", label: "Japan", phone: "81", suggested: true },
  { code: "KE", newCode: "KEN", label: "Kenya", phone: "254" },
  { code: "KG", newCode: "KGZ", label: "Kyrgyzstan", phone: "996" },
  { code: "KH", newCode: "KHM", label: "Cambodia", phone: "855" },
  { code: "KI", newCode: "KIR", label: "Kiribati", phone: "686" },
  { code: "KM", newCode: "COM", label: "Comoros", phone: "269" },
  {
    code: "KN",
    newCode: "KNA",
    label: "Saint Kitts and Nevis",
    phone: "1-869",
  },
  {
    code: "KP",
    newCode: "PRK",
    label: "Korea, Democratic People's Republic of",
    phone: "850",
  },
  { code: "KR", newCode: "KOR", label: "Korea, Republic of", phone: "82" },
  { code: "KW", newCode: "KWT", label: "Kuwait", phone: "965" },
  { code: "KY", newCode: "CYM", label: "Cayman Islands", phone: "1-345" },
  { code: "KZ", newCode: "KAZ", label: "Kazakhstan", phone: "7" },
  {
    code: "LA",
    newCode: "LAO",
    label: "Lao People's Democratic Republic",
    phone: "856",
  },
  { code: "LB", newCode: "LBN", label: "Lebanon", phone: "961" },
  { code: "LC", newCode: "LCA", label: "Saint Lucia", phone: "1-758" },
  { code: "LI", newCode: "LIE", label: "Liechtenstein", phone: "423" },
  { code: "LK", newCode: "LKA", label: "Sri Lanka", phone: "94" },
  { code: "LR", newCode: "LBR", label: "Liberia", phone: "231" },
  { code: "LS", newCode: "LSO", label: "Lesotho", phone: "266" },
  { code: "LT", newCode: "LTU", label: "Lithuania", phone: "370" },
  { code: "LU", newCode: "LUX", label: "Luxembourg", phone: "352" },
  { code: "LV", newCode: "LVA", label: "Latvia", phone: "371" },
  { code: "LY", newCode: "LBY", label: "Libya", phone: "218" },
  { code: "MA", newCode: "MAR", label: "Morocco", phone: "212" },
  { code: "MC", newCode: "MCO", label: "Monaco", phone: "377" },
  { code: "MD", newCode: "MDA", label: "Moldova, Republic of", phone: "373" },
  { code: "ME", newCode: "MNE", label: "Montenegro", phone: "382" },
  {
    code: "MF",
    newCode: "MAF",
    label: "Saint Martin (French part)",
    phone: "590",
  },
  { code: "MG", newCode: "MDG", label: "Madagascar", phone: "261" },
  { code: "MH", newCode: "MHL", label: "Marshall Islands", phone: "692" },
  {
    code: "MK",
    newCode: "",
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "389",
  },
  { code: "ML", newCode: "MLI", label: "Mali", phone: "223" },
  { code: "MM", newCode: "MMR", label: "Myanmar", phone: "95" },
  { code: "MN", newCode: "MNG", label: "Mongolia", phone: "976" },
  { code: "MO", newCode: "MAC", label: "Macao", phone: "853" },
  {
    code: "MP",
    newCode: "MNP",
    label: "Northern Mariana Islands",
    phone: "1-670",
  },
  { code: "MQ", newCode: "MTQ", label: "Martinique", phone: "596" },
  { code: "MR", newCode: "MRT", label: "Mauritania", phone: "222" },
  { code: "MS", newCode: "MSR", label: "Montserrat", phone: "1-664" },
  { code: "MT", newCode: "MLT", label: "Malta", phone: "356" },
  { code: "MU", newCode: "MUS", label: "Mauritius", phone: "230" },
  { code: "MV", newCode: "MDV", label: "Maldives", phone: "960" },
  { code: "MW", newCode: "MWI", label: "Malawi", phone: "265" },
  { code: "MX", newCode: "MEX", label: "Mexico", phone: "52" },
  { code: "MY", newCode: "MYS", label: "Malaysia", phone: "60" },
  { code: "MZ", newCode: "MOZ", label: "Mozambique", phone: "258" },
  { code: "NA", newCode: "NAM", label: "Namibia", phone: "264" },
  { code: "NC", newCode: "NCL", label: "New Caledonia", phone: "687" },
  { code: "NE", newCode: "NER", label: "Niger", phone: "227" },
  { code: "NF", newCode: "NFK", label: "Norfolk Island", phone: "672" },
  { code: "NG", newCode: "NGA", label: "Nigeria", phone: "234" },
  { code: "NI", newCode: "NIC", label: "Nicaragua", phone: "505" },
  { code: "NL", newCode: "NLD", label: "Netherlands", phone: "31" },
  { code: "NO", newCode: "NOR", label: "Norway", phone: "47" },
  { code: "NP", newCode: "NPL", label: "Nepal", phone: "977" },
  { code: "NR", newCode: "NRU", label: "Nauru", phone: "674" },
  { code: "NU", newCode: "NIU", label: "Niue", phone: "683" },
  { code: "NZ", newCode: "NZL", label: "New Zealand", phone: "64" },
  { code: "OM", newCode: "OMN", label: "Oman", phone: "968" },
  { code: "PA", newCode: "PAN", label: "Panama", phone: "507" },
  { code: "PE", newCode: "PER", label: "Peru", phone: "51" },
  { code: "PF", newCode: "PYF", label: "French Polynesia", phone: "689" },
  { code: "PG", newCode: "PNG", label: "Papua New Guinea", phone: "675" },
  { code: "PH", newCode: "PHL", label: "Philippines", phone: "63" },
  { code: "PK", newCode: "PAK", label: "Pakistan", phone: "92" },
  { code: "PL", newCode: "POL", label: "Poland", phone: "48" },
  {
    code: "PM",
    newCode: "SPM",
    label: "Saint Pierre and Miquelon",
    phone: "508",
  },
  { code: "PN", newCode: "PCN", label: "Pitcairn", phone: "870" },
  { code: "PR", newCode: "PRI", label: "Puerto Rico", phone: "1" },
  { code: "PS", newCode: "PSE", label: "Palestine, State of", phone: "970" },
  { code: "PT", newCode: "PRT", label: "Portugal", phone: "351" },
  { code: "PW", newCode: "PLW", label: "Palau", phone: "680" },
  { code: "PY", newCode: "PRY", label: "Paraguay", phone: "595" },
  { code: "QA", newCode: "QAT", label: "Qatar", phone: "974" },
  { code: "RE", newCode: "REU", label: "Reunion", phone: "262" },
  { code: "RO", newCode: "ROU", label: "Romania", phone: "40" },
  { code: "RS", newCode: "SRB", label: "Serbia", phone: "381" },
  { code: "RU", newCode: "RUS", label: "Russian Federation", phone: "7" },
  { code: "RW", newCode: "RWA", label: "Rwanda", phone: "250" },
  { code: "SA", newCode: "SAU", label: "Saudi Arabia", phone: "966" },
  { code: "SB", newCode: "SLB", label: "Solomon Islands", phone: "677" },
  { code: "SC", newCode: "SYC", label: "Seychelles", phone: "248" },
  { code: "SD", newCode: "SDN", label: "Sudan", phone: "249" },
  { code: "SE", newCode: "SWE", label: "Sweden", phone: "46" },
  { code: "SG", newCode: "SGP", label: "Singapore", phone: "65" },
  { code: "SH", newCode: "SHN", label: "Saint Helena", phone: "290" },
  { code: "SI", newCode: "SVN", label: "Slovenia", phone: "386" },
  { code: "SJ", newCode: "SJM", label: "Svalbard and Jan Mayen", phone: "47" },
  { code: "SK", newCode: "SVK", label: "Slovakia", phone: "421" },
  { code: "SL", newCode: "SLE", label: "Sierra Leone", phone: "232" },
  { code: "SM", newCode: "SMR", label: "San Marino", phone: "378" },
  { code: "SN", newCode: "SEN", label: "Senegal", phone: "221" },
  { code: "SO", newCode: "SOM", label: "Somalia", phone: "252" },
  { code: "SR", newCode: "SUR", label: "Suriname", phone: "597" },
  { code: "SS", newCode: "SSD", label: "South Sudan", phone: "211" },
  { code: "ST", newCode: "STP", label: "Sao Tome and Principe", phone: "239" },
  { code: "SV", newCode: "SLV", label: "El Salvador", phone: "503" },
  {
    code: "SX",
    newCode: "SXM",
    label: "Sint Maarten (Dutch part)",
    phone: "1-721",
  },
  { code: "SY", newCode: "SYR", label: "Syrian Arab Republic", phone: "963" },
  { code: "SZ", newCode: "", label: "Swaziland", phone: "268" },
  {
    code: "TC",
    newCode: "TCA",
    label: "Turks and Caicos Islands",
    phone: "1-649",
  },
  { code: "TD", newCode: "TCD", label: "Chad", phone: "235" },
  {
    code: "TF",
    newCode: "ATF",
    label: "French Southern Territories",
    phone: "262",
  },
  { code: "TG", newCode: "TGO", label: "Togo", phone: "228" },
  { code: "TH", newCode: "THA", label: "Thailand", phone: "66" },
  { code: "TJ", newCode: "TJK", label: "Tajikistan", phone: "992" },
  { code: "TK", newCode: "TKL", label: "Tokelau", phone: "690" },
  { code: "TL", newCode: "TLS", label: "Timor-Leste", phone: "670" },
  { code: "TM", newCode: "TKM", label: "Turkmenistan", phone: "993" },
  { code: "TN", newCode: "TUN", label: "Tunisia", phone: "216" },
  { code: "TO", newCode: "TON", label: "Tonga", phone: "676" },
  { code: "TR", newCode: "TUR", label: "Turkey", phone: "90" },
  { code: "TT", newCode: "TTO", label: "Trinidad and Tobago", phone: "1-868" },
  { code: "TV", newCode: "TUV", label: "Tuvalu", phone: "688" },
  {
    code: "TW",
    newCode: "TWN",
    label: "Taiwan, Province of China",
    phone: "886",
  },
  {
    code: "TZ",
    newCode: "TZA",
    label: "United Republic of Tanzania",
    phone: "255",
  },
  { code: "UA", newCode: "UKR", label: "Ukraine", phone: "380" },
  { code: "UG", newCode: "UGA", label: "Uganda", phone: "256" },
  {
    code: "US",
    newCode: "USA",
    label: "United States",
    phone: "1",
    suggested: true,
  },
  { code: "UY", newCode: "URY", label: "Uruguay", phone: "598" },
  { code: "UZ", newCode: "UZB", label: "Uzbekistan", phone: "998" },
  {
    code: "VA",
    newCode: "VAT",
    label: "Holy See (Vatican City State)",
    phone: "379",
  },
  {
    code: "VC",
    newCode: "VCT",
    label: "Saint Vincent and the Grenadines",
    phone: "1-784",
  },
  { code: "VE", newCode: "VEN", label: "Venezuela", phone: "58" },
  {
    code: "VG",
    newCode: "VGB",
    label: "British Virgin Islands",
    phone: "1-284",
  },
  { code: "VI", newCode: "VIR", label: "US Virgin Islands", phone: "1-340" },
  { code: "VN", newCode: "VNM", label: "Vietnam", phone: "84" },
  { code: "VU", newCode: "VUT", label: "Vanuatu", phone: "678" },
  { code: "WF", newCode: "WLF", label: "Wallis and Futuna", phone: "681" },
  { code: "WS", newCode: "WSM", label: "Samoa", phone: "685" },
  { code: "YE", newCode: "YEM", label: "Yemen", phone: "967" },
  { code: "YT", newCode: "MYT", label: "Mayotte", phone: "262" },
  { code: "ZA", newCode: "ZAF", label: "South Africa", phone: "27" },
  { code: "ZM", newCode: "ZMB", label: "Zambia", phone: "260" },
  { code: "ZW", newCode: "ZWE", label: "Zimbabwe", phone: "263" },
];
