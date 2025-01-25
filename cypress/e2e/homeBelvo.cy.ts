describe("template spec", () => {
  it("redirects to /users after clicking button and checks button text", () => {
    cy.visit("/");
    // Buscar el elemento con el id 'cypress-description-home' que contiene el texto específico
    cy.get("#cypress-description-home").contains(
      "Welcome, Fernando! This is your gateway to mastering software development. Our app empowers you to connect, create, and innovate, all in one intuitive platform. Get a complete overview of your projects, code, and tools in real-time. Say goodbye to development headaches and hello to streamlined, efficient coding!"
    );

    cy.get("#cypress-btn-accounts").click(); // Utilizamos .click() para hacer clic en el enlace
    cy.url().should("include", "/users"); // Verificamos que la URL redirija a /users
  });
});

describe("template spec", () => {
  it("verifies the presence and text of the Belvo button", () => {
    cy.visit("/");

    // Verificar que el botón Belvo esté presente en el DOM
    cy.get("#cypress-btn-belvo").should("exist");

    // Esperar a que el botón Belvo esté completamente visible y cargado
    cy.get("#cypress-btn-belvo").should("be.visible");

    // Verificar que el botón tenga el texto "Belvo"
    cy.get("#cypress-btn-belvo").contains("Belvo");
  });
});

describe("template spec", () => {
  it("redirects to /", () => {
    cy.visit("/users");

    // Verificar que el botón 'Belvo' esté presente en el DOM y contenga el texto correcto
    cy.get("#cypress-btn-home-redirect").should("exist").and("be.visible");

    // Hacer clic en el botón 'Belvo'
    cy.get("#cypress-btn-home-redirect").click();

    // Verificar que la URL redirija a /users
    cy.url().should("include", "/");
  });
});
