# React - Restaurant Listing

## Submission Instrions [Please note]

### Maximum Marks - 24

- The Submission should not contain spaces, for example `/rct-101 folder/eval` will not work
- Rubrics / Marking Scheme is below ( we will convert this back to a scale of 10 )

```
 ✅ Min Score on being able to submit - 1 mark
 ✅ App loads correctly - 1 mark
  ✓ App loads correctly
 ✅ Pagination component - 2 marks
  ✓ pagination component works correctly 1
  ✓ pagination component works correctly 2
 ✅ Restaurant component - 1 mark
  ✓ Restaurant Components exist
 ✅ Private Routes - 2 marks
  ✓ Private Route component redirects user to login when visiting /dashboard page
  ✓ Private Route component redirects user to login when visiting /restaurants/:id page
 ✅ App Context works correctly - 1 mark
  ✓ values in context are correctly mapped
 ✅ Login APIs and functionality  - 5 mark
  ✓ Login page works correctly with API, token is shown, and user is able to logout
  ✓ Login page works correctly when API is mocked
 ✅ Home page functionality  - 8 mark
  ✓ Home page works correctly
  ✓ All Filters are present
  ✓ Filters work correctly
  ✓ Redirecting from Dashboard page to restaurant page works correctly
 ✅ Restaruant Page - 2 mark
  ✓ Restaurant page works correctly 1
  ✓ Restaurant page works correctly 2
```

## Description

