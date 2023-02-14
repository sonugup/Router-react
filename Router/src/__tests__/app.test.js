import React, { useContext } from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App.js";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Router } from "react-router-dom";
import Pagination from "../Components/Pagination.jsx";
import AppContextProvider, {
  AppContext,
  appReducer,
} from "../Context/AppContext.jsx";
import PrivateRoute from "../Components/PrivateRoute.jsx";
import fetchMock from "jest-fetch-mock";
import SingleRestaurantPage from "../Routes/RestaurantPage.jsx";
import RestaurantTable from "../Components/RestaurantTable.jsx";
/**
 *
 * DO NOT CHANGE ANYTHING HERE
 * THIS WILL NOT WORK FOR CODESANDBOX
 * PLEASE FOCUS ON READING YOUR
 */
jest.setTimeout(60000);
beforeAll(() => {
  // attempt is 1
  global.score = 1;
  console.log("Resetting Score to 1");
  fetchMock.enableMocks();
});

beforeEach(() => {
  cleanup();
});
describe("App loads correctly", () => {
  test("App loads correctly", async () => {
    const { debug, getByTestId, getAllByTestId, findAllByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const login = getByTestId("login-link");
    const home = getByTestId("home-link");
    expect(login).toHaveTextContent("Login Page");
    expect(home).toHaveTextContent("Home");
    global.score += 1; // app is mounting correctly
  });
});
describe("Pagination component", () => {
  test("pagination component works correctly 1", async () => {
    const fn = jest.fn();
    const { debug, getByTestId, getAllByTestId, findAllByTestId } = render(
      <Pagination handlePageChange={fn} totalPages={5} currentPage={2} />
    );
    const pages = getAllByTestId("page-btn");
    expect(pages.length).toBe(5);
    [
      // disabled correct one
      (null, true, null, null, null),
    ].forEach((state, i) => {
      expect(pages[i].textContent.trim()).toBe(`${i + 1}`);
      expect(pages[i].getAttribute("disabled")).toBe(state);
    });
    // on click change buttons
    // on click change buttons
    fireEvent.click(pages[1]);
    expect(fn).toBeCalledTimes(0);
    fireEvent.click(pages[4]);
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(5);
    fireEvent.click(pages[4]);
    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith(5);
    global.score += 1; // pagination
  });
  test("pagination component works correctly 2 ", async () => {
    const fn = jest.fn();
    const { debug, getByTestId, getAllByTestId, findAllByTestId } = render(
      <Pagination handlePageChange={fn} totalPages={8} currentPage={4} />
    );
    const pages = getAllByTestId("page-btn");
    expect(pages.length).toBe(8);
    [
      // disabled correct one
      (null, null, null, null, true, null, null, null),
    ].forEach((state, i) => {
      expect(pages[i].getAttribute("disabled")).toBe(state);
    });
    // on click change buttons
    fireEvent.click(pages[4]);
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(5);
    fireEvent.click(pages[4]);
    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith(5);
    global.score += 1; // pagination
  });
});
describe("Restaurant component", () => {
  test("Restaurant Components exist", () => {
    render(
      <MemoryRouter>
        <RestaurantTable data={page1} />
      </MemoryRouter>
    );
    const restaurants = screen.getAllByTestId("item");
    expect(restaurants.length).toBe(10);
    restaurants.forEach((restaurant, i) => {
      const { name, type, rating, votes, price } =
        RestaurantRowElements(restaurant);
      expect(name.textContent.trim()).toBe(page1[i].name);
      expect(type.textContent.trim()).toBe(map[page1[i].type]);
      expect(price.textContent.trim()).toBe(
        page1[i].price_starts_from.toString()
      );
    });
    global.score += 1; // restaurant component
  });
});

describe("Private Routes", () => {
  test("Private Route component redirects user to login when visiting /dashboard page", async () => {
    const { debug, getByTestId, getAllByTestId, findAllByTestId } = render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );

    const form = getByTestId("login-form");
    expect(form).toBeInTheDocument();
    global.score += 1; // private route
  });

  test("Private Route component redirects user to login when visiting /restaurants/:id page", async () => {
    const { debug, getByTestId, getAllByTestId, findAllByTestId } = render(
      <MemoryRouter initialEntries={["/restaurants/1"]}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );

    const form = getByTestId("login-form");
    expect(form).toBeInTheDocument();
    global.score += 1; // private route
  });
});
describe("App Context works correctly", () => {
  test("values in context are correctly mapped", () => {
    const MockApp = () => {
      const { authState } = useContext(AppContext);
      return (
        <div>
          <h1 data-testid="mock-state-auth">{authState.isAuth.toString()}</h1>
          <h2 data-testid="mock-state-token">
            {authState.token === null ? "null" : "not null"}
          </h2>
        </div>
      );
    };
    const { debug, getByTestId, getAllByTestId, findByTestId } = render(
      <AppContextProvider>
        <MockApp />
      </AppContextProvider>
    );
    const isAuth = getByTestId("mock-state-auth");
    const token = getByTestId("mock-state-token");
    expect(isAuth.textContent).toBe("false");
    expect(token.textContent).toBe("null");
    global.score += 1; // correct data used in context api
  });
});
// login page
describe("Login APIs and functionality", () => {
  test("Login page works correctly with API, token is shown, and user is able to logout", async () => {
    fetchMock.dontMockOnce().dontMockOnce();
    const { debug, getByTestId, getAllByTestId, findByTestId } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );

    const form = getByTestId("login-form");
    const email = getByTestId("email-input");
    const password = getByTestId("password-input");
    const submit = getByTestId("form-submit");

    expect(form).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    const values = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };
    fireEvent.change(email, {
      target: {
        value: values.email,
      },
    });

    fireEvent.change(password, {
      target: {
        value: values.password,
      },
    });

    expect(email.value).toBe(values.email);
    expect(password.value).toBe(values.password);
    await act(() => {
      fireEvent.click(submit);
    });
    expect(submit).toBeDisabled();
    const token = await findByTestId("user-token");
    expect(token).toHaveTextContent("QpwL5tke4Pnpja7X4");
    {
      const logout = getByTestId("logout-btn");
      await act(() => {
        fireEvent.click(logout);
      });
      const form = getByTestId("login-form");
      expect(form).toBeInTheDocument();
    }
    global.score += 2; // login page api
    fetchMock.resetMocks();
  });

  test("Login page works correctly when API is mocked", async () => {
    fetchMock
      .once(
        JSON.stringify({
          token: "Qw12la31afa13e1ds",
        })
      )
      .once(JSON.stringify([]));
    const { debug, getByTestId, getAllByTestId, findByTestId } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );

    const form = getByTestId("login-form");
    const email = getByTestId("email-input");
    const password = getByTestId("password-input");
    const submit = getByTestId("form-submit");

    expect(form).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    const values = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };
    fireEvent.change(email, {
      target: {
        value: values.email,
      },
    });

    fireEvent.change(password, {
      target: {
        value: values.password,
      },
    });

    expect(email.value).toBe(values.email);
    expect(password.value).toBe(values.password);
    await act(() => {
      fireEvent.click(submit);
    });
    expect(submit).toBeDisabled();
    const token = await findByTestId("user-token");
    expect(token).toHaveTextContent("Qw12la31afa13e1ds");
    {
      const logout = getByTestId("logout-btn");
      await act(() => {
        fireEvent.click(logout);
      });
      const form = getByTestId("login-form");
      expect(form).toBeInTheDocument();
    }
    global.score += 3; // login page api with mocking
  });
});

