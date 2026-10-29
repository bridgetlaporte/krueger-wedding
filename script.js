// -----------------------------------------------------------
// The Kruegers Wedding Website
// Senior Project GIT480
// Bridget LaPorte
// -----------------------------------------------------------



// Mobile nav ------------------------------------------------
// Get the menu button and mobile menu
const menuButton = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const menuLabel = document.querySelector(".menu-toggle .sr-only");
const menuLinks = document.querySelectorAll(".mobile-menu a");

// close the menu
function closeMenu(){
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuLabel.textContent = "Open Menu";
}

// Click the button to open/close
menuButton.addEventListener("click", function(){

    // Check if menu is already open
    if(mobileMenu.classList.contains("open")){
        closeMenu();
    } else {
        // Opens
        mobileMenu.classList.add("open");
        document.body.classList.add("menu-open");

        menuButton.setAttribute("aria-expanded", "true");
        mobileMenu.setAttribute("aria-hidden", "false");
        menuLabel.textContent = "Close Menu";
    }
});

// Closes the menu when a button clicked
for(let i = 0; i < menuLinks.length; i++){
    menuLinks[i].addEventListener("click", function(){
        closeMenu();
    });
}

