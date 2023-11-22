// Assuming got is already imported
// import { got } from './'

async function getTotalVehicles() {
  // Asynchronously fetches the total number of vehicles from the web service
  return await got.get('https://my-webservice.moveecar.com/vehicles/total');
}

async function getPlurial() {
  try {
    // Await the result of the getTotalVehicles async function
    const response = await getTotalVehicles();

    // Parse the response to extract the total count
    // Assuming the response body has a field 'total'
    const { total } = JSON.parse(response.body)

    // Determine the plurality based on the total count
    if (total <= 0) {
      return 'none';
    }
    if (total <= 10) {
      return 'few';
    }
    return 'many';

  } catch (error) {
    // Catch and log any errors that occur during the fetch operation
    console.error('Error fetching total vehicles:', error);
    // Handle the error as needed - return a default value or rethrow the error
  }
}
