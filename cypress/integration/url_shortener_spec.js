describe.only("URL Shortener", () => {
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

    it.only("Should allow a user to see the homepage title and existing shortened URLS", () => {
      cy.get("h1")
        .should("contain", "URL Shortener")
        .get(".url")
        .should("be.visible")
        .first()
        .children()
        .first()
        .should("contain", "Happy Cat")
        .next()
        .should("contain", "http://localhost:3001/useshorturl/100")
        .next()
        .should(
          "contain",
          "https://images.unsplash.com/photo-1591860455878-5458e029601e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        )
        .get(".url")
        .should("be.visible")
        .first()
        .next()
        .children()
        .first()
        .should("contain", "happy dogs")
        .next()
        .should("contain", "http://localhost:3001/useshorturl/101")
        .next()
        .should(
          "contain",
          "https://images.unsplash.com/photo-1601758003630-df669e4e825a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        )
    })

    it('should allow a user to be able to view a form with the proper inputs', () => {
        cy.get("form input[name=title]")
          .should("be.visible")
          .get("form input[name=urlToShorten]")
          .should("be.visible")
          .get("button")
          .should("contain", "Shorten Please!")
    })

    it('should allow a user to fill out the form and see their information reflected in the input', () => {
        cy.get("form input[name=title]")
          .type("happy goat")
          .should("have.value", "happy goat")
          .get("form input[name=urlToShorten]")
          .type("https://unsplash.com/photos/xB0e8bDV4ww")
          .should("have.value", "https://unsplash.com/photos/xB0e8bDV4ww")
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