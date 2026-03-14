const requestInterceptor = (requestArguments) => {
  console.log("Before request");
};

const responseInterceptor = (response) => {
  console.log("After response");
};

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

const originalFetch = window.fetch;

window.fetch = async (...args) => {
  // request interceptor
  // pass the args to request interceptor
  args = requestInterceptor(args);

  // pass the updated args to fetch
  let response = await originalFetch(...args);

  // response interceptor
  // pass the response to response interceptor
  response = responseInterceptor(response);

  // return the updated response
  return response;
};
