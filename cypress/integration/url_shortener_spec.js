describe("URL Shortener", () => {
    beforeEach(() => {
      const baseURL = "http://localhost:3000/";
      cy.visit(baseURL);
    });

    it("Should allow a user to see the homepage title and exisiting shortened URLS", () => {
      cy.get("h1")
        .should("contain", "URL Shortener")
        .get(".url")
        .should("be.visible")
        .first()
        .get("h3")
        .should("contain", "Awesome photo")
        .get("a")
        .should("contain", "http://localhost:3001/useshorturl/1")
        .get("p")
        .should(
          "contain",
          "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
        )
    })

    it('should allow a user to be able to view a form with the proper inputs', () => {
        cy.get("form input[name=title]")
          .should("be.visible")
          .type("happy goat")
          .should("have.value", "happy goat")
          .get("form input[name=urlToShorten]")
          .should("be.visible")
          .type("https://unsplash.com/photos/xB0e8bDV4ww")
          .should("have.value", "https://unsplash.com/photos/xB0e8bDV4ww")
          .get("button")
          .should("contain", "Shorten Please!")
    })
  })

describe('Form', () => {
    beforeEach(() => {
        const baseURL = "http://localhost:3000/"
        cy.fixture("testURLData.json").then((urlData) => {
          cy.intercept(
            "GET",
            "http://localhost:3001/api/v1/urls",
            urlData
          )
        })
        cy.visit(baseURL)
    })

    it ('should be able to fill out the form with inputs', () => {
        cy.get("form input[name=title]")
          .type("happy chickens")
          .should("have.value", "happy chickens")
          .get("form input[name=urlToShorten]")
          .type("https://unsplash.com/photos/S9zGj88fgds")
          .should("have.value", "https://unsplash.com/photos/S9zGj88fgds")
    })

    it('should be able to add a new URl to the page after filling out the form', () => {
        cy
          .intercept("POST", "http://localhost:3001/api/v1/urls", {
            statusCode: 201,
            body: {
              id: 105,
              title: "happy cow",
              long_url: "https://unsplash.com/photos/G_oWb_hcfx8",
              short_url: "http://localhost:3001/useshorturl/105",
            },
          })
          .get("form input[name=title]")
          .type("happy cow")
          .should("have.value", "happy cow")
          .get("form input[name=urlToShorten]")
          .type("https://unsplash.com/photos/G_oWb_hcfx8")
          .should("have.value", "https://unsplash.com/photos/G_oWb_hcfx8")
          .get("button")
          .click()
          .get(".url")
          .last()
          .get("h3")
          .should("contain", "happy cow")
          .get("a")
          .should("contain", "http://localhost:3001/useshorturl/105")
          .get("p")
          .should("contain", "https://unsplash.com/photos/G_oWb_hcfx8")
    })
})