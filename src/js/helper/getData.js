// fetch request
const dbData = fetch('/src/data/data.json').then(response => response.json())
export default await dbData
