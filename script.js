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






// Home photo gallery ----------------------------------------
const galleryButtons = document.querySelectorAll(".gallery-tile");
const lightbox = document.querySelector("#image-lightbox");

if(galleryButtons.length > 0 && lightbox){
    const lightboxImage = document.querySelector(".lightbox-image");
    const closePhotoButton = document.querySelector(".lightbox-close");
    const previousPhotoButton = document.querySelector(".lightbox-prev");
    const nextPhotoButton = document.querySelector(".lightbox-next");

    let currentPhoto = 0;
    let openedPhotoButton = galleryButtons[0];

    function showPhoto(index){
        if(index < 0){
            currentPhoto = galleryButtons.length - 1;
        } else if(index >= galleryButtons.length){
            currentPhoto = 0;
        } else {
            currentPhoto = index;
        }

        const photo = galleryButtons[currentPhoto].querySelector("img");
        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;
    }


    for(let i = 0; i < galleryButtons.length; i++){
        galleryButtons[i].addEventListener("click", function(){
            openedPhotoButton = galleryButtons[i];
            showPhoto(i);
            lightbox.showModal();
        });
    }

    closePhotoButton.addEventListener("click", function(){
        lightbox.close();
    });

    previousPhotoButton.addEventListener("click", function(){
        showPhoto(currentPhoto - 1);
    });

    nextPhotoButton.addEventListener("click", function(){
        showPhoto(currentPhoto + 1);
    });

    lightbox.addEventListener("keydown", function(event){
        if(event.key === "ArrowLeft"){
            showPhoto(currentPhoto - 1);
        } else if(event.key === "ArrowRight"){
            showPhoto(currentPhoto + 1);
        }
    });

    lightbox.addEventListener("close", function(){
        openedPhotoButton.focus();
    });

}


// Gallery page - still uses lightbox above but splits photos into page categories ------------------------------
const engagementTab = document.querySelector("#engagement-tab");
const weddingTab = document.querySelector("#wedding-tab");
const engagementGallery = document.querySelector("#engagement-gallery");
const weddingGallery = document.querySelector("#wedding-gallery");

if(engagementTab && weddingTab && engagementGallery && weddingGallery){

    // Shows engagement photos
    engagementTab.addEventListener("click", function(){
        engagementGallery.hidden = false;
        weddingGallery.hidden = true;

        engagementTab.classList.add("active");
        weddingTab.classList.remove("active");

        engagementTab.setAttribute("aria-pressed", "true");
        weddingTab.setAttribute("aria-pressed", "false");
    });

    // Shows wedding photos
    weddingTab.addEventListener("click", function(){
        engagementGallery.hidden = true;
        weddingGallery.hidden = false;

        weddingTab.classList.add("active");
        engagementTab.classList.remove("active");

        weddingTab.setAttribute("aria-pressed", "true");
        engagementTab.setAttribute("aria-pressed", "false");
    });
}