function getItemsInCard(card) {
  return {
    name: card.querySelector("[data-testid='name']"),
    rating: card.querySelector("[data-testid='rating']"),
    type: card.querySelector("[data-testid='type']"),
    votes: card.querySelector("[data-testid='votes']"),
    price: card.querySelector("[data-testid='price']"),
  };
}
//
describe("Home page functionality", () => {
  test("Home page works correctly", async () => {
    fetchMock
      .once(
        JSON.stringify({
          token: "Qw12la31afa13e1ds",
        })
      )
      .once(JSON.stringify({ data: page1, totalPages: 10 }))
      .once(JSON.stringify({ data: page2, totalPages: 10 }));

    const history = createMemoryHistory();
    const {
      debug,
      getByTestId,
      getAllByTestId,
      findByTestId,
      findAllByTestId,
    } = render(
      <MemoryRouter history={history} initialEntries={["/login"]}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );
    {
      const form = getByTestId("login-form");
      const email = getByTestId("email-input");
      const password = getByTestId("password-input");
      const submit = getByTestId("form-submit");

      expect(form).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(submit).toBeInTheDocument();

      const values = {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      };
      fireEvent.change(email, {
        target: {
          value: values.email,
        },
      });

      fireEvent.change(password, {
        target: {
          value: values.password,
        },
      });

      expect(email.value).toBe(values.email);
      expect(password.value).toBe(values.password);
      await act(() => {
        fireEvent.click(submit);
      });

      const token = await findByTestId("user-token");
      expect(token).toHaveTextContent("Qw12la31afa13e1ds");
    }
    {
      await sleep(3000);
      const items = await findAllByTestId("item");
      expect(items.length).toBe(page1.length);
      page1.forEach((res, i) => {
        const { name, rating, type, votes, price } = getItemsInCard(items[i]);
        expect(name).toHaveTextContent(res.name);
        expect(rating).toHaveTextContent(res.rating);
        expect(price).toHaveTextContent(res.price_starts_from);
      });
    }
    const pages = getAllByTestId("page-btn");
    expect(pages.length).toBe(10);
    await act(() => {
      fireEvent.click(pages[1]);
    });

    {
      await sleep(3000);
      const items = await findAllByTestId("item");
      expect(items.length).toBe(page1.length);
      page2.forEach((res, i) => {
        const { name, rating, type, votes, price } = getItemsInCard(items[i]);
        expect(name).toHaveTextContent(res.name);
        expect(rating).toHaveTextContent(res.rating);
        expect(price).toHaveTextContent(res.price_starts_from);
      });
    }

    global.score += 3; // home page works correctly
  });

  test("All Filters are present", async () => {
    fetchMock.dontMockOnce().dontMockOnce();
    const history = createMemoryHistory();
    const {
      debug,
      getByTestId,
      getAllByTestId,
      findByTestId,
      findAllByTestId,
    } = render(
      <MemoryRouter history={history} initialEntries={["/login"]}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );
    {
      const form = getByTestId("login-form");
      const email = getByTestId("email-input");
      const password = getByTestId("password-input");
      const submit = getByTestId("form-submit");
      const values = {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      };
      fireEvent.change(email, {
        target: {
          value: values.email,
        },
      });

      fireEvent.change(password, {
        target: {
          value: values.password,
        },
      });
      await act(() => {
        fireEvent.click(submit);
      });
    }
    await sleep(3000);
    const filters = getByTestId("filter-box");
    expect(filters).toBeDefined();
    expect(filters.children.length).toBe(6);
    const text = Array.from(filters.children).map((item) => item.textContent);
    let c = 0;
    text.forEach(
      (t) =>
        [
          "All",
          "Fine Dining",
          "Ethnic",
          "Fast Food",
          "Cafe",
          "Casual Dining",
        ].includes(t) && c++
    );
    expect(c).toBe(6);
    global.score += 1; // flters are present
    fetchMock.resetMocks();
  });

  test("Filters work correctly", async () => {
    fetchMock
      .once(
        JSON.stringify({
          token: "Qw12la31afa13e1ds",
        })
      )
      .once(JSON.stringify({ data: page1, totalPages: 10 }))
      .once(JSON.stringify(fd_page));

    const history = createMemoryHistory();
    const {
      debug,
      getByTestId,
      getAllByTestId,
      findByTestId,
      findAllByTestId,
    } = render(
      <MemoryRouter history={history} initialEntries={["/login"]}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );
    {
      const form = getByTestId("login-form");
      const email = getByTestId("email-input");
      const password = getByTestId("password-input");
      const submit = getByTestId("form-submit");
      const values = {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      };
      fireEvent.change(email, {
        target: {
          value: values.email,
        },
      });

      fireEvent.change(password, {
        target: {
          value: values.password,
        },
      });
      await act(() => {
        fireEvent.click(submit);
      });
    }
    await sleep(3000);
    const filters = getByTestId("filter-box");
    expect(filters).toBeDefined();
    expect(filters.children.length).toBe(6);

    await act(() => {
      fireEvent.change(filters, {
        target: {
          value: "fine_dining",
        },
      });
    });

    expect(filters.value).toBe("fine_dining");
    global.score += 1; // filters change on click

    Array.from(filters.children).find((item) =>
      item.value === "fine_dining"
        ? expect(item.selected).toBeTruthy()
        : expect(item.selected).toBeFalsy()
    );
    await sleep(3000);
    const items = await findAllByTestId("item");
    items.forEach((item, i) => {
      const { name, rating, type, price } = getItemsInCard(items[i]);
      expect(name.textContent).toBe(fd_page.data[i].name);
      expect(rating.textContent).toBe(fd_page.data[i].rating.toString());
      expect(price.textContent).toBe(
        fd_page.data[i].price_starts_from.toString()
      );
      expect(type.textContent).toBe("Fine Dining");
    });
    global.score += 3; // filters give you the correct output
  });

  test("Redirecting from Dashboard page to restaurant page works correctly", async () => {
    fetchMock
      .once(
        JSON.stringify({
          token: "Qw12la31afa13e1ds",
        })
      )
      .once(JSON.stringify({ data: page1, totalPages: 10 }))
      .once(
        JSON.stringify({
          data: {
            id: 1,
            name: "Shute",
            type: "fine_dining",
            rating: 4.5,
            number_of_votes: 588,
            price_starts_from: 925,
            image: "https://picsum.photos/200",
          },
        })
      );

    const history = createMemoryHistory();

    const {
      debug,
      getByTestId,
      getAllByTestId,
      findByTestId,
      findAllByTestId,
    } = render(
      <MemoryRouter history={history} initialEntries={["/login"]}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MemoryRouter>
    );
    {
      const form = getByTestId("login-form");
      const email = getByTestId("email-input");
      const password = getByTestId("password-input");
      const submit = getByTestId("form-submit");

      expect(form).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(submit).toBeInTheDocument();

      const values = {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      };
      fireEvent.change(email, {
        target: {
          value: values.email,
        },
      });

      fireEvent.change(password, {
        target: {
          value: values.password,
        },
      });

      expect(email.value).toBe(values.email);
      expect(password.value).toBe(values.password);
      await act(() => {
        fireEvent.click(submit);
      });

      await sleep(3000);
      const token = await findByTestId("user-token");
      expect(token).toHaveTextContent("Qw12la31afa13e1ds");
    }
    {
      const items = await findAllByTestId("item");

      const { name } = RestaurantRowElements(items[0]);
      expect(name).toHaveAttribute("href", "/restaurants/1");
      await act(() => {
        fireEvent.click(name);
      });
      const restaurant = await findByTestId("restaurant-container");

      expect(restaurant).toBeInTheDocument();
    }

    global.score += 1; // redirection works correctly
  });
});

