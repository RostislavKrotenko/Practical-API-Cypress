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
                cy.request({ 
                    url: Cypress.env("apiURL")+'/api/articles/'+ slug,
                    headers: {'Authorization': 'Token ' + token},
                    method: 'DELETE'
                })
            })
        })
    })

    it('Test POST and GET request', () => {
        
        
        const bodyRequest = {
            "article": {
                "title": "POST and GET",
                "description": "POST and GET test operations",
                "body": "tryng to use POST and GET operations during testing",
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

                cy.request({ 
                    url: Cypress.env("apiURL")+'/api/articles/',
                    headers: {'Authorization': 'Token ' + token},
                    method: 'GET',
                }).its('body').then(body => {
                    expect(body.articles[0].title).to.equal('POST and GET')
                    expect(body.articles[0].description).to.equal("POST and GET test operations")
                })

                cy.request({ 
                    url: Cypress.env("apiURL")+'/api/articles/'+ slug,
                    headers: {'Authorization': 'Token ' + token},
                    method: 'DELETE'
                })
            })  
        })   
    })

    it.only('Test PUT request', () => {

        const newData ={
            "user": {
                "image": "",
                "username": "Rostyslav",
                "bio": "Test Automation",
                "email": "rostik.krotenko@gmail.com",
                "password": "apple123"
            }
        }

        cy.get('@token').then( token => {
            cy.request({
                url: Cypress.env("apiURL") + '/api/user',
                headers: {'Authorization': 'Token ' + token},
                method: 'PUT',
                body: newData
            })

            cy.request({
                url: Cypress.env("apiURL")+'/api/profiles/'+newData.user.username,
                headers: {'Authorization': 'Token ' + token},
                method: 'GET'
            }).then( response => {
                expect(response.body.profile.username).to.equal('Rostyslav')
                expect(response.body.profile.bio).to.equal('Test Automation')
                expect(response.body.profile.image).to.equal('https://api.realworld.io/images/smiley-cyrus.jpeg')
            })
        })
    })
})