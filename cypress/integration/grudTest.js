/// <reference types="cypress" />

describe('Testing GRUD operations', () => {

    beforeEach('Login to App', () => {
        cy.loginToApplication()
    })

    it('Test POST and DELETE operations', () => {
        const bodyRequest = {
            "article": {
                "title": "Request from API",
                "description": "API Testing",
                "body": "Automation",
                "tagList": []
            }
        }

        cy.get('@token').then( token => {

            cy.request({
                url: Cypress.env("apiURL")+'/api/articles/',
                headers: {'Authorization': 'Token ' + token},
                method: 'POST',
                body: bodyRequest
            }).then( response => {
                const slug = response.body.article.slug
                console.log(Cypress.env("apiURL")+'/api/articles/'+ slug)
                cy.request({ 
                    url: Cypress.env("apiURL")+'/api/articles/'+ slug,
                    headers: {'Authorization': 'Token ' + token},
                    method: 'DELETE'
                })
            })
        })
    })
})