describe("Restaruant Page", () => {
  test("Restaurant page works correctly 1", async () => {
    fetchMock.once(
      JSON.stringify({
        data: {
          id: 1,
          name: "Shute",
          type: "fine_dining",
          rating: 4.5,
          number_of_votes: 588,
          price_starts_from: 925,
          image: "https://picsum.photos/200",
        },
      })
    );

    const history = createMemoryHistory();
    const {
      debug,
      getByTestId,
      getAllByTestId,
      findByTestId,
      findAllByTestId,
    } = render(
      <MemoryRouter history={history} initialEntries={["/restaurants/1"]}>
        <AppContextProvider>
          <SingleRestaurantPage />
        </AppContextProvider>
      </MemoryRouter>
    );
    const loader = await findByTestId("loading-container");
    expect(loader).toBeDefined();
    const container = await findByTestId("restaurant-container");
    const { name, type, rating, votes, price, image } =
      getRestaurantPageElements(container);
    expect(name).toHaveTextContent("Shute");
    expect(type).toHaveTextContent("Fine Dining");
    expect(rating).toHaveTextContent("4.5");
    expect(votes).toHaveTextContent("588");
    expect(price).toHaveTextContent("925");
    expect(image).toHaveAttribute("src", "https://picsum.photos/200");
    expect(image).toHaveAttribute("alt", "Shute");
    global.score += 1; // restaurant entity pages work correctly
  });
  test("Restaurant page works correctly 2", async () => {
    fetchMock.once(
      JSON.stringify({
        data: {
          id: 15,
          name: "Grellier",
          type: "fine_dining",
          rating: 4,
          number_of_votes: 123,
          price_starts_from: 475,
          image: "https://picsum.photos/200",
        },
      })
    );

    const history = createMemoryHistory();
    const {
      debug,
      getByTestId,
      getAllByTestId,
      findByTestId,
      findAllByTestId,
    } = render(
      <MemoryRouter history={history} initialEntries={["/restaurants/15"]}>
        <AppContextProvider>
          <SingleRestaurantPage />
        </AppContextProvider>
      </MemoryRouter>
    );
    const loader = await findByTestId("loading-container");
    expect(loader).toBeDefined();
    const container = await findByTestId("restaurant-container");
    const { name, type, rating, votes, price, image } =
      getRestaurantPageElements(container);
    expect(name).toHaveTextContent("Grellier");
    expect(type).toHaveTextContent("Fine Dining");
    expect(rating).toHaveTextContent("4");
    expect(votes).toHaveTextContent("123");
    expect(price).toHaveTextContent("475");
    expect(image).toHaveAttribute("src", "https://picsum.photos/200");
    expect(image).toHaveAttribute("alt", "Grellier");
    global.score += 1; // restaurant entity pages work correctly
  });
});

