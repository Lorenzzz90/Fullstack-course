describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    const userTwo = {
      name: 'test2',
      username: 'test2',
      password: 'test2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', userTwo)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('Login').click()
    cy.contains('Log in to application')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.contains('Login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#submit-button').click()

      cy.contains('test logged-in')
    })

    it('fails with wrong credentials', () => {
      cy.contains('Login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach( () => {
      cy.login({ username: 'test', password: 'test' })
    })

    it('A blog can be created and liked', () => {
      cy.contains('create').click()
      cy.get('#title').type('test-title')
      cy.get('#author').type('test-author')
      cy.get('#url').type('www.testurl.com')
      cy.get('#submit-blog').click()
      cy.contains('test-title')
    })

    describe('When a blog is present', () => {
      beforeEach( () => {
        cy.createBlog({ title:'test-title', author:'test-author', url:'www.testurl.com', likes: 0 })
      })

      it('It can be liked', () => {
        cy.contains('view').click()
        cy.get('#like-button').click().click().click()
        cy.contains('3')
      })

      it('It can be deleted', () => {
        cy.contains('view').click()
        cy.contains('Remove').click()
        cy.contains('test-title').should('not.exist')
      })

      it('It cant be deleted by the wrong user', () => {
        cy.contains('Logout').click()
        cy.login({ username: 'test2', password: 'test2' })
        cy.contains('blogs')
        cy.contains('view').click()
        cy.contains('Remove').should('not.exist')
      })
    })
    it.only('When many blogs are present they are ordered by likes', () => {
      cy.createBlog({ title:'first-title', author:'first-author', url:'www.first.com', likes: 1000 })
      cy.createBlog({ title:'second-title', author:'second-author', url:'www.second.com', likes: 100 })
      cy.createBlog({ title:'third-title', author:'third-author', url:'www.third.com', likes: 1 })
      cy.contains('view').click()
      cy.contains('view').click()
      cy.contains('view').click()
      cy.get('.blogDiv').get('.likes').then(likes => {
        const x = [...likes].map(like => like.innerText)
        expect(x).to.deep.equal(['1000', '100', '1'])
      })
    })
  })
})