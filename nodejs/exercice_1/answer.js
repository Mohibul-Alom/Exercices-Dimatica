// Assuming got is already imported
// import { got } from './'

async function getCountUsers() {
  try {
    const response = await got.get('https://my-webservice.moveecar.com/users/count');
    
    if(response.status != 200){
      throw new Error(`There's been an error fetching the count`);
    }
    //assuming that the response is a json
    const body = JSON.parse(response.body)
    return { total: body.total };

  } catch (error) {
    console.error('Error fetching user count:', error);
    /* 
    * custom error handling if needed
    */

    // returns a default value in case of an error to maintain consistency 
    return { total: 0 };
  }
}

async function computeResult() {
  // Gets the result of getCountUsers and adds 20 to the total
  const result = await getCountUsers() ?? { total: 0 };
  return result.total + 20;
}