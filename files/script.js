var $ = jQuery;
jQuery(document).ready(function () {
  // button click event
  jQuery(".cta-try-free").click(function () {
    jQuery("html, body").animate({
        scrollTop: jQuery(".hero-section .form-content").offset().top,
      },
      700
    );
  });
  //form started
  var intervalSet = setInterval(function () {
    if (jQuery(".mktoForm #LblFirstName").length > 0) {
      clearInterval(intervalSet);
      checkInputform();
      jQuery('.mktoFormRow[input-name="parent-Email"]').insertAfter('.mktoFormRow[input-name="parent-LastName"]');
      jQuery('.mktoFormRow[input-name="parent-Comments__c"]').insertAfter('.mktoFormRow[input-name="parent-Email"]');
    }
  }, 500);
  checkFilled();
  jQuery("body").on("focus", '.mktoForm input , .mktoForm select ,.mktoForm textarea', function () {
    jQuery(this).closest('div').addClass('focused');
  }).on("blur", ".mktoForm input , .mktoForm select , .mktoForm textarea", function () {
    jQuery(this).closest('div').removeClass('focused');
    checkFilled();
  });
  jQuery('body').on("change", '.mktoForm select', function (event) {
    checkInputform();
  });

  MktoForms2.whenReady(function (form) {
    // Remove inline style
    function removeInlineStyle(mutationsList) {
      mutationsList.forEach(mutation => {
        if (!!document.querySelector('button[type="submit"]').getAttribute('style')) {
          document.querySelector('button[type="submit"]').removeAttribute("style");
        }
      });
    }

    // Select the CTA button
    const targetNode = document.querySelector("#mktoForm_10155");

    // Configure the MutationObserver
    const ctaObserver = new MutationObserver(removeInlineStyle);

    if (targetNode) {
      ctaObserver.observe(targetNode, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    // Remove inline style end

    var targetNodes = document.querySelectorAll('.mktoFieldWrap');
    var config = {
      attributes: true,
      childList: true,
      subtree: true
    };
    var callback = function (mutationsList, observer) {
      jQuery('.mktoFieldWrap').each(function () {
        if (jQuery(this).find('.mktoError').length > 0 && jQuery(this).find('.mktoError').attr('style').indexOf('none') == -1) {
          jQuery(this).addClass('error');
        } else {
          jQuery(this).removeClass('error');
        }
      });
    };
    var observer = new MutationObserver(callback);
    for (var i = 0; i < targetNodes.length; i++) {
      observer.observe(targetNodes[i], config);
    }

    const emailInput = document.querySelector('input[type="email"].mktoField.mktoEmailField');
    if (emailInput) {
      const observerFieldWrap = new MutationObserver(function (mutationsList) {
        const validMsgEmail = document.getElementById('ValidMsgEmail');
        if (validMsgEmail) {
          const newContent = `<span class="mktoErrorMsg-icon"><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_4778_3822)"> <path d="M8.50049 12C8.9147 12 9.25049 11.6642 9.25049 11.25C9.25049 10.8358 8.9147 10.5 8.50049 10.5C8.08627 10.5 7.75049 10.8358 7.75049 11.25C7.75049 11.6642 8.08627 12 8.50049 12Z" fill="white"/> <path d="M8.50049 9V8.5C9.60486 8.5 10.5005 7.71625 10.5005 6.75C10.5005 5.78375 9.60486 5 8.50049 5C7.39611 5 6.50049 5.78375 6.50049 6.75V7" stroke="white" stroke-linecap="round" stroke-linejoin="round"/> <path d="M8.50049 14C11.8142 14 14.5005 11.3137 14.5005 8C14.5005 4.68629 11.8142 2 8.50049 2C5.18678 2 2.50049 4.68629 2.50049 8C2.50049 11.3137 5.18678 14 8.50049 14Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <clipPath id="clip0_4778_3822"> <rect width="16" height="16" fill="white" transform="translate(0.5)"/> </clipPath> </defs> </svg></span><span class="mktoErrorMsg-msg"> Must be valid email.</br>example @yourdomain.com</span>`;

          if (validMsgEmail.innerHTML !== newContent) {
            validMsgEmail.innerHTML = newContent;
          }
          observerFieldWrap.disconnect();
        }
      });

      const emailInputObserver = new MutationObserver(function () {
        if (emailInput.value === '') {
          observerFieldWrap.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
      });
      emailInputObserver.observe(emailInput, {
        attributes: true,
        childList: false,
        subtree: false
      });

      targetNodes.forEach(function (node) {
        observerFieldWrap.observe(node, {
          childList: true,
          subtree: true
        });
      });
    }
  });

  function checkInputform() {
    jQuery('form.mktoForm .mktoFormRow').each(function () {
      jQuery(this).removeAttr('input-name');
      if (jQuery(this).find('input,select,textarea').length > 0) {
        var currentID = jQuery(this).find('input,select,textarea').attr('name');
        jQuery(this).attr('input-name', 'parent-' + currentID);
      } else {
        jQuery(this).attr('input-name', 'parent-noinput');
      }
    });
  }

  function checkFilled() {
    jQuery("body").find('.mktoForm input ,.mktoForm select , .mktoForm textarea').each(function () {
      if (jQuery(this).val().length > 0) {
        jQuery(this).closest('div').addClass('filled');
      } else {
        jQuery(this).closest('div').removeClass('filled');
      }
    });
  }
  MktoForms2.loadForm("//info.tenable.com", "934-XQB-568", 10155, function (form) {
    form.setValues({
      "LeadSource": "Web Lead",
      "Lead_Source_Detail__c": "Contact Us Form"
    });
    form.onSuccess(function (values, followUpUrl) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || !window.drift) {
        location.href = "https://www.tenable.com/products/tenable-cloud-security/evaluate/thank-you";
      } else {
        drift("collectFormData", values, {
          campaignId: 2825884,
          followupUrl: "https://www.tenable.com/products/tenable-cloud-security/evaluate/thank-you",
          mapFields: true
        });
      }
      return false;
    });
  });
});

// Accordion
const faqItems = document.querySelectorAll('.faq-item');
const faqTitles = document.querySelectorAll('.faq-title');
const faqTexts = document.querySelectorAll('.faq-text');
const faqImgs = document.querySelectorAll('.faq-img');
const faqImgsMbl = document.querySelectorAll('.faq-content-img');

console.log(faqTitles.length, faqTexts.length, faqImgs.length, faqImgsMbl.length, faqItems.length);

let currentIndex = 0;
let autoPlayInterval;

function setHeight(el, height) {
  el.style.height = height;
}

function openAccordion(index) {
  if (faqTitles[index].classList.contains('open')) {
    // Close current item
    faqTitles[index].classList.remove('open');
    const content = faqTexts[index];
    content.classList.remove('open');
    setHeight(content, 0);
  } else {
    faqTitles.forEach((title, i) => {
      const content = faqTexts[i];
      const img = content.querySelector('img');

      if (i === index) {
        title.classList.add('open');
        content.style.display = 'block';
        content.classList.add('open');
        faqItems[i].classList.add('open');
        faqImgs[i].classList.add('open');
        faqImgsMbl[i].classList.add('open');

        // Wait for the image to load before setting height
        if (img && !img.complete) {
          img.onload = () => {
            document.fonts.ready.then(() => {
              requestAnimationFrame(() => {
                const fullHeight = content.scrollHeight + 'px';
                setHeight(content, fullHeight);
              });
            });
          };
        } else {
          document.fonts.ready.then(() => {
            requestAnimationFrame(() => {
              const fullHeight = content.scrollHeight + 'px';
              setHeight(content, fullHeight);
            });
          });
        }
      } else {
        title.classList.remove('open');
        content.classList.remove('open');
        content.style.marginTop = '0';
        setHeight(content, 0);
        faqImgs[i].classList.remove('open');
        faqImgsMbl[i].classList.remove('open');
        faqItems[i].classList.remove('open');
      }
    });
  }
}


function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    openAccordion(currentIndex);
    currentIndex = (currentIndex + 1) % faqTitles.length;
  }, 5000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Open the first accordion item by default
openAccordion(currentIndex);
currentIndex = (currentIndex + 1) % faqTitles.length;


faqTitles.forEach((title, index) => {
  title.addEventListener('click', (e) => {
    if (e.target.closest('.faq-item').classList.contains('open')) {
      return;
    }
    openAccordion(index);
    stopAutoPlay();
  });
});

document.querySelector('.risks-section-wrapper').addEventListener('mouseenter', stopAutoPlay);
document.querySelector('.risks-section-wrapper').addEventListener('mouseleave', startAutoPlay);

startAutoPlay();
