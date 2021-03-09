describe('URL Shortener', () => {
    beforeEach(() => {
        const baseURL = "http://localhost:3000/";
        cy.visit(baseURL)
    })

    it('Should allow a user to visit the homepage', () => {
        cy.get("h1")
          .should("contain", "URL Shortener")
          .get("form input[name=title]")
          .should("be.visible")
          .get("form input[name=urlToShorten]")
          .should("be.visible")
          .get("button")
          .should("contain", "Shorten Please!")
          .get(".url").should('be.visible')
          //add another test to test the actual existing shortened URL
    })
})

describe('Form', () => {
    beforeEach(() => {
        const baseURL = "http://localhost:3000/"
        cy.fixture("testURLData.json").then((reservationData) => {
          cy.intercept(
            "GET",
            "http://localhost:3001/api/v1/reservations",
            reservationData
          );
        });
        cy.visit(baseURL);
    })
})


// When a user visits the page, they can view the page title and the existing shortened URLs
// When a user visits the page, they can view the Form with the proper inputs
// When a user fills out the form, the information is reflected in the input fields

// When a user fills out and submits the form, the new shortened URL is rendered