afterAll(() => {
  console.log("Max marks is, 24");
  console.log("Final Score is", global.score);
});

function RestaurantRowElements(container) {
  return {
    name: container.querySelector("[data-testid='name']"),
    type: container.querySelector("[data-testid='type']"),
    rating: container.querySelector("[data-testid='rating']"),
    votes: container.querySelector("[data-testid='votes']"),
    price: container.querySelector("[data-testid='price']"),
  };
}

function getRestaurantPageElements(container) {
  return {
    name: container.querySelector("[data-testid='restaurant-name']"),
    type: container.querySelector("[data-testid='restaurant-type']"),
    rating: container.querySelector("[data-testid='restaurant-rating']"),
    votes: container.querySelector("[data-testid='restaurant-votes']"),
    price: container.querySelector("[data-testid='restaurant-price']"),
    image: container.querySelector("[data-testid='restaurant-image']"),
  };
}

const page1 = [
  {
    id: 1,
    name: "Shute",
    type: "fine_dining",
    rating: 4.5,
    number_of_votes: 588,
    price_starts_from: 925,
    image: "https://picsum.photos/200",
  },
  {
    id: 2,
    name: "Pitone",
    type: "ethnic",
    rating: 3,
    number_of_votes: 572,
    price_starts_from: 100,
    image: "https://picsum.photos/200",
  },
  {
    id: 3,
    name: "Danigel",
    type: "fast_food",
    rating: 2,
    number_of_votes: 189,
    price_starts_from: 230,
    image: "https://picsum.photos/200",
  },
  {
    id: 4,
    name: "Gallemore",
    type: "cafe",
    rating: 1.5,
    number_of_votes: 643,
    price_starts_from: 210,
    image: "https://picsum.photos/200",
  },
  {
    id: 5,
    name: "Downgate",
    type: "ethnic",
    rating: 5,
    number_of_votes: 639,
    price_starts_from: 975,
    image: "https://picsum.photos/200",
  },
  {
    id: 6,
    name: "Tidder",
    type: "cafe",
    rating: 1.5,
    number_of_votes: 561,
    price_starts_from: 400,
    image: "https://picsum.photos/200",
  },
  {
    id: 7,
    name: "Tookill",
    type: "casual_dining",
    rating: 4,
    number_of_votes: 970,
    price_starts_from: 250,
    image: "https://picsum.photos/200",
  },
  {
    id: 8,
    name: "Vahey",
    type: "casual_dining",
    rating: 4,
    number_of_votes: 745,
    price_starts_from: 210,
    image: "https://picsum.photos/200",
  },
  {
    id: 9,
    name: "Bache",
    type: "fast_food",
    rating: 1.5,
    number_of_votes: 977,
    price_starts_from: 120,
    image: "https://picsum.photos/200",
  },
  {
    id: 10,
    name: "Mathouse",
    type: "cafe",
    rating: 5,
    number_of_votes: 466,
    price_starts_from: 230,
    image: "https://picsum.photos/200",
  },
];
const page2 = [
  {
    id: 11,
    name: "Havock",
    type: "casual_dining",
    rating: 1,
    number_of_votes: 373,
    price_starts_from: 360,
    image: "https://picsum.photos/200",
  },
  {
    id: 12,
    name: "von Grollmann",
    type: "ethnic",
    rating: 2.5,
    number_of_votes: 677,
    price_starts_from: 150,
    image: "https://picsum.photos/200",
  },
  {
    id: 13,
    name: "Duffet",
    type: "fast_food",
    rating: 5,
    number_of_votes: 937,
    price_starts_from: 1450,
    image: "https://picsum.photos/200",
  },
  {
    id: 14,
    name: "Cribbins",
    type: "fast_food",
    rating: 1,
    number_of_votes: 56,
    price_starts_from: 100,
    image: "https://picsum.photos/200",
  },
  {
    id: 15,
    name: "Grellier",
    type: "fine_dining",
    rating: 4,
    number_of_votes: 123,
    price_starts_from: 475,
    image: "https://picsum.photos/200",
  },
  {
    id: 16,
    name: "Dargie",
    type: "fast_food",
    rating: 2,
    number_of_votes: 217,
    price_starts_from: 725,
    image: "https://picsum.photos/200",
  },
  {
    id: 17,
    name: "Meekin",
    type: "casual_dining",
    rating: 4.5,
    number_of_votes: 948,
    price_starts_from: 500,
    image: "https://picsum.photos/200",
  },
  {
    id: 18,
    name: "Franchyonok",
    type: "fine_dining",
    rating: 4,
    number_of_votes: 869,
    price_starts_from: 975,
    image: "https://picsum.photos/200",
  },
  {
    id: 19,
    name: "Bennit",
    type: "ethnic",
    rating: 3.5,
    number_of_votes: 106,
    price_starts_from: 180,
    image: "https://picsum.photos/200",
  },
  {
    id: 20,
    name: "Stanbrooke",
    type: "ethnic",
    rating: 4.5,
    number_of_votes: 497,
    price_starts_from: 925,
    image: "https://picsum.photos/200",
  },
];

