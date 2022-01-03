// fetch request
const dbData = fetch('../data/data.json').then(response => response.json())

export default await dbData
