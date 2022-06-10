describe('Functionality test', () => {
  before(()=>{
    cy.viewport(1920, 1080)
  })
  it('Sign up Functionality', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Sign up').click()
    cy.get('#Email').type('pepetest123@gmail.com')
    cy.get('#Password').type('pepe123')
    cy.get('Button').click()
  })
  it('Login Functionality', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('#Email').type('pepetest123@gmail.com')
    cy.get('#Password').type('pepe123')
    cy.get('Button').click()
  })
  it('Steam API link Functionality', () => {
    cy.visit('http://localhost:3001/auth/steam/')
    cy.get('#steamAccountName').type("influenzawow")
    cy.get('#steamPassword').type("muerto1977")
    cy.get('#imageLogin').click()
  })
  it('Login and Recommendations Functionality', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('#Email').type('pepetest123@gmail.com')
    cy.get('#Password').type('pepe123')
    cy.get('Button').click()
    cy.contains("Recomendations").click()
    cy.contains("Click me!").click()
    cy.get("#0").click()
    cy.contains("Song")
  })
})