const fd_page = {
  data: [
    {
      id: 1,
      name: "Shute",
      type: "fine_dining",
      rating: 4.5,
      number_of_votes: 588,
      price_starts_from: 925,
      image: "https://picsum.photos/200",
    },
    {
      id: 15,
      name: "Grellier",
      type: "fine_dining",
      rating: 4,
      number_of_votes: 123,
      price_starts_from: 475,
      image: "https://picsum.photos/200",
    },
    {
      id: 18,
      name: "Franchyonok",
      type: "fine_dining",
      rating: 4,
      number_of_votes: 869,
      price_starts_from: 975,
      image: "https://picsum.photos/200",
    },
    {
      id: 22,
      name: "MacAless",
      type: "fine_dining",
      rating: 4,
      number_of_votes: 831,
      price_starts_from: 1350,
      image: "https://picsum.photos/200",
    },
    {
      id: 27,
      name: "Btham",
      type: "fine_dining",
      rating: 1.5,
      number_of_votes: 857,
      price_starts_from: 200,
      image: "https://picsum.photos/200",
    },
    {
      id: 29,
      name: "Inett",
      type: "fine_dining",
      rating: 3,
      number_of_votes: 846,
      price_starts_from: 975,
      image: "https://picsum.photos/200",
    },
    {
      id: 39,
      name: "Risbrough",
      type: "fine_dining",
      rating: 5,
      number_of_votes: 863,
      price_starts_from: 1450,
      image: "https://picsum.photos/200",
    },
    {
      id: 40,
      name: "Wardingly",
      type: "fine_dining",
      rating: 1.5,
      number_of_votes: 611,
      price_starts_from: 475,
      image: "https://picsum.photos/200",
    },
    {
      id: 48,
      name: "Barth",
      type: "fine_dining",
      rating: 2,
      number_of_votes: 948,
      price_starts_from: 50,
      image: "https://picsum.photos/200",
    },
    {
      id: 54,
      name: "Wixey",
      type: "fine_dining",
      rating: 1.5,
      number_of_votes: 989,
      price_starts_from: 400,
      image: "https://picsum.photos/200",
    },
  ],
  totalPages: 2,
};

const sleep = (delay) => new Promise((res) => setTimeout(res, delay));
const map = {
  fine_dining: "Fine Dining",
  ethnic: "Ethnic",
  fast_food: "Fast Food",
  cafe: "Cafe",
  casual_dining: "Casual Dining",
};
