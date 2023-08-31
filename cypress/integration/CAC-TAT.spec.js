// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    

    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
        
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

        const longText =  'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test';
        cy.get('#firstName').type('Abmael')
        cy.get('#lastName').type('Ferreir')
        cy.get('#email').type('abmael@hotmail.com')
        cy.get('#open-text-area').type(longText,  {delay:0})

        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

       cy.get('#firstName').type('Abmael')
        cy.get('#lastName').type('Ferreir')
        cy.get('#email').type('abmae,com')
        cy.get('#open-text-area').type('test')

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })

    it('Campo telefone continua vazio quando preenchido com valor não-numerico', function() {
        
         cy.get('#phone')
            .type('abscf')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Abmael')
        cy.get('#lastName').type('Ferreir')
        cy.get('#email').type('abmael@hotmail.com')        
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('test teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible') 
        
   })

   it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Abmael')
          .should('have.value','Abmael')
          .clear()
          .should('have.value','')

        cy.get('#lastName')
          .type('Ferreira')
          .should('have.value','Ferreira')
          .clear()
          .should('have.value','')

        cy.get('#email')
          .type('abmael@hotmail.com')
          .should('have.value','abmael@hotmail.com')
          .clear()
          .should('have.value','') 

        cy.get('#phone')
          .type('65992250424')
          .should('have.value','65992250424')
          .clear()
          .should('have.value','') 
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        // cy.get('button[type="submit"]').click()
        cy.contains('button[type="submit"]', 'Enviar').click()
        cy.get('.error').should('be.visible') 
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit()
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('select option')
      .as('options')
      cy.get('@options', { log:false }).then($options => {
         
          const optionText = $options.innerText = 'youtube'
          cy.get('select').select(optionText)

          cy.should('have.value', optionText )
        })
    })

    //Exemplo do professor

    it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    })
    

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
      cy.get('select option')
      .as('options')
      cy.get('@options', { log:false }).then($options => {
         
          const optionText = $options.value = 'mentoria'

          cy.get('select').select(optionText)

          cy.should('have.value', optionText )
        })
    })

     //Exemplo do professor
     it('seleciona um produto (Mentoria) por seu valor (value)', function() {
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    })


    it('seleciona um produto (Blog) por seu índice', function() {
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]').check()
      .should('have.value', 'feedback')

    })

    it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })      
    })


    it('marca ambos checkboxes, depois desmarca o último', function() {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last().uncheck()
        .should('not.be.checked')
      
      
    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário with check', function() {
      cy.get('#firstName').type('Abmael')
      cy.get('#lastName').type('Ferreir')
      cy.get('#email').type('abmael@hotmail.com')        
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('test teste')
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible') 
      
 })




})
  
/**
 * cy.get('select option')
        .as('options')
        .its('length', { log: false }).then(n => {
          cy.get('@options', { log:false }).then($options => {
            const randomOptionIndex = Cypress._.random(n - 1)
            const randomOptionText = $options[randomOptionIndex].innerText
            cy.get('select').select(randomOptionText)

            cy.should('have.value', randomOptionText )
          })
        })
 */