- You need to make an application which lists restaurant list from an api
- User should be able to apply pagination
- You need to be able to click on a restaurant name, and move to the restaurant page `/restaurants/<id>`
- [Output.mp4](https://masai-course.s3.ap-south-1.amazonaws.com/material/videos/36433/Ig11lSZVTYDvvPaSFAzkxou0EGTGvYnH7r0vk6sJ.mp4)
- [Requirement.mp4](https://masai-course.s3.ap-south-1.amazonaws.com/material/videos/36434/K3AgfeDe5Dnw7BiVhhbzzGlcqdhQdQR3MTFR3Nlm.mp4)
- [Boilerplate.mp4](https://masai-course.s3.ap-south-1.amazonaws.com/material/videos/36435/Ev4ml4cdv9RWUQQiHLsvbWcdjDgta8YsyI71cKcU.mp4)
- You can only use fetch, if you use any other library, the test case will not pass

## Installation

- you can use any node version that works for you ( 14+ )

```
npm install

// run locally
npm run start

// test locally
npm run test
```

- the system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug before itself
- we also request you to not to just submit it last minute
- try to keep one submission at a time

## Installation ( Codesandbox )

- You can use the [codesandbox link](https://codesandbox.io/s/happy-firefly-7d82x4), but please note the test cases will not work on codesandbox ( as codesandbox will not support the version for testing )
  - If you are using codesandbox, you still need to
  - download the project
  - add to your masai-course repo
  - submit the github link on the cp.masaichool.com platform
  - the final scores will be calculated on cp.masaischool.com

## Requirements

## Boilerplate

- You are given a set of `Pages`
  - `Home`
    - you are given this already
    - it contains links to other routes
    - login, and dashboard routes
  - `Login`
    - user should be able to login from here
    - use reqres.in api for logging in
    - you need to maintain the user auth state in a context API
  - `Dashboard`
    - user should be able to see a list of all restaurants fetched from API
    - there should be 10 per page,
    - it should be in tabular format
    - you should be able to filter restaurants by type as well
    - on clicking name here you should be able to be redirected to the `/restaurants/<id>` page
    - loading indicators to be present here
  - `RestaurantPage`
    - you need to use dynamic routing to fetch the id and fetch from details from API again
    - loading indicators to be present here
  - AllRoutes
    - all the routes are present here
- `Components`
  - RestaurantTable
    - accept `data` property and has a list of RestaurantCards
  - RestaurantCard
    - accept the following props:
    - `name`
    - `rating`
    - `type`
    - `price_starts_from`
    - `id`
  - PrivateRoute
    - it should show the child component if user is authenticated
    - otherwise move the user to login page
    - it should work in the following manner
    ```
      <PrivateRoute>
       <Page />
      </PrivateRoute>
    ```
  - Pagination
    - component which will have 1,2,3,...n number of buttons
    - The current button will be disabled
      - meaning if you are on page 3, then page 3 should be disabled
  - AppContext
    - manage auth context here
    - both user token, and login state
  - Loader
    - loading indicator
- You are given these dummy elements (anything with data-testid you should not remove or change the attribute values)

### `API details`

- You can only use fetch API, if you use any other library, the test case will not pass
- `GET` : restaurant list
- `base-url`: `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com`
- `url`: `/mockapi/getrestaurants`
- query params:
  - `page`: a number representing the page number
  - `limit`: a number representing total number of results per page
  - `filter`: it accepts the restaurant type fine_dining, ethnic, fast_food, cafe, casual_dining
    - you can give empty value, if you want to get all categories
- response
  - `data`: array of restaurants
  - `totalPages`: number representing no of pages
- example `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants?page=1&limit=5`
- By default when the user loads the page, the user should be shown a set of restaurants
  - of page 1
  - 10 per page
- You cannot use JSON server
- use useEffect to display the data on the UI

- `GET` - get restaurant by id
- `base-url`: `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com`
- `url`: `/mockapi/getrestaurants/:id`
- response
  - `data`: restaurant information
- example: `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants/5`

### `Pages & Components`

#### `AllRoutes.jsx`

- It should contain all the routes for your application

```
/ - Home
/login - Login Page
/dashboard - Dashboard - Private
/restaurants/<id> - Restaurant Single Page - Private
```

#### `Home.jsx`

- You dont need to update anything here

#### `Login.jsx`

- A user should be able to login from here
- There is a form already made for you
- You need to complete it with by using the following api
- You can only use fetch API, if you use any other library, the test case will not pass
- `POST`
- https://reqres.in/api/login
- DOCS: https://reqres.in/
- You need to maintain the authentication state in context API
- `isAuth`, and `token`
- token - should be null by default
- isAuth - should be false by default
- when the user clicks on submit, the button should be disabled
- once logged in, a user is redirected to `/dashboard` route

#### `PrivateRoute.jsx`

- PrivateRoute
  - it should show the child component if user is authenticated
  - otherwise move the user to `/login` page
  - use from AuthContext to decide if the user is authenticated or not

### `RestaurantPage.jsx`

- RestaurantPage
  - This is the page that should come in the nested route `/restaurants/<id>`
  - you need to retreive the id from the url
  - and make an api request and fetch the required page
  - please make sure you are doing this, and not any other way
  - when the page is loading or when the API request is being made, please show only the `Loader` component
  - Only the loader component should be shown in the UI
  - please check the API response and map the correct data here
  - you will have to display the
    - name, type, rating, votes, and starting price, with image in this component
    - the image should have the alt attribute mapped to the name of the restaurant
    - there will be elements which have the data attributes
    - `[data-testid="restaurant-name"]`
    - `[data-testid="restaurant-type"]`
    - `[data-testid="restaurant-rating"]`
    - `[data-testid="restaurant-votes"]`
    - `[data-testid="restaurant-price"]`
    - `[data-testid="restaurant-image"]`
    - the container will have `data-testid="restaurant-container"`

#### `Dashboard.jsx`

- Once logged in, a user sees the this page
- you should have a Logout button [data-testid="logout-btn"]
- once clicking on it, you should be logged out
- there is an element with [data-testid="user-token"]
- you need to display the users token here, which you got when logging in
- List all the restaurants from the API page wise
- You need to display filters here in the select option with `[data-testid="filter-box"]`
  - By default you need to show All, ( keep an option with the text All)
  - All the options in filter should be changed from snake_case into words with first letter capitalised
    - for example fine_dining => Fine Dining, ethnic => Ethnic, fast_food => Fast Food
    - you can decide how to do this
    - this should also be the case in the table data
- When the API is loading, use the `Loader` component which is supposed to show a loading indicator
- you need to display the results using the RestaurantTable component, pass the data here from the API response
- The pagination component should be shown below this inside the container having the data attribute `[data-testid="pagination-container"]`

#### `Pagination.jsx`

- The pagination component should accept the following props:
  - `totalPages`
  - `currentPage`
  - `handlePageChange`
- it should have buttons from `1,2,3,...n`
- which means if there are 10 pages in the api response, then user should be shown buttons from 1-10
- the current button should be disabled

#### `RestaurantTable.jsx`

- it should accept a data property, which will contain the array of restaurants
- this is a table component
- from the data property, create a list of RestaurantCard components
- each of the RestaurantCard component will have a table row element, and each of the fil

#### `RestaurantCard.jsx`

- it should accept the following properties
  - name
  - rating
  - type
  - price_starts_from
- All the options in type key should be changed from snake_case into words with first letter capitalised
  - for example fine_dining => Fine Dining, ethnic => Ethnic, fast_food => Fast Food
  - see API section to see all possible types
  - you can decide how to do this
  - this should also be the case in the table data
- The elements with the following attributes need to have corresponding values mapped to it
- data-testid="item" - the tr element is here
- the following are td elements
- data-testid="name" - This should be a Link tag, and on clicking you need to redirect a user from
- data-testid="rating"
- data-testid="type"
- data-testid="price"

#### `AppContext.jsx`

- The AppContext and the Provider should be made here
- user should be able to pass the states for
- authentication isAuth - default value false
- token - default value null
- your value be passing down in the AuthContextProvider as value is { authState, ....otherFunctions }
  - authState should contain the isAuth and token
  - mandatory ^
- create the following functions as well
- loginUser - set auth to true and token to corresponding token
- logoutUser - set auth to false, and token back to null
