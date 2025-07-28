document.addEventListener('DOMContentLoaded', () => {
    // Select all FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    // Select all main images in the risks-img-wrapper
    const mainImages = document.querySelectorAll('.risks-img-wrapper .faq-img');

    // Function to close all FAQ items
    function closeAllFaqItems() {
        faqItems.forEach(item => {
            item.classList.remove('open');
            item.querySelector('.faq-title').classList.remove('open');
            const faqText = item.querySelector('.faq-text');
            if (faqText) {
                faqText.classList.remove('open');
                faqText.style.height = '0px'; // Collapse the text content
                faqText.style.marginTop = '0px'; // Reset margin top
                faqText.style.display = 'none'; // Hide the element
            }
            const faqContentImg = item.querySelector('.faq-content-img');
            if (faqContentImg) {
                faqContentImg.classList.remove('open');
            }
        });
        // Hide all main images
        mainImages.forEach(img => {
            img.classList.remove('open');
        });
    }

    // Add click event listener to each FAQ item
    faqItems.forEach(item => {
        const faqTitle = item.querySelector('.faq-title');
        const faqText = item.querySelector('.faq-text');
        const faqContentImg = item.querySelector('.faq-content-img');

        // Check if elements exist before adding event listeners
        if (faqTitle && faqText && faqContentImg) {
            faqTitle.addEventListener('click', () => {
                // Check if the clicked item is already open
                const isAlreadyOpen = item.classList.contains('open');

                // Close all FAQ items first
                closeAllFaqItems();

                // If the clicked item was not already open, open it
                if (!isAlreadyOpen) {
                    item.classList.add('open');
                    faqTitle.classList.add('open');
                    faqText.classList.add('open');
                    faqContentImg.classList.add('open');

                    // Calculate the natural height of the content inside faq-text
                    // To ensure smooth transition, set display to block temporarily to get scrollHeight
                    faqText.style.display = 'block';
                    const contentHeight = faqText.scrollHeight; // Get the full height of the content
                    faqText.style.height = `${contentHeight}px`; // Set height for transition
                    faqText.style.marginTop = '20px'; // Add margin top for spacing

                    // Update the main image in risks-img-wrapper
                    const faqImageSrc = faqContentImg.querySelector('img').src;
                    mainImages.forEach(mainImg => {
                        if (mainImg.src === faqImageSrc) {
                            mainImg.classList.add('open');
                        }
                    });
                } else {
                    // If it was already open, and we just closed all, no need to re-open.
                    // Just ensure the display is set to none after transition for closed items.
                    // This is handled by closeAllFaqItems, but we can add a timeout for final hiding.
                    setTimeout(() => {
                        if (!item.classList.contains('open')) {
                            faqText.style.display = 'none';
                        }
                    }, 300); // Match this timeout to your CSS transition duration for height
                }
            });
        }
    });

    // Handle initial state based on the provided HTML
    // Find the initially open item and trigger its click event to set the correct state
    const initiallyOpenItem = document.querySelector('.faq-item.open');
    if (initiallyOpenItem) {
        // Programmatically click the title to ensure proper state initialization
        // This will trigger the closeAllFaqItems and then open the correct one
        initiallyOpenItem.querySelector('.faq-title').click();
    } else {
        // If no item is initially open, ensure the first one is open by default
        // Or handle as per design (e.g., leave all closed, or open a specific one)
        // For this example, let's open the first one if none are marked 'open'
        if (faqItems.length > 0) {
            faqItems[0].querySelector('.faq-title').click();
        }
    }
});
