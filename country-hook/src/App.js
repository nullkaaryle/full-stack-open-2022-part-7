import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name !== '') {
      axios
        .get('https://restcountries.com/v3.1/name/' + name + '?fields=name,capital,flags,population')
        .then(response => {
          setCountry(response.data[0])
        })
    }
  }, [name])

  return country
}


const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3> {country.name.common} </h3>
      <div>
        population {country.population}
      </div>
      <div>
        capital {country.capital}
      </div>
      <img
        src={country.flags.png}
        height='100'
        alt={`flag of ${country.name.common}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (event) => {
    event.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>

      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>
          find
        </button>
      </form>

      <Country country={country} />

    </div>
  )
}

export default App


//RESTCountries REST API:

//ALL
//https://restcountries.com/v3.1/all

//NAME
//Search by country name.
//It can be the native name or partial name
//https://restcountries.com/v3.1/name/{name}
//https://restcountries.com/v3.1/name/peru

//FILTER RESPONSE
//You can filter the output of your request
//to include only the specified fields.
//https://restcountries.com/v2/{service}?fields={field},{field},{field}
//https://restcountries.com/v2/all?fields=name,capital,languages,area,flag