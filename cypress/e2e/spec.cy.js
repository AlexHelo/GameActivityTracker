describe('Functionality test', () => {
  it('Login Functionality', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Sign up').click()
    cy.get('.Signup__Input-sc-nzwlft-13 bPLiXj').type('Hello, World')


  })
})