const getCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/region/ame")
    const data = await response.json()
    return data
}

export { getCountries }