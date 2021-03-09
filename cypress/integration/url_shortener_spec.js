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
        cy.fixture("testURLData.json").then((urlData) => {
          cy.intercept(
            "GET",
            "http://localhost:3001/api/v1/urls",
            urlData
          )
        })
        cy.visit(baseURL);
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
        cy.visit("http://localhost:3000")
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
          .get("form input[name=urlToShorten]")
          .type("https://unsplash.com/photos/G_oWb_hcfx8")
          .get("button")
          .click()
          .get(".url")
          .children()
          .last()
          .should("contain", "https://unsplash.com/photos/G_oWb_hcfx8");
    })
})


// When a user visits the page, they can view the page title and the existing shortened URLs
// When a user visits the page, they can view the Form with the proper inputs
// When a user fills out the form, the information is reflected in the input fields

// When a user fills out and submits the form, the new shortened URL is rendered