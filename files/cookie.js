// Hack for IE11 not having NodeList.prototype.forEach()
if (!NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

/* eslint-disable */
// https://github.com/js-cookie/js-cookie
;(function(factory){if(typeof define==='function'&&define.amd){define(factory);}else if(typeof exports==='object'){module.exports=factory();}else{var OldCookies=window.Cookies;var api=window.Cookies=factory();api.noConflict=function(){window.Cookies=OldCookies;return api;};}}(function(){function extend(){var i=0;var result={};for(;i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes){result[key]=attributes[key];}}
return result;}
function init(converter){function api(key,value,attributes){var result;if(typeof document==='undefined'){return;}
if(arguments.length>1){attributes=extend({path:'/'},api.defaults,attributes);if(typeof attributes.expires==='number'){var expires=new Date();expires.setMilliseconds(expires.getMilliseconds()+attributes.expires*864e+5);attributes.expires=expires;}
try{result=JSON.stringify(value);if(/^[\{\[]/.test(result)){value=result;}}catch(e){}
if(!converter.write){value=encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent);}else{value=converter.write(value,key);}
key=encodeURIComponent(String(key));key=key.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);key=key.replace(/[\(\)]/g,escape);return(document.cookie=[key,'=',value,attributes.expires&&'; expires='+attributes.expires.toUTCString(),attributes.path&&'; path='+attributes.path,attributes.domain&&'; domain='+attributes.domain,attributes.secure?'; secure':''].join(''));}
if(!key){result={};}
var cookies=document.cookie?document.cookie.split('; '):[];var rdecode=/(%[0-9A-Z]{2})+/g;var i=0;for(;i<cookies.length;i++){var parts=cookies[i].split('=');var cookie=parts.slice(1).join('=');if(cookie.charAt(0)==='"'){cookie=cookie.slice(1,-1);}
try{var name=parts[0].replace(rdecode,decodeURIComponent);cookie=converter.read?converter.read(cookie,name):converter(cookie,name)||cookie.replace(rdecode,decodeURIComponent);if(this.json){try{cookie=JSON.parse(cookie);}catch(e){}}
if(key===name){result=cookie;break;}
if(!key){result[name]=cookie;}}catch(e){}}
return result;}
api.set=api;api.get=function(key){return api(key);};api.getJSON=function(){return api.apply({json:true},[].slice.call(arguments));};api.defaults={};api.remove=function(key,attributes){api(key,'',extend(attributes,{expires:-1}));};api.withConverter=init;return api;}
return init(function(){});}));
/* eslint-enable */

const tnsTools = {
  cookie: window.Cookies.noConflict(),
  regions: {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    DC: 'District of Columbia',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
    AB: 'Alberta',
    BC: 'British Columbia',
    MB: 'Manitoba',
    NB: 'New Brunswick',
    NL: 'Newfoundland and Labrador',
    NT: 'Northwest Territories',
    NS: 'Nova Scotia',
    NU: 'Nunavut',
    ON: 'Ontario',
    PE: 'Prince Edward Island',
    QC: 'Quebec',
    SK: 'Saskatchewan',
    YT: 'Yukon',
    BW: 'Baden-Wurttemberg',
    BY: 'Bayern',
    BE: 'Berlin',
    BB: 'Brandenburg',
    HB: 'Bremen',
    HH: 'Hamburg',
    HE: 'Hessen',
    NI: 'Niedersachsen',
    MV: 'Mecklenburg-Vorpommern',
    NW: 'Nordrhein-Westfalen',
    RP: 'Rheinland-Pfalz',
    SL: 'Saarland',
    SN: 'Sachsen',
    ST: 'Sachsen-Anhalt',
    SH: 'Schleswig-Holstein',
    TH: 'Thuringen',
  },

  escapeHTML: function (html) {
    const escape = document.createElement('textarea');
    escape.textContent = html;
    return escape.innerHTML;
  },

  getParameterByName: function (name) {
    const safeName = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + safeName + '=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? '' : this.escapeHTML(decodeURIComponent(results[1]));
  },

  getParameter: function (name) {
    return this.getParameterByName(name) || '-';
  },

  getCookie: function (name) {
    return this.cookie.get(name);
  },

  setCookie: function (name, value, expiration) {
    let domain = '.tenable.com';
    const hostname = window.location.hostname;

    if (hostname === 'www.tenablecloud.cn') {
      domain = hostname;
    }

    this.cookie.set(name, value, { domain, expires: expiration || null });
  },

  removeCookie: function (name) {
    let domain = '.tenable.com';
    const hostname = window.location.hostname;

    if (hostname === 'www.tenablecloud.cn') {
      domain = hostname;
    }

    this.cookie.remove(name, { domain });
  },

  xhr: function (method, url, callback) {
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4) {
        callback(ajax.responseText);
      }
    };
    ajax.open(method, url);
    ajax.send();
  },

  jsonp: function (url, callback) {
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    const script = document.createElement('script');

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);

    window[callbackName] = function (data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };
  },

  getLocation: function (cb) {
    this.jsonp('https://api.tenable.com/v1/location', function (data) {
      cb(data);
    });
  },

  getRegionCode: function (region) {
    return Object.keys(this.regions).filter((function (key) {
      return this.regions[key] === region;
    }).bind(this))[0];
  },
};

const tns = {
  domains: [
    { lang: 'de', host: 'de.tenable.com' },
    { lang: 'de', host: 'de-de-wr4e7rhe-p.sitesync.acolad.com' },
    { lang: 'de', host: 'de-de-wr4e7rhe-c.sitesync.acolad.com' },
    { lang: 'de', host: 'de-de-wr4e7rhe.sitesync.acolad.com' },
    { lang: 'de', host: 'de-de-wr4e7rhe.us.armor.domainverify.net' },
    { lang: 'fr', host: 'fr.tenable.com' },
    { lang: 'fr', host: 'fr-fr-wr4e7rhe-p.sitesync.acolad.com' },
    { lang: 'fr', host: 'fr-fr-wr4e7rhe-c.sitesync.acolad.com' },
    { lang: 'fr', host: 'fr-fr-wr4e7rhe.sitesync.acolad.com' },
    { lang: 'fr', host: 'fr-fr-wr4e7rhe.us.armor.domainverify.net' },
    { lang: 'es-la', host: 'es-la.tenable.com' },
    { lang: 'es-la', host: 'es-mx-wr4e7rhe-p.sitesync.acolad.com' },
    { lang: 'es-la', host: 'es-mx-wr4e7rhe-c.sitesync.acolad.com' },
    { lang: 'es-la', host: 'es-mx-wr4e7rhe.sitesync.acolad.com' },
    { lang: 'es-la', host: 'es-mx-wr4e7rhe.us.armor.domainverify.net' },
    { lang: 'zh-cn', host: 'zh-cn.tenable.com' },
    { lang: 'zh-cn', host: 'www.tenablecloud.cn' },
    { lang: 'zh-cn', host: 'zh-cn-wr4e7rhe-p.sitesync.acolad.com' },
    { lang: 'zh-cn', host: 'zh-cn-wr4e7rhe-c.sitesync.acolad.com' },
    { lang: 'zh-cn', host: 'zh-cn-wr4e7rhe.sitesync.acolad.com' },
    { lang: 'zh-cn', host: 'zh-cn-wr4e7rhe.us.armor.domainverify.net' },
    { lang: 'zh-tw', host: 'zh-tw.tenable.com' },
    { lang: 'zh-tw', host: 'zh-tw-wr4e7rhe-p.sitesync.acolad.com' },
    { lang: 'zh-tw', host: 'zh-tw-wr4e7rhe-c.sitesync.acolad.com' },
    { lang: 'zh-tw', host: 'zh-tw-wr4e7rhe.sitesync.acolad.com' },
    { lang: 'zh-tw', host: 'zh-tw-wr4e7rhe.us.armor.domainverify.net' },
    { lang: 'jp', host: 'jp.tenable.com' },
    { lang: 'jp', host: 'ja-jp-wr4e7rhe-p.sitesync.acolad.com' },
    { lang: 'jp', host: 'ja-jp-wr4e7rhe-c.sitesync.acolad.com' },
    { lang: 'jp', host: 'ja-jp-wr4e7rhe.sitesync.acolad.com' },
    { lang: 'jp', host: 'ja-jp-wr4e7rhe.us.armor.domainverify.net' },
    { lang: 'pt-br', host: 'pt-br.tenable.com' },
    { lang: 'pt-br', host: 'pt-br-wr4e7rhe-p.sitesync.acolad.com' },
    { lang: 'pt-br', host: 'pt-br-wr4e7rhe-c.sitesync.acolad.com' },
    { lang: 'pt-br', host: 'pt-br-wr4e7rhe.sitesync.acolad.com' },
    { lang: 'pt-br', host: 'pt-br-wr4e7rhe.us.armor.domainverify.net' },
    { lang: 'it', host: 'it.tenable.com' },
    { lang: 'it', host: 'it-it-wr4e7rhe-p.sitesync.acolad.com' },
    { lang: 'it', host: 'it-it-wr4e7rhe-c.sitesync.acolad.com' },
    { lang: 'it', host: 'it-it-wr4e7rhe.sitesync.acolad.com' },
    { lang: 'it', host: 'it-it-wr4e7rhe.us.armor.domainverify.net' },
    { lang: 'kr', host: 'kr.tenable.com' },
    { lang: 'kr', host: 'ko-kr-wr4e7rhe-p.sitesync.acolad.com' },
    { lang: 'kr', host: 'ko-kr-wr4e7rhe-c.sitesync.acolad.com' },
    { lang: 'kr', host: 'ko-kr-wr4e7rhe.sitesync.acolad.com' },
    { lang: 'kr', host: 'ko-kr-wr4e7rhe.us.armor.domainverify.net' },
    { lang: 'ar', host: 'ar.tenable.com' },
    { lang: 'ar', host: 'ar-sa-wr4e7rhe-p.sitesync.acolad.com' },
    { lang: 'ar', host: 'ar-sa-wr4e7rhe-c.sitesync.acolad.com' },
    { lang: 'ar', host: 'ar-sa-wr4e7rhe.sitesync.acolad.com' },
    { lang: 'ar', host: 'ar-sa-wr4e7rhe.us.armor.domainverify.net' },
  ],
  formStrings: {
    en: {
      FirstName: 'First Name',
      LastName: 'Last Name',
      Company: 'Company',
      Email: 'Email Address',
      Phone: 'Phone',
      submit: 'Submit',
      knownVisitorWelcome: 'Welcome back,',
      knownVisitorNotYou: 'Not you?',
      knownVisitorBtn: 'Continue',
      FirstNameValidation: 'This field is required.',
      LastNameValidation: 'This field is required.',
      CompanyValidation: 'This field is required.',
      EmailValidation: 'Must be valid email.',
      PhoneValidation: 'Must be a phone number.',
      Title: 'Title',
      TitleValidation: 'This field is required.',
      EmailDomainValidation: 'Please use a Business email.',
      Employee_Range__c: 'Company Size',
      Employee_Range__cValidation: 'This field is required.',
      Employee_Range_Sizes: {
        option1: '1-9',
        option2: '10-49',
        option3: '50-99',
        option4: '100-249',
        option5: '250-499',
        option6: '500-999',
        option7: '1,000-2,499',
        option8: '2,500-4,999',
        option9: '5,000-10,000',
        option10: '10,000+',
      },
      Comments: 'Comments (Limited to 255 characters)',
      Interest: 'I am interested in:',
      Product_Interest__cValidation: 'This field is required.',
      SelectCompanySize: 'Select...',
      SelectInterest: 'Select Interest...',
      Training: 'Training',
      TenableOne: 'Tenable One Exposure Management Platform',
      TenableIO: 'Tenable Vulnerability Management (formerly Tenable.io)',
      TenableAD: 'Tenable Identity Exposure (formerly Tenable.ad)',
      TenableASM: 'Tenable Attack Surface Management (formerly Tenable.asm)',
      TenableCS: 'Tenable Cloud Security (formerly Tenable.cs)',
      TenableWAS: 'Tenable Web App Scanning (formerly Tenable.io WAS)',
      TenableOT: 'Tenable OT Security (formerly Tenable.ot)',
      TenableSC: 'Tenable Security Center (formerly Tenable.sc)',
      LuminScLegal: '<small>Attention: If you are a Tenable.sc customer and wish to access the Lumin Connector, you must agree to the following: <br><br>(1) In order to access the Lumin Connector functionality, you agree to provide certain necessary scan information, which may include the number of scan targets managed with the product for billing purposes, behavioral attributes such as whether or not certain features in the product are utilized, or other relevant information (“Technical Data”). Technical Data cannot be attributed to an individual user/administrator of the product. Tenable may use Technical Data for reasonable business purposes, including product support, license validation and research and development. Tenable agrees to only disclose Technical Data which has been properly anonymized and cannot be attributed to Customer. If you do not agree to share Technical Data with Tenable, you may not access the Lumin functionality. <br>(2) Any usage of Tenable.io separate from Tenable.sc will be subject to the Tenable Master Agreement (available here: <a href="https://static.tenable.com/prod_docs/tenable_slas.html" target="_blank" id="">https://static.tenable.com/prod_docs/tenable_slas.html</a>). If you are an existing Tenable.io customer, such access shall be governed by any previously, mutually agreed terms and conditions governing your usage of Tenable.io that supersede the Tenable Master Agreement. <br>(3) By submitting this form, you agree to the above legal terms and conditions governing your Lumin Connector evaluation.</small>',
      cloudEnvironmentsToSecure: 'Cloud environments to secure',
      cloudEnvironmentsOptions: {
        'AWS': 'AWS',
        'Azure': 'Azure',
        'Google Cloud': 'Google Cloud',
        'Oracle Cloud Infrastructure': 'Oracle Cloud Infrastructure',
        'Other': 'Other',
      },
      whatLicenseInterestYou: 'Which license interests you?',
      licenseSelect: 'Select...',
      licenseOptions: {
        cloudOnly: 'Tenable Cloud Security (stand-alone product)',
        t1andCloud: 'Tenable One with Tenable Cloud Security',
        notSure: 'Not sure',
      },
    },
    de: {
      FirstName: 'Vorname',
      LastName: 'Nachname',
      Company: 'Firma',
      Email: 'Email',
      Phone: 'Telefon',
      submit: 'Senden',
      knownVisitorWelcome: 'Willkommen,',
      knownVisitorNotYou: 'Nicht du?',
      knownVisitorBtn: 'Fortfahren',
      FirstNameValidation: 'Dieses Feld ist erforderlich',
      LastNameValidation: 'Dieses Feld ist erforderlich',
      CompanyValidation: 'Dieses Feld ist erforderlich',
      EmailValidation: 'Geben Sie eine gültige E-Mail-Adresse ein',
      PhoneValidation: 'Geben Sie eine gültige Telefonnummer ein',
      Title: 'Position',
      TitleValidation: 'Dieses Feld ist erforderlich',
      OptIn: 'Ich möchte Marketingmitteilungen von Tenable über Produkte und Services erhalten.',
      OptInFinePrint: '<small>Sie können unsere E-Mails jederzeit abbestellen. Befolgen Sie dazu die Anweisungen in der Fußzeile der E-Mails, die Sie erhalten haben, oder besuchen Sie das <a href="https://info.tenable.com/SubscriptionManagement.html">Abonnementcenter von Tenable</a>. Hiermit bestätigen Sie, dass Tenable, seine verbundenen Unternehmen und ggf. Dritte, die in unserer Datenschutzrichtlinie genannt werden, berechtigt sind, Ihre personenbezogenen Daten außerhalb des Europäischen Wirtschaftsraums (EWR) zu übertragen, um Ihnen Marketingmitteilungen zuzustellen, und dass in Ländern, die nicht dem EWR angehören, möglicherweise nicht das gleiche Schutzniveau für Ihre personenbezogenen Daten vorgeschrieben ist. Ihre personenbezogenen Daten werden von Tenable ausschließlich gemäß unserer <a href="https://de.tenable.com/eu-privacy-policy">Datenschutzrichtlinie</a> verarbeitet.</small>',
      EmailDomainValidation: 'Bitte verwenden Sie Ihre Firmen-Email.',
      Employee_Range__c: 'Firmengröße',
      Employee_Range__cValidation: 'Dieses Feld ist erforderlich',
      Employee_Range_Sizes: {
        option1: '1-9',
        option2: '10-49',
        option3: '50-99',
        option4: '100-249',
        option5: '250-499',
        option6: '500-999',
        option7: '1.000-2.499',
        option8: '2.500-4.999',
        option9: '5.000-10.000',
        option10: '10.000+',
      },
      Comments: 'Anmerkungen (max. 255 Zeichen):',
      Interest: 'Ich interessiere mich für:',
      Product_Interest__cValidation: 'Dieses Feld ist erforderlich',
      SelectCompanySize: 'Bitte auswählen...',
      SelectInterest: 'Bitte auswählen...',
      Training: 'Training',
      TenableOne: 'Tenable One Exposure Management-Plattform',
      TenableIO: 'Tenable Vulnerability Management',
      TenableAD: 'Tenable Identity Exposure',
      TenableASM: 'Tenable Attack Surface Management',
      TenableCS: 'Tenable Cloud Security',
      TenableWAS: 'Tenable Web App Scanning',
      TenableOT: 'Tenable OT Security',
      TenableSC: 'Tenable Security Center',
      LuminScLegal: '<small>Achtung: Wenn Sie ein Tenable.sc-Kunde sind und Zugriff auf den Lumin Connector wünschen, müssen Sie sich mit Folgendem einverstanden erklären: <br><br>(1) Um auf die Lumin Connector-Funktionalität zugreifen zu können, erklären Sie sich damit einverstanden, bestimmte erforderliche Scaninformationen bereitzustellen, die unter anderem Folgendes umfassen können: die Anzahl der mit dem Produkt verwalteten Scanziele für Abrechnungszwecke, Verhaltensmerkmale wie beispielsweise, ob bestimmte Funktionen des Produkts genutzt werden oder nicht, sowie andere relevante Informationen („technische Daten“). Technische Daten können keinem individuellen Benutzer/Administrator des Produkts zugeschrieben werden. Tenable darf technische Daten für angemessene Geschäftszwecke verwenden, einschließlich Produktsupport, Lizenzüberprüfung sowie Forschung und Entwicklung. Tenable erklärt sich damit einverstanden, nur solche technischen Daten offenzulegen, die ordnungsgemäß anonymisiert wurden und die dem Kunden nicht zugeschrieben werden können. Falls Sie sich nicht mit der Bereitstellung von technischen Daten an Tenable einverstanden erklären, dürfen Sie die Lumin-Funktionalität nicht nutzen. <br>(2) Jegliche Nutzung von Tenable.io, die separat von Tenable.sc erfolgt, unterliegt dem Tenable Master Agreement (hier verfügbar: <a href="https://static.tenable.com/prod_docs/tenable_slas.html" target="_blank" id="">https://static.tenable.com/prod_docs/tenable_slas.html</a>). Wenn Sie bereits ein Kunde von Tenable.io sind, unterliegt ein solcher Zugriff vorherigen, gegenseitig vereinbarten Geschäftsbedingungen, die Ihre Nutzung von Tenable.io regeln und die das Tenable Master Agreement ersetzen. <br>(3) Durch Einsenden dieses Formulars erklären Sie sich mit den obigen Geschäftsbedingungen einverstanden, die Ihre Nutzung von Lumin Connector zu Evaluierungszwecken regeln.</small>',
      cloudEnvironmentsToSecure: 'Abzusichernde Cloud-Umgebungen:',
      cloudEnvironmentsOptions: {
        'AWS': 'AWS',
        'Azure': 'Azure',
        'Google Cloud': 'Google Cloud',
        'Oracle Cloud Infrastructure': 'Oracle Cloud Infrastructure',
        'Other': 'Andere',
      },
      whatLicenseInterestYou: 'An welcher Lizenz sind Sie interessiert?',
      licenseSelect: 'Auswählen…',
      licenseOptions: {
        cloudOnly: 'Tenable Cloud Security (Standalone-Produkt)',
        t1andCloud: 'Tenable One mit Tenable Cloud Security',
        notSure: 'Nicht sicher',
      },
    },
    fr: {
      FirstName: 'Prénom',
      LastName: 'Nom',
      Company: 'Société',
      Email: 'E-mail',
      Phone: 'Tél',
      submit: 'Envoyer',
      knownVisitorWelcome: 'Bienvenue,',
      knownVisitorNotYou: 'Pas vous?',
      knownVisitorBtn: 'Continuer',
      FirstNameValidation: 'Ce champ est requis',
      LastNameValidation: 'Ce champ est requis',
      CompanyValidation: 'Ce champ est requis',
      EmailValidation: 'Entrer une adresse e-mail valide',
      PhoneValidation: 'Entrer un numéro de téléphone valide',
      Title: 'Fonction',
      TitleValidation: 'Ce champ est requis',
      OptIn: 'J\'aimerais recevoir des communications de Tenable concernant ses produits et services.',
      OptInFinePrint: '<small>Vous pouvez refuser de recevoir nos courriels à tout moment en suivant les instructions de désinscription incluses dans le pied de page de nos e-mails ou directement sur <a href="https://info.tenable.com/SubscriptionManagement.html">la page d\'abonnement de Tenable</a>. Vous reconnaissez que Tenable, nos affiliés et les tiers (selon le cas) énumérés dans notre Politique de confidentialité peuvent transférer vos données personnelles en dehors de l\'Espace économique européen (EEE) afin de vous fournir des communications, et que la réglementation des pays hors de l\'EEE peut ne pas exiger le même niveau de protection de vos données personnelles. Tenable traitera vos données personnelles uniquement comme décrit dans notre <a href="https://fr.tenable.com/eu-privacy-policy">Politique de confidentialité.</a></small>',
      EmailDomainValidation: 'Adresse e-mail professionnelle.',
      Employee_Range__c: 'Taille d\'entreprise',
      Employee_Range__cValidation: 'Ce champ est requis',
      Employee_Range_Sizes: {
        option1: '1-9',
        option2: '10-49',
        option3: '50-99',
        option4: '100-249',
        option5: '250-499',
        option6: '500-999',
        option7: '1 000-2 499',
        option8: '2 500-4 999',
        option9: '5 000-10 000',
        option10: '+ de 10 000',
      },
      Comments: 'Commentaires (255 caractères maximum) :',
      Interest: 'Je m\'intéresse aux sujets suivants :',
      Product_Interest__cValidation: 'Ce champ est requis',
      SelectCompanySize: 'Sélectionnez...',
      SelectInterest: 'Sélectionnez...',
      Training: 'Formation',
      TenableOne: 'Tenable One Plateforme de gestion de l\'exposition',
      TenableIO: 'Tenable Vulnerability Management (anciennement Tenable.io)',
      TenableAD: 'Tenable Identity Exposure (anciennement Tenable.ad)',
      TenableASM: 'Tenable Attack Surface Management (anciennement Tenable.asm)',
      TenableCS: 'Tenable Cloud Security (anciennement Tenable.cs)',
      TenableWAS: 'Tenable Web App Scanning (anciennement Tenable.io WAS)',
      TenableOT: 'Tenable OT Security (anciennement Tenable.ot)',
      TenableSC: 'Tenable Security Center (anciennement Tenable.sc)',
      LuminScLegal: '<small>Attention : si vous êtes client et utilisez Tenable.sc, pour accéder au connecteur Lumin vous devez accepter ce qui suit : <br><br>(1) Pour accéder au connecteur Lumin, vous acceptez de fournir certaines informations de scan nécessaires, ce qui peut inclure le nombre de cibles de scan gérées avec le produit à des fins de facturation, des caractéristiques comportementales telles que le fait que certaines fonctionnalités du produit soient utilisées ou non, ou toute autre information pertinente (« Données techniques »). Les Données techniques ne peuvent pas être attribuées à un utilisateur/administrateur individuel du produit. La société Tenable peut être amenée à utiliser les Données techniques pour des motifs professionnels raisonnables, dont l\'assistance produit, la validation des licences ou encore la recherche et le développement. Tenable s\'engage à ne divulguer que des Données techniques convenablement anonymisées et qui ne peuvent pas être attribuées au Client. Si vous ne consentez pas au partage des Données techniques avec Tenable, vous risquez de ne pas avoir accès aux fonctions de Lumin. <br>(2) Toute utilisation de Tenable.io en dehors de Tenable.sc sera soumise à l\'Accord principal de Tenable (disponible ici : <a href="https://static.tenable.com/prod_docs/tenable_slas.html" target="_blank" id="">https://static.tenable.com/prod_docs/tenable_slas.html</a>). Si vous êtes client et utilisez Tenable.io, un tel accès doit être régi par les conditions générales précédemment acceptées par les deux parties pour votre utilisation de Tenable.io, lesquelles conditions l\'emportent sur l\'Accord principal de Tenable. <br>(3) En envoyant ce formulaire, vous acceptez les conditions légales ci-dessus régissant votre essai de Lumin.</small>',
      cloudEnvironmentsToSecure: 'Environnements cloud à sécuriser :',
      cloudEnvironmentsOptions: {
        'AWS': 'AWS',
        'Azure': 'Azure',
        'Google Cloud': 'Google Cloud',
        'Oracle Cloud Infrastructure': 'Oracle Cloud Infrastructure',
        'Other': 'Autre',
      },
      whatLicenseInterestYou: 'Quelle licence vous intéresse ?',
      licenseSelect: 'Sélectionner…',
      licenseOptions: {
        cloudOnly: 'Tenable Cloud Security (produit autonome)',
        t1andCloud: 'Tenable One avec Tenable Cloud Security',
        notSure: 'Ne sais pas',
      },
    },
    'es-la': {
      FirstName: 'Nombre',
      LastName: 'Apellido',
      Company: 'Empresa',
      Email: 'Correo electrónico',
      Phone: 'Teléfono',
      submit: 'Enviar',
      knownVisitorWelcome: 'Bienvenido,',
      knownVisitorNotYou: '¿No es usted?',
      knownVisitorBtn: 'Continuar',
      FirstNameValidation: 'Este campo es obligatorio',
      LastNameValidation: 'Este campo es obligatorio',
      CompanyValidation: 'Este campo es obligatorio',
      EmailValidation: 'Ingresar una dirección de correo electrónico válida',
      PhoneValidation: 'Ingresar un número de teléfono válido',
      Title: 'Título',
      TitleValidation: 'Este campo es obligatorio',
      OptIn: 'Me gustaría recibir comunicaciones de marketing de Tenable sobre sus productos y servicios.',
      OptInFinePrint: '<small>Puede darse de baja voluntariamente para dejar de recibir nuestros correos electrónicos en cualquier momento siguiendo las instrucciones incluidas en la parte inferior de los correos electrónicos que recibió o visitando <a href="https://info.tenable.com/SubscriptionManagement.html">el Centro de Suscripciones de Tenable</a>. Reconoce que Tenable, nuestras filiales y terceros (según corresponda) que aparecen mencionados en nuestra Política de Privacidad pueden transferir sus datos personales fuera del Área Económica Europea ("AEE") para la entrega de comunicaciones de marketing a usted, y que es posible que esos países fuera del AEE no exijan el nivel de protección equivalente de esos datos. Tenable procesará sus datos personales únicamente conforme a las disposiciones estipuladas en nuestra <a href="https://es-la.tenable.com/eu-privacy-policy">Política de Privacidad.</a></small>',
      EmailDomainValidation: 'Favor usar su e-mail corporativo.',
      Employee_Range__c: 'Número de empleados',
      Employee_Range__cValidation: 'Este campo es obligatorio',
      Employee_Range_Sizes: {
        option1: '1-9',
        option2: '10-49',
        option3: '50-99',
        option4: '100-249',
        option5: '250-499',
        option6: '500-999',
        option7: '1000-2499',
        option8: '2500-4999',
        option9: '5000-10 000',
        option10: 'Más de 10 000',
      },
      Comments: 'Comentarios (limitado a 255 caracteres):',
      Interest: 'Estoy interesado en lo siguiente:',
      Product_Interest__cValidation: 'Este campo es obligatorio',
      SelectCompanySize: 'Seleccione...',
      SelectInterest: 'Seleccione...',
      Training: 'Formación',
      TenableOne: 'Tenable One Plataforma de gestión de exposición',
      TenableIO: 'Tenable Vulnerability Management (anteriormente Tenable.io)',
      TenableAD: 'Tenable Identity Exposure (anteriormente Tenable.ad)',
      TenableASM: 'Tenable Attack Surface Management (anteriormente Tenable.asm)',
      TenableCS: 'Tenable Cloud Security (anteriormente Tenable.cs)',
      TenableWAS: 'Tenable Web App Scanning (anteriormente Tenable.io WAS)',
      TenableOT: 'Tenable OT Security (anteriormente Tenable.ot)',
      TenableSC: 'Tenable Security Center (anteriormente Tenable.sc)',
      LuminScLegal: '<small>Atención: Si usted es un cliente de Tenable.sc y desea acceder a Lumin Connector, debe estar de acuerdo con lo siguiente: <br><br>(1) Para poder acceder a la funcionalidad de Lumin Connector, usted está de acuerdo en proporcionar determinada información de escaneo, que puede incluir el número de objetivos de escaneo gestionados con el producto para propósitos de facturación, atributos de comportamiento como si se utilizan o no determinadas funciones del producto u otra información pertinente (“Datos técnicos”). Los Datos técnicos no pueden ser atribuidos a un usuario/administrador individual del producto. Tenable podrá usar los Datos técnicos para propósitos de negocios razonables, incluyendo soporte de producto, validación de licencias e investigación y desarrollo. Tenable está de acuerdo en revelar exclusivamente los Datos técnicos que hayan sido anonimizados adecuadamente y que no puedan ser atribuidos al Cliente. Si usted no está de acuerdo en compartir Datos técnicos con Tenable, no podrá acceder a la funcionalidad Lumin. <br>(2) Cualquier uso de Tenable.io por separado de Tenable.sc, estará sujeto al Acuerdo maestro de Tenable (disponible aquí: <a href="https://static.tenable.com/prod_docs/tenable_slas.html" target="_blank" id="">https://static.tenable.com/prod_docs/tenable_slas.html</a>). Si usted es un cliente existente de Tenable.io, dicho acceso será gobernado por cualesquiera términos y condiciones previos que hayan sido acordados mutuamente y que gobiernen su uso de Tenable.io que sustituyan el Acuerdo maestro de Tenable. <br>(3) Al enviar este formulario, usted está de acuerdo en los términos y condiciones legales anteriores que gobiernan su evaluación de Lumin Connector.</small>',
      cloudEnvironmentsToSecure: 'Entornos en la nube a proteger:',
      cloudEnvironmentsOptions: {
        'AWS': 'AWS',
        'Azure': 'Azure',
        'Google Cloud': 'Google Cloud',
        'Oracle Cloud Infrastructure': 'Oracle Cloud Infrastructure',
        'Other': 'Otro',
      },
      whatLicenseInterestYou: '¿Qué licencia le interesa?',
      licenseSelect: 'Seleccionar…',
      licenseOptions: {
        cloudOnly: 'Tenable Cloud Security (producto independiente)',
        t1andCloud: 'Tenable One con Tenable Cloud Security',
        notSure: 'No estoy seguro',
      },
    },
    jp: {
      FirstName: '名',
      LastName: '姓',
      Company: '会社名',
      Email: 'Eメール',
      Phone: '電話',
      submit: '送信',
      knownVisitorWelcome: 'ようこそ,',
      knownVisitorNotYou: 'ログイン名が違う場合は、ここをクリックして情報を入力してください。',
      knownVisitorBtn: '続ける',
      FirstNameValidation: 'このフィールドは必須です',
      LastNameValidation: 'このフィールドは必須です',
      CompanyValidation: 'このフィールドは必須です',
      EmailValidation: '有効なメール アドレスを入力してください',
      PhoneValidation: '有効な電話番号を入力してください',
      Title: '役職名',
      TitleValidation: 'このフィールドは必須です',
      OptIn: 'Tenable の製品やサービスに関する情報をメールで受け取ることを希望します。',
      OptInFinePrint: '<small>配信停止を希望される場合、このメールのフッターに記載のあるオプトアウトの方法に従うか、<a href="https://info.tenable.com/SubscriptionManagement.html">Tenable のサブスクリプション・センター</a>にアクセスして、いつでも配信を停止できます。 お客様は、Tenable、当社の関連会社、および当社の個人情報保護方針に記載されている第三者（該当する場合）が製品やサービスなどの情報を提供するために、お客様の個人情報を欧州経済圏 (「EEA」) の外に転送できることに同意します。 また EEA 外の国では、個人情報に対し当社と同等レベルの保護を必要としない場合があります。 Tenable は、<a href="https://jp.tenable.com/eu-privacy-policy">個人情報保護方針</a>に記載されている通りにのみ、お客様の個人情報を処理します。</small>',
      EmailDomainValidation: '会社ドメインのEメールをご入力ください',
      Employee_Range__c: '企業規模',
      Employee_Range__cValidation: 'このフィールドは必須です',
      Employee_Range_Sizes: {
        option1: '1-9',
        option2: '10-49',
        option3: '50-99',
        option4: '100-249',
        option5: '250-499',
        option6: '500-999',
        option7: '1,000-2,499',
        option8: '2,500-4,999',
        option9: '5,000-10,000',
        option10: '10,000 以上',
      },
      Comments: 'コメント (255 文字以内)：',
      Interest: '関心のある内容',
      Product_Interest__cValidation: 'このフィールドは必須です',
      SelectCompanySize: '選択してください',
      SelectInterest: '選択してください',
      Training: 'トレーニング',
      TenableOne: 'Tenable One  サイバーエクスポージャー管理プラットフォーム',
      TenableIO: 'Tenable Vulnerability Management (旧 Tenable.io)',
      TenableAD: 'Tenable Identity Exposure (旧 Tenable.ad)',
      TenableASM: 'Tenable Attack Surface Management (旧 Tenable.asm)',
      TenableCS: 'Tenable Cloud Security (旧 Tenable.cs)',
      TenableWAS: 'Tenable Web App Scanning (旧 Tenable.io WAS)',
      TenableOT: 'Tenable OT Security (旧 Tenable.ot)',
      TenableSC: 'Tenable Security Center (旧 Tenable.sc)',
      LuminScLegal: '<small>注意: お客様が Tenable.sc のユーザーで Lumin コネクタをご利用になる場合は、以下に同意していただく必要があります。<br><br>(1) Lumin コネクタの機能を利用するために、請求目的で本製品が管理するスキャン対象の数、本製品の特定の機能が利用されているかどうかなどの行動学的属性、およびその他の関連情報 (以下「技術データ」) を含む、スキャンに関する特定の情報を提供することに同意するものとします。技術データにより、製品の個々のユーザーおよび管理者を特定することはできません。Tenable は、製品サポート、ライセンスの検証、研究開発など、合理的なビジネス上の目的で技術データを使用できるものとします。Tenable は、適切に匿名化された、お客様を特定できない技術データのみを開示することに同意します。Tenable への技術データの共有に合意いただけない場合は、Lumin の機能を利用しないでください。<br>(2) Tenable.sc から独立した Tenable.io の利用はすべて、Tenable の基本契約書に従うものとします (こちらから入手可能です: <a href="https://static.tenable.com/prod_docs/tenable_slas.html" target="_blank" id="">https://static.tenable.com/prod_docs/tenable_slas.html</a>)。お客様が既存の Tenable.io のユーザーである場合、係る利用は、Tenable の基本契約書に代わり、双方が事前に同意した Tenable.io の利用について定める契約条件により規定されるものとします。<br>(3) このフォームを提出することで、お客様は上記の Lumin コネクタの評価について規定する法的な契約条件に同意するものとします。</small>',
      cloudEnvironmentsToSecure: '保護するクラウド環境',
      cloudEnvironmentsOptions: {
        'AWS': 'AWS',
        'Azure': 'Azure',
        'Google Cloud': 'Google Cloud',
        'Oracle Cloud Infrastructure': 'Oracle Cloud Infrastructure',
        'Other': 'その他',
      },
      whatLicenseInterestYou: 'ラインセンスモデル',
      licenseSelect: '選択してください…',
      licenseOptions: {
        cloudOnly: 'Tenable Cloud Security (スタンドアローン製品)',
        t1andCloud: 'Tenable Cloud Security 搭載の Tenable One',
        notSure: 'わからない',
      },
    },
    'zh-cn': {
      FirstName: '名字',
      LastName: '姓氏',
      Company: '公司',
      Email: '电子邮件地址',
      Phone: '电话',
      submit: '提交',
      knownVisitorWelcome: '欢迎,',
      knownVisitorNotYou: '不是你？',
      knownVisitorBtn: '继续',
      FirstNameValidation: '该字段为必填项',
      LastNameValidation: '该字段为必填项',
      CompanyValidation: '该字段为必填项',
      EmailValidation: '输入有效的电子邮件地址',
      PhoneValidation: '输入有效的电话号码',
      Title: '职位',
      TitleValidation: '该字段为必填项',
      OptIn: '我希望收到 Tenable<br>关于其产品和服务的营销信息。',
      OptInFinePrint: '<small>通过遵循选择性退出指令（见于 Tenable 发送给您的电子邮件的页脚）或访问 <a href="https://info.tenable.com/SubscriptionManagement.html">Tenable 的订阅中心</a>，您可以随时选择不接收我们的电子邮件。您承认，本《隐私政策》中列出的 Tenable、我们的附属机构，以及第三方（如适用）可以将您的个人信息转移到欧洲经济区（以下称之为“EEA”）以外的地区，以便向您发送营销信息；而 EEA 以外的国家/地区对您的个人信息可能不会采取同等的保护级别。Tenable 仅会按照我们的<a href="https://www.tenablecloud.cn/eu-privacy-policy">《隐私政策》</a>之所述处理您的个人信息。</small>',
      EmailDomainValidation: '请输入企业邮箱地址',
      Employee_Range__c: '企业人数',
      Employee_Range__cValidation: '该字段为必填项',
      Employee_Range_Sizes: {
        option1: '1-9',
        option2: '10-49',
        option3: '50-99',
        option4: '100-249',
        option5: '250-499',
        option6: '500-999',
        option7: '1,000-2,499',
        option8: '2,500-4,999',
        option9: '5,000-10,000',
        option10: '10,000 以上',
      },
      Comments: '备注（不得超过 255 个字符）：',
      Interest: '我对以下内容感兴趣：',
      Product_Interest__cValidation: '该字段为必填项',
      SelectCompanySize: '选择...',
      SelectInterest: '选择...',
      Training: '培训',
      TenableOne: 'Tenable One 风险暴露管理平台',
      TenableIO: 'Tenable Vulnerability Management(原名 Tenable.io)',
      TenableAD: 'Tenable Identity Exposure (原名 Tenable.ad)',
      TenableASM: 'Tenable Attack Surface Management(原名 Tenable.asm)',
      TenableCS: 'Tenable Cloud Security (原名 Tenable.cs)',
      TenableWAS: 'Tenable Web App Scanning (原名 Tenable.io WAS)',
      TenableOT: 'Tenable OT Security (原名 Tenable.ot)',
      TenableSC: 'Tenable Security Center (原名 Tenable.sc)',
      LuminScLegal: '<small>注意: お客様が Tenable.sc のユーザーで Lumin コネクタをご利用になる場合は、以下に同意していただく必要があります。<br><br>(1) Lumin コネクタの機能を利用するために、請求目的で本製品が管理するスキャン対象の数、本製品の特定の機能が利用されているかどうかなどの行動学的属性、およびその他の関連情報 (以下「技術データ」) を含む、スキャンに関する特定の情報を提供することに同意するものとします。技術データにより、製品の個々のユーザーおよび管理者を特定することはできません。Tenable は、製品サポート、ライセンスの検証、研究開発など、合理的なビジネス上の目的で技術データを使用できるものとします。Tenable は、適切に匿名化された、お客様を特定できない技術データのみを開示することに同意します。Tenable への技術データの共有に合意いただけない場合は、Lumin の機能を利用しないでください。<br>(2) Tenable.sc から独立した Tenable.io の利用はすべて、Tenable の基本契約書に従うものとします (こちらから入手可能です: <a href="https://static.tenable.com/prod_docs/tenable_slas.html" target="_blank" id="">https://static.tenable.com/prod_docs/tenable_slas.html</a>)。お客様が既存の Tenable.io のユーザーである場合、係る利用は、Tenable の基本契約書に代わり、双方が事前に同意した Tenable.io の利用について定める契約条件により規定されるものとします。<br>(3) このフォームを提出することで、お客様は上記の Lumin コネクタの評価について規定する法的な契約条件に同意するものとします。</small>',
      cloudEnvironmentsToSecure: '要保护的云环境：',
      cloudEnvironmentsOptions: {
        'AWS': 'AWS',
        'Azure': 'Azure',
        'Google Cloud': 'Google Cloud',
        'Oracle Cloud Infrastructure': 'Oracle Cloud Infrastructure',
        'Other': '其他',
      },
      whatLicenseInterestYou: '您对哪个许可证感兴趣？',
      licenseSelect: '请选择…',
      licenseOptions: {
        cloudOnly: 'Tenable Cloud Security（独立型产品）',
        t1andCloud: '包含 Tenable Cloud Security 的 Tenable One',
        notSure: '不确定',
      },
    },
    'zh-tw': {
      FirstName: '名字',
      LastName: '姓',
      Company: '公司名',
      Email: '電子郵件地址',
      Phone: '電話',
      submit: '提交',
      knownVisitorWelcome: '歡迎,',
      knownVisitorNotYou: '不是你？',
      knownVisitorBtn: '繼續',
      FirstNameValidation: '這是必填欄位',
      LastNameValidation: '這是必填欄位',
      CompanyValidation: '這是必填欄位',
      EmailValidation: '請輸入有效的電子郵件地址',
      PhoneValidation: '請輸入有效的電話號碼',
      Title: '職位',
      TitleValidation: '這是必填欄位',
      OptIn: '我願意收到<br>Tenable 有關其產品和服務的行銷資訊。',
      OptInFinePrint: '<small>您可以依照發送給您的電子郵件頁尾中的退出說明或造訪 <a href="https://info.tenable.com/SubscriptionManagement.html">Tenable 的訂閱中心</a>，隨時選擇停止接收我們的電子郵件。您認可我們隱私政策中列出的 Tenable、我們的關係企業和第三方 (如適用) 可能會將您的個人資料傳送到歐洲經濟區 ("EEA") 以外地區，以便提供您行銷資訊，而 EEA 以外的國家/地區可能不要求對您的個人資料進行同等程度的保護。Tenable 將僅按照我們<a href="https://zh-tw.tenable.com/eu-privacy-policy">隱私政策</a>中的說明來處理您的個人資料。</small>',
      EmailDomainValidation: '請輸入企業郵箱地址',
      Employee_Range__c: '企業人數',
      Employee_Range__cValidation: '這是必填欄位',
      Employee_Range_Sizes: {
        option1: '1-9',
        option2: '10-49',
        option3: '50-99',
        option4: '100-249',
        option5: '250-499',
        option6: '500-999',
        option7: '1,000-2,499',
        option8: '2,500-4,999',
        option9: '5,000-10,000',
        option10: '10,000 以上',
      },
      Comments: '註解 (限 255 字以內)',
      Interest: '我有興趣的產品：',
      Product_Interest__cValidation: '這是必填欄位',
      SelectCompanySize: '請選擇...',
      SelectInterest: '請選擇...',
      Training: '訓練',
      TenableOne: 'Tenable One 曝險管理平台',
      TenableIO: 'Tenable Vulnerability Management (前稱 Tenable.io)',
      TenableAD: 'Tenable Identity Exposure (前稱 Tenable.ad)',
      TenableASM: 'Tenable Attack Surface Management (前稱 Tenable.asm)',
      TenableCS: 'Tenable Cloud Security (前稱 Tenable.cs)',
      TenableWAS: 'Tenable Web App Scanning (前稱 Tenable.io WAS)',
      TenableOT: 'Tenable OT Security (前稱 Tenable.ot)',
      TenableSC: 'Tenable Security Center (前稱 Tenable.sc)',
      LuminScLegal: '<small>注意：如果您是 Tenable.sc 的客戶並且想存取 Lumin 連接器，您必須同意以下條件：<br><br>(1) 為了存取 Lumin 連接器功能，您同意提供某些必要的掃描資訊，其中可能包含產品管理的掃描目標數量 (用於計費)、行為屬性 (例如產品中某些功能是否被使用)、或其他相關資訊 (簡稱「技術資料」)。技術資料無法歸屬於該產品的個別使用者/管理員。Tenable 可將技術資料用於合理的商業目的，包括產品支援、授權驗證以及研發。Tenable 同意只會披露已適當匿名化處理且無法歸屬於客戶的技術資料。如果您不同意將技術資料與 Tenable 共享，您將無法存取 Lumin 的功能。<br>(2) 任何與 Tenable.sc 分開使用 Tenable.io 的情況都必須遵守 Tenable 主合約 (請參考此處：<a href="https://static.tenable.com/prod_docs/tenable_slas.html" target="_blank" id="">https://static.tenable.com/prod_docs/tenable_slas.html</a>)。如果您是 Tenable.io 的既有客戶，該存取應受之前雙方共同協議的條款與條件約束，這些條款與條件約束了您對 Tenable.io 的使用並應取代 Tenable 主合約。<br>(3) 提交此表單即表示您同意上述約束您評估 Lumin 連接器的法律條款與條件。</small>',
      cloudEnvironmentsToSecure: '要保護的雲端環境：',
      cloudEnvironmentsOptions: {
        'AWS': 'AWS',
        'Azure': 'Azure',
        'Google Cloud': 'Google Cloud',
        'Oracle Cloud Infrastructure': 'Oracle Cloud Infrastructure',
        'Other': '其他',
      },
      whatLicenseInterestYou: '您對哪個授權有興趣？',
      licenseSelect: '請選擇…',
      licenseOptions: {
        cloudOnly: 'Tenable Cloud Security (獨立型產品)',
        t1andCloud: '附有 Tenable Cloud Security 的 Tenable One',
        notSure: '不確定',
      },
    },
    'pt-br': {
      FirstName: 'Nome',
      LastName: 'Sobrenome',
      Company: 'Empresa',
      Email: 'E-mail',
      Phone: 'Telefone',
      submit: 'Enviar',
      knownVisitorWelcome: 'Bem vindo de volta,',
      knownVisitorNotYou: 'Não é você?',
      knownVisitorBtn: 'Continue',
      FirstNameValidation: 'Esse campo é obrigatório.',
      LastNameValidation: 'Esse campo é obrigatório.',
      CompanyValidation: 'Esse campo é obrigatório.',
      EmailValidation: 'E-mail inválido',
      PhoneValidation: 'Telefone inválido',
      Title: 'Título',
      TitleValidation: 'Esse campo é obrigatório.',
      OptIn: 'Eu gostaria de receber comunicações de marketing da Tenable, relacionadas aos seus produtos e serviços.',
      OptInFinePrint: '<small>Você pode optar por não receber os nossos e-mails a qualquer momento. Para isso, siga as instruções de cancelamento no rodapé dos e-mails enviados a você ou acesse o <a href="https://info.tenable.com/SubscriptionManagement.html">Centro de Assinaturas da Tenable</a>. Você reconhece que a Tenable, nossas afiliadas e terceiros (conforme aplicável) listados em nossa Política de Privacidade podem transferir os seus dados pessoais para fora do Espaço Econômico Europeu (“EEE”), com o objetivo de enviar comunicações de marketing a você, e que os países fora do EEE podem não requerer um nível equivalente de proteção dos seus dados pessoais. A Tenable processará os seus dados pessoais somente do modo descrito em nossa <a href="https://pt-br.tenable.com/eu-privacy-policy">Política de Privacidade</a>.</small>',
      EmailDomainValidation: 'Por favor utilize o seu e-mail corporativo.',
      Employee_Range__c: 'Número de empregados',
      Employee_Range__cValidation: 'Esse campo é obrigatório.',
      Employee_Range_Sizes: {
        option1: '1-9',
        option2: '10-49',
        option3: '50-99',
        option4: '100-249',
        option5: '250-499',
        option6: '500-999',
        option7: '1.000-2.499',
        option8: '2.500-4.999',
        option9: '5.000-10.000',
        option10: '+ de 10.000',
      },
      Comments: 'Comentários (limite de 255 caracteres):',
      Interest: 'Estou interessado em:',
      Product_Interest__cValidation: 'Esse campo é obrigatório.',
      SelectCompanySize: 'Selecione...',
      SelectInterest: 'Selecione...',
      Training: 'Treinamento',
      TenableOne: 'Tenable One Plataforma de gerenciamento de exposição',
      TenableIO: 'Tenable Vulnerability Management (antigo Tenable.io)',
      TenableAD: 'Tenable Identity Exposure (antigo Tenable.ad)',
      TenableASM: 'Tenable Attack Surface Management (antigo Tenable.asm)',
      TenableCS: 'Tenable Cloud Security (antigo Tenable.cs)',
      TenableWAS: 'Tenable Web App Scanning (antigo Tenable.io WAS)',
      TenableOT: 'Tenable OT Security (antigo Tenable.ot)',
      TenableSC: 'Tenable Security Center (antigo Tenable.sc)',
      LuminScLegal: '<small>Atenção: Se você é consumidor do Tenable.sc e deseja acessar o Lumin Connector, você deve concordar com o seguinte: <br><br>(1) Para acessar o recurso Lumin Connector, você concordar em fornecer determinadas informações de verificação necessárias, que podem incluir o número de alvos de verificação gerenciadas com o produto para fins de cobrança, atributos comportamentais (como se tem ou não recursos específicos no produto) que são usados, ou outras informações relevantes (“Dados Técnicos”). Os Dados Técnicos não podem ser atribuídos a um usuário/administrador individual do produto. A Tenable pode usar os Dados Técnicos para fins comerciais razoáveis, incluindo suporte ao produto, validação de licença e pesquisa e desenvolvimento. A Tenable concorda em divulgar somente Dados Técnicos que tenham sido anonimizados adequadamente e que não possam ser atribuídos ao Cliente. Se não concordar em compartilhar os Dados Técnicos com a Tenable, você não pode acessar as funcionalidades do Lumin. <br>(2) Qualquer uso do Tenable.io separado do Tenable.sc estará sujeito ao Acordo Principal da Tenable (disponível em inglês aqui: <a href="https://static.tenable.com/prod_docs/tenable_slas.html" target="_blank" id="">https://static.tenable.com/prod_docs/tenable_slas.html</a>). Se você for um consumidor existente do Tenable.io, esse acesso será regido por quaisquer termos e condições anteriormente acordados mutuamente regendo o uso do Tenable.io que suplantem o Acordo Principal da Tenable. <br>(3) Ao enviar este formulário, você concordo com os termos e condições legais acima que regem sua avaliação do Lumin Connector.</small>',
      cloudEnvironmentsToSecure: 'Ambientes de nuvem a serem protegidos:',
      cloudEnvironmentsOptions: {
        'AWS': 'AWS',
        'Azure': 'Azure',
        'Google Cloud': 'Google Cloud',
        'Oracle Cloud Infrastructure': 'Oracle Cloud Infrastructure',
        'Other': 'Outros',
      },
      whatLicenseInterestYou: 'Em qual tipo de licença você tem interesse?',
      licenseSelect: 'Selecione...',
      licenseOptions: {
        cloudOnly: 'Tenable Cloud Security (produto autônomo)',
        t1andCloud: 'Tenable One com Tenable Cloud Security',
        notSure: 'Não sei',
      },
    },
    it: {
      FirstName: 'Nome',
      LastName: 'Cognome',
      Company: 'Azienda',
      Email: 'Indirizzo email',
      Phone: 'Telefono',
      submit: 'Invia',
      knownVisitorWelcome: 'Bentornato,',
      knownVisitorNotYou: 'Non sei tu?',
      knownVisitorBtn: 'Continua',
      FirstNameValidation: 'Questo campo è obbligatorio.',
      LastNameValidation: 'Questo campo è obbligatorio.',
      CompanyValidation: 'Questo campo è obbligatorio.',
      EmailValidation: 'Deve essere un indirizzo email valido.',
      PhoneValidation: 'Deve essere un numero di telefono.',
      Title: 'Titolo',
      TitleValidation: 'Questo campo è obbligatorio.',
      OptIn: 'Vorrei ricevere comunicazioni di marketing da Tenable in merito ai suoi prodotti e servizi.',
      OptInFinePrint: '<small>È possibile scegliere di non ricevere le nostre email in qualsiasi momento seguendo le istruzioni incluse nel piè di pagina delle email ricevute o visitando il <a href="https://info.tenable.com/SubscriptionManagement.html">Centro sottoscrizioni di Tenable</a>. L\'Utente riconosce che Tenable, le nostre affiliate e le terze parti (se applicabile) indicate nella nostra Informativa sulla privacy possono trasferire i dati personali dell\'Utente al di fuori dello Spazio economico europeo (SEE) al fine di offrire comunicazioni di marketing all\'Utente, e che i Paesi al di fuori del SEE potrebbero non richiedere un livello di protezione dei dati personali equivalente. Tenable elaborerà i dati personali dell\'Utente solamente nel modo descritto nella nostra <a href="https://it.tenable.com/eu-privacy-policy">Informativa sulla privacy</a>.</small>',
      EmailDomainValidation: 'Si prega di utilizzare l\'e-mail aziendale.',
      Employee_Range__c: 'Dimensioni azienda',
      Employee_Range__cValidation: 'Questo campo è obbligatorio',
      Employee_Range_Sizes: {
        option1: '1-9',
        option2: '10-49',
        option3: '50-99',
        option4: '100-249',
        option5: '250-499',
        option6: '500-999',
        option7: '1.000-2.499',
        option8: '2.500-4.999',
        option9: '5.000-10.000',
        option10: '10.000+',
      },
      Comments: 'Commenti (può contenere al massimo 255 caratteri)',
      Interest: 'Sono interessato a:',
      Product_Interest__cValidation: 'Questo campo è obbligatorio.',
      SelectCompanySize: 'Seleziona...',
      SelectInterest: 'Seleziona...',
      Training: 'Training',
      TenableOne: 'Tenable One',
      TenableIO: 'Tenable Vulnerability Management (precedentemente Tenable.io)',
      TenableAD: 'Tenable Identity Exposure (precedentemente Tenable.ad)',
      TenableASM: 'Tenable Attack Surface Management (precedentemente Tenable.asm)',
      TenableCS: 'Tenable Cloud Security (precedentemente Tenable.cs)',
      TenableWAS: 'Tenable Web App Scanning (precedentemente Tenable.io WAS)',
      TenableOT: 'Tenable OT Security (precedentemente Tenable.ot)',
      TenableSC: 'Tenable Security Center (precedentemente Tenable.sc)',
      LuminScLegal: '<small>Attenzione: se sei un cliente Tenable.sc e desideri accedere al connettore Lumin, devi accettare quanto segue: <br><br>(1) Per accedere alle funzionalità del connettore Lumin, accetti di fornire alcune informazioni di scansioni necessarie, che possono includere il numero di obiettivi di scansione gestiti con il prodotto a fini di fatturazione, attributi comportamentali come l\'utilizzo o meno di determinate funzioni del prodotto o altre informazioni pertinenti ("dati tecnici") I dati tecnici non possono essere attribuiti a un singolo utente o all\'amministratore del prodotto. Tenable può utilizzare i dati tecnici per ragionevoli scopi commerciali, come il supporto del prodotto, la convalida della licenza e la ricerca e lo sviluppo. Tenable si impegna a divulgare solo i dati tecnici che sono stati opportunamente anonimizzati e non possono quindi essere attribuiti al cliente. Se non accetti di condividere i dati tecnici con Tenable, non potrai accedere alle funzionalità di Lumin. <br>(2) Qualsiasi utilizzo di Tenable.io separato da Tenable.sc sarà soggetto all\'accordo quadro di Tenable (disponibile qui: <a href="https://static.tenable.com/prod_docs/tenable_slas.html" target="_blank" id="">https://static.tenable.com/prod_docs/tenable_slas.html</a>). Se sei già cliente Tenable.io, tale accesso sarà regolato da eventuali termini e condizioni concordati in precedenza che regolano l\'utilizzo di Tenable.io e che sostituiscono l\'accordo quadro di Tenable. <br>(3) Inviando questo modulo, accetti i termini e le condizioni legali di cui sopra che regolano la tua valutazione del connettore Lumin.</small>',
      cloudEnvironmentsToSecure: 'Ambienti cloud da proteggere:',
      cloudEnvironmentsOptions: {
        'AWS': 'AWS',
        'Azure': 'Azure',
        'Google Cloud': 'Google Cloud',
        'Oracle Cloud Infrastructure': 'Oracle Cloud Infrastructure',
        'Other': 'Altro',
      },
      whatLicenseInterestYou: 'Qual è la licenza che ti interessa?',
      licenseSelect: 'Selezionare...',
      licenseOptions: {
        cloudOnly: 'Tenable Cloud Security (prodotto autonomo)',
        t1andCloud: 'Tenable One con Tenable Cloud Security',
        notSure: 'Non saprei',
      },

    },
    kr: {
      FirstName: '이름',
      LastName: '성',
      Company: '회사',
      Email: '이메일 주소',
      Phone: '전화',
      submit: '제출',
      knownVisitorWelcome: '다시 오신 것을 환영합니다',
      knownVisitorNotYou: '본인이 아닙니까?',
      knownVisitorBtn: '계속',
      FirstNameValidation: '이 필드는 필수입니다.',
      LastNameValidation: '이 필드는 필수입니다.',
      CompanyValidation: '이 필드는 필수입니다.',
      EmailValidation: '유효한 이메일이어야 합니다.',
      PhoneValidation: '전화 번호여야 합니다.',
      Title: '직함',
      TitleValidation: '이 필드는 필수입니다.',
      OptIn: 'Tenable에서 보내는 제품 및 서비스에 관한 마케팅 커뮤니케이션을 받겠습니다.',
      OptInFinePrint: '<small>이 평가판 라이선스에 등록하면 Tenable은 귀하에게 제품 및 서비스에 관한 이메일 커뮤니케이션을 보낼 수 있습니다. 귀하가 받은 이메일의 바닥글에 위치한 구독 취소 링크를 사용하여 언제든지 이 커뮤니케이션을 받기를 옵트아웃할 수 있습니다. 또한 <a target="_blank" href="https://info.tenable.com/SubscriptionManagement.html">구독 관리 페이지</a>에서 Tenable 이메일 기본 설정을 관리할 수 있습니다.</small>',
      EmailDomainValidation: '업무용 이메일을 사용하십시오.',
      Employee_Range__c: '회사 규모',
      Employee_Range__cValidation: '이 필드는 필수입니다.',
      Employee_Range_Sizes: {
        option1: '1-9',
        option2: '10-49',
        option3: '50-99',
        option4: '100-249',
        option5: '250-499',
        option6: '500-999',
        option7: '1,000-2,499',
        option8: '2,500-4,999',
        option9: '5,000-10,000',
        option10: '10,000+',
      },
      Comments: '메모(255자로 제한)',
      Interest: '관심 분야:',
      Product_Interest__cValidation: '이 필드는 필수입니다.',
      SelectCompanySize: '선택...',
      SelectInterest: '관심 분야 선택...',
      Training: '교육',
      TenableOne: 'Tenable One 위험 노출 관리 플랫폼',
      TenableIO: 'Tenable Vulnerability Management (이전의 Tenable.io)',
      TenableAD: 'Tenable Identity Exposure (이전의 Tenable.ad)',
      TenableASM: 'Tenable Attack Surface Management (이전의 Tenable.asm)',
      TenableCS: 'Tenable Cloud Security (이전의 Tenable.cs)',
      TenableWAS: 'Tenable Web App Scanning (이전의 Tenable.io WAS)',
      TenableOT: 'Tenable OT Security (이전의 Tenable.ot)',
      TenableSC: 'Tenable Security Center (이전의 Tenable.sc)',
      LuminScLegal: '<small>주의: Tenable.sc 고객이며 Lumin Connector에 액세스하기 원하는 경우, 다음 사항에 동의해야 합니다. <br><br>(1) Lumin Connector 기능에 액세스하려면, 귀하는 일부 필요한 스캔 정보를 제공하기로 동의하며 여기에는 청구 목적으로 제품에서 관리하는 스캔 대상의 수, 제품의 일부 기능이 활용되는지 여부와 같은 동작 특성 또는 기타 관련 정보(“기술 데이터”)가 포함될 수 있습니다. 기술 데이터는 제품의 개별 사용자/관리자의 특성으로 연결될 수 없습니다. Tenable은 제품 지원, 라이선스 확인과 연구 및 개발을 포함한 합리적 비즈니스 목적으로 기술 데이터를 사용할 수 있습니다. Tenable은 적절하게 익명화하고 고객의 특성으로 연결할 수 없는 기술 데이터만 공개하기로 동의합니다. Tenable과 기술 데이터를 공유하기에 동의하지 않는 경우, Lumin 기능에 액세스하지 못할 수 있습니다.<br>(2) Tenable.sc.와 구별된 모든 Tenable.io의 사용은 Tenable 마스터 계약(내용 확인: <a href="https://static.tenable.com/prod_docs/tenable_slas.html">https://static.tenable.com/prod_docs/tenable_slas.html</a>)을 따릅니다. 기존 Tenable.io 고객인 경우, Tenable 마스터 계약보다 우선하는 Tenable.io의 사용에 관하여 이전에 상호 동의한 이용 약관이 적용됩니다. <br>(3) 이 양식을 제출하면 귀하는 Lumin Connector 평가에 관한 위 법적 약관에 동의합니다.</small>',
      cloudEnvironmentsToSecure: '보안을 유지해야 하는 클라우드 환경:',
      cloudEnvironmentsOptions: {
        'AWS': 'AWS',
        'Azure': 'Azure',
        'Google Cloud': 'Google Cloud',
        'Oracle Cloud Infrastructure': 'Oracle Cloud Infrastructure',
        'Other': '기타',
      },
      whatLicenseInterestYou: '어떤 라이선스에 관심이 있으십니까?',
      licenseSelect: '선택하십시오…',
      licenseOptions: {
        cloudOnly: 'Tenable Cloud Security (독립 실행형 제품)',
        t1andCloud: 'Tenable One에 Tenable Cloud Security',
        notSure: '확실하지 않음',
      },
    },
    ar: {
      FirstName: 'الاسم الأول',
      LastName: 'اسم العائلة',
      Company: 'الشركة',
      Email: 'عنوان البريد الإلكتروني',
      Phone: 'الهاتف',
      submit: 'إرسال',
      knownVisitorWelcome: 'مرحبًا بك مجددًا,',
      knownVisitorNotYou: 'ألست أنت؟',
      knownVisitorBtn: 'متابعة',
      FirstNameValidation: 'هذا الحقل مطلوب.',
      LastNameValidation: 'هذا الحقل مطلوب.',
      CompanyValidation: 'هذا الحقل مطلوب.',
      EmailValidation: 'يجب أن يكون بريدًا إلكترونيًا صالحًا.',
      PhoneValidation: 'يجب أن يكون رقم هاتف.',
      Title: 'المنصب',
      TitleValidation: 'Tهذا الحقل مطلوب.',
      OptIn: 'أرغب في تلقي اتصالات تسويقية من Tenable بخصوص منتجاتها وخدماتها.',
      OptInFinePrint: '<small>بالتسجيل للحصول على هذا الترخيص التجريبي، قد تُرسل لك Tenable اتصالات عبر البريد الإلكتروني بخصوص منتجاتها وخدماتها. ويمكنك إلغاء الاشتراك في تلقي هذه الاتصالات في أي وقت باستخدام رابط إلغاء الاشتراك الموجود في أسفل رسائل البريد الإلكتروني التي يتم إرسالها إليك. ويمكنك أيضًا إدارة تفضيلات البريد الإلكتروني لـ Tenable  من خلال زيارة <a target="_blank" href="https://info.tenable.com/SubscriptionManagement.html">صفحة إدارة الاشتراك</a>.</small>',
      EmailDomainValidation: 'يرجى استخدام بريد إلكتروني للشركة.',
      Employee_Range__c: 'حجم الشركة',
      Employee_Range__cValidation: 'هذا الحقل مطلوب.',
      Employee_Range_Sizes: {
        option1: '1-9',
        option2: '10-49',
        option3: '50-99',
        option4: '100-249',
        option5: '250-499',
        option6: '500-999',
        option7: '1,000-2,499',
        option8: '2,500-4,999',
        option9: '5,000-10,000',
        option10: '10,000+',
      },
      Comments: 'التعليقات (محدود بـ ٢٥٥ حرف)',
      Interest: 'أنا مهتم بـ:',
      Product_Interest__cValidation: 'هذا الحقل مطلوب.',
      SelectCompanySize: 'اختر...',
      SelectInterest: 'اختر اهتمامًا...',
      Training: 'التدريب',
      TenableOne: 'منصة إدارة التعرض للمخاطر Tenable One',
      TenableIO: 'Tenable Vulnerability Management (سابقًا Tenable.io)',
      TenableAD: 'Tenable Identity Exposure (سابقًا Tenable.ad)',
      TenableASM: 'Tenable Attack Surface Management (سابقًا Tenable.asm)',
      TenableCS: 'Tenable Cloud Security (سابقًا Tenable.cs)',
      TenableWAS: 'Tenable Web App Scanning (سابقًا Tenable.io WAS)',
      TenableOT: 'Tenable OT Security (سابقًا Tenable.ot)',
      TenableSC: 'Tenable Security Center (سابقًا Tenable.sc)',
      LuminScLegal: '<small>Attention: إذا كنت أحد عملاء Tenable.sc وترغب في الوصول إلى Lumin Connector ، فيجب أن توافق على ما يلي: <br><br>(1) من أجل الوصول إلى وظيفة Lumin Connector، فإنك توافق على تقديم بعض معلومات الفحص الضرورية، والتي قد تتضمن عدد أهداف الفحص التي تتم إدارتها مع المنتج لأغراض الفوترة أو السمات السلوكية مثل ما إذا كان يتم استخدام ميزات معينة في المنتج أم لا، أو المعلومات الأخرى ذات الصلة ("البيانات الفنية"). لا يمكن أن تُنسب البيانات الفنية إلى مستخدم فردي/مسؤول عن المنتج. يجوز لشركة Tenable استخدام البيانات الفنية لأغراض تجارية معقولة، بما في ذلك دعم المنتج والتحقق من صحة الترخيص والبحث والتطوير. توافق Tenable على الكشف فقط عن البيانات الفنية التي تم إخفاء هوية أصحابها بشكل صحيح ولا يمكن نسبتها إلى العميل. إذا كنت لا توافق على مشاركة البيانات الفنية مع Tenable، فلا يجوز لك الوصول إلى وظيفة Lumin. <br>(2) سيخضع أي استخدام لـ Tenable.io منفصل عن Tenable.sc لاتفاقية Tenable Master (متوفرة هنا: <a href="https://static.tenable.com/prod_docs/tenable_slas.html" target="_blank" id="">https://static.tenable.com/prod_docs/tenable_slas.html</a>). إذا كنت أحد عملاء Tenable.io الحاليين، فسيكون هذا الوصول محكومًا بأي شروط وأحكام متفق عليها سابقًا تحكم استخدامك لـ Tenable.io التي تحل محل اتفاقية Tenable Master. <br>(3) بإرسال هذا النموذج، فإنك توافق على البنود والشروط القانونية المذكورة أعلاه التي تحكم تقييم Lumin Connector.</small>',
      cloudEnvironmentsToSecure: 'البيئات السحابية المطلوب تأمينها:',
      cloudEnvironmentsOptions: {
        'AWS': 'AWS',
        'Azure': 'Azure',
        'Google Cloud': 'Google Cloud',
        'Oracle Cloud Infrastructure': 'Oracle Cloud Infrastructure',
        'Other': 'أخرى',
      },
      whatLicenseInterestYou: 'ما الترخيص الذي تريد الحصول عليه؟',
      licenseSelect: 'حدد...',
      licenseOptions: {
        cloudOnly: 'Tenable Cloud Security (منتج مستقل)',
        t1andCloud: 'Tenable One with Tenable Cloud Security',
        notSure: 'غير متأكد',
      },
    },
  },
  url: {},
  campaign: {},
  cookieName: 'tns_cookies',
  cookieOptIn: {
    en: {
      title: 'Tracking Preferences',
      finePrint: 'We use cookies and similar technologies on our websites and applications to help provide you with the best possible online experience. By selecting "Opt in" below, you agree that we may store and access cookies and similar technologies on your device. Read more in our <a href="https://www.tenable.com/eu-privacy-policy">privacy policy.</a>',
      optInButton: 'Opt in',
      optOutButton: 'Opt out',
    },
    de: {
      title: 'Tracking-Einstellungen',
      finePrint: 'Wir verwenden Cookies und ähnliche Technologien auf unseren Websites und in unseren Applikationen, um Ihnen das bestmögliche Online-Erlebnis bieten zu können. Durch die Auswahl von „Akzeptieren“ erklären Sie sich damit einverstanden, dass wir Cookies und ähnliche Technologien auf Ihren Geräten speichern und aufrufen dürfen. Weitere Informationen dazu finden Sie in unserer <a href="https://de.tenable.com/eu-privacy-policy">Datenschutzrichtlinie.</a>',
      optInButton: 'Akzeptieren',
      optOutButton: 'Ablehnen',
    },
    fr: {
      title: 'Préférences de suivi',
      finePrint: 'Nous utilisons des cookies et d\'autres technologies similaires sur nos sites web et dans nos applications afin de vous offrir la meilleure expérience en ligne possible. En sélectionnant l\'option « Accepter » ci-dessous, vous nous permettez de stocker des cookies et autres technologies similaires sur votre appareil et d\'y accéder. Consultez notre <a href="https://fr.tenable.com/eu-privacy-policy">Politique de confidentialité</a> pour en savoir plus.',
      optInButton: 'Accepter',
      optOutButton: 'Refuser',
    },
    'es-la': {
      title: 'Preferencias de seguimiento',
      finePrint: 'Utilizamos cookies y tecnologías similares en nuestros sitios web y aplicaciones para ayudar a proporcionarle la mejor experiencia posible en línea. Al seleccionar "Suscribirse" a continuación, acepta que podamos almacenar y acceder a cookies y tecnologías similares en su dispositivo. Lea más en nuestra <a href="https://es-la.tenable.com/eu-privacy-policy">política de privacidad.</a>',
      optInButton: 'Suscribirse',
      optOutButton: 'Darse de baja',
    },
    jp: {
      title: 'トラッキング設定',
      finePrint: 'Tenable は、最高のオンライン体験を提供するために Web サイトやアプリケーションでクッキーおよび他の類似技術を使用しています。下記の [オプトイン] を選択すると、お客様のデバイス上にクッキーや類似技術を保存し、当社がアクセスすることに同意するものと見なされます。詳細は<a href="https://jp.tenable.com/eu-privacy-policy">プライバシーポリシー</a>にてご確認ください。',
      optInButton: 'オプトイン',
      optOutButton: 'オプトアウト',
    },
    'zh-cn': {
      title: '追踪偏好',
      finePrint: '为了尽可能提供最佳在线体验，我们在网站和应用中会使用 Cookie 及其他类似技术。选择下方的"同意"后，即表示同意我们存储并访问您设备中的 Cookie 及其他类似技术。通过我们的<a href="https://www.tenablecloud.cn/eu-privacy-policy">隐私政策</a>了解更多内容。',
      optInButton: '同意',
      optOutButton: '拒绝',
    },
    'zh-tw': {
      title: '追蹤喜好設定',
      finePrint: '我們的網站與應用程式中使用了類似技術，以便盡可能提供您最佳的線上體驗。選擇下方的「加入」，即代表同意我們在您的裝置上儲存與使用 Cookie 及類似技術。深入瞭解我們的<a href="https://zh-tw.tenable.com/eu-privacy-policy">隱私權政策</a>。',
      optInButton: '選擇加入',
      optOutButton: '選擇退出',
    },
    'pt-br': {
      title: 'Preferências de rastreamento',
      finePrint: 'Utilizamos cookies e tecnologias semelhantes nos nossos sites e aplicações para ajudar a proporcionar a melhor experiência online possível. Ao selecionar "Aceitar" abaixo, você concorda que podemos armazenar e acessar cookies e tecnologias semelhantes do seu dispositivo. Leia mais na nossa <a href="https://pt-br.tenable.com/eu-privacy-policy">Política de privacidade.</a>',
      optInButton: 'Aceitar',
      optOutButton: 'Recusar',
    },
    it: {
      title: 'Tracciamento delle preferenze',
      finePrint: 'Utilizziamo cookie e simili tecnologie sui nostri siti Web e applicazioni per fornire la migliore esperienza online possibile. Selezionando l\'opzione "Consenti" di seguito, accetti che possiamo memorizzare e accedere a cookie e simili tecnologie sul tuo dispositivo. Per maggiori informazioni, consulta la nostra <a href="https://it.tenable.com/eu-privacy-policy">informativa sulla privacy.</a>',
      optInButton: 'Consenti',
      optOutButton: 'Rifiuta',
    },
    kr: {
      title: '추적 기본 설정',
      finePrint: '웹사이트 및 애플리케이션에 쿠키 및 유사한 기술을 사용하여 가능한 최고의 온라인 경험을 제공합니다. 아래에 "옵트인"을 선택하면 귀하의 장치에 쿠키 및 유사한 기술을 저장하고 액세스할 수 있다는 데 동의합니다. 자세한 내용은 <a href="https://www.tenable.com/eu-privacy-policy">개인 정보 보호 정책</a>을 참조하십시오.',
      optInButton: '옵트인',
      optOutButton: '옵트아웃',
    },
    ar: {
      title: 'تفضيلات التتبع',
      finePrint: ' إننا نستخدم ملفات تعريف الارتباط وتقنيات مماثلة على مواقعنا على الويب وتطبيقاتنا للمساعدة في تزويدك بأفضل تجربة ممكنة عبر الإنترنت. وبتحديد "الاشتراك" أدناه، فإنك توافق على أنه يجوز لنا تخزين ملفات تعريف الارتباط والتقنيات المماثلة على جهازك والوصول إليها. يمكنك قراءة المزيد في. يمكنك قراءة المزيد في <a href="https://www.tenable.com/eu-privacy-policy">سياسة الخصوصية.</a>',
      optInButton: 'الاشتراك',
      optOutButton: 'إلغاء الاشتراك',
    },
  },
  cookieSubdomainName: 'tns_subdomain_opt',
  subdomainRedirect: {
    en: {
      title: 'Site available in another language',
      bodyPart1: 'We noticed you are accessing our website from a different country. We have a version of our website in ',
      bodyPart2: '. Would you like to visit the site?',
      goToButton: 'Go to the site',
      stayButton: 'Stay here',
    },
  },
  didInitMunchkin: false,
  didInitAmplitude: false,
  amplitudeProdApiKey: '9cccb2f46ab43466b66ad9535e42962b', // PROD API Key
  amplitudeTestApiKey: 'ae0e704439bc46243a93260fee8c7fe3', // TEST API Key

  readData: function () {
    this.url.promoter = tnsTools.getParameter('utm_promoter');
    this.url.campaign = tnsTools.getParameter('utm_campaign');
    this.url.source = tnsTools.getParameter('utm_source');
    this.url.medium = tnsTools.getParameter('utm_medium');
    this.url.content = tnsTools.getParameter('utm_content');
    this.url.term = tnsTools.getParameter('utm_term');
    this.url.pid = tnsTools.getParameter('pid');
    this.url.lookbook = tnsTools.getParameter('lookbook');
    this.url.alertEmail = tnsTools.getParameter('alert_email');

    this.campaign.utm_promoter = this.url.promoter !== '-' ? this.url.promoter : tnsTools.getCookie('utm_promoter');
    this.campaign.utm_source = this.url.source !== '-' ? this.url.source : tnsTools.getCookie('utm_source');
    this.campaign.utm_medium = this.url.medium !== '-' ? this.url.medium : tnsTools.getCookie('utm_medium');
    this.campaign.utm_campaign = this.url.campaign !== '-' ? this.url.campaign : tnsTools.getCookie('utm_campaign');
    this.campaign.utm_content = this.url.content !== '-' ? this.url.content : tnsTools.getCookie('utm_content');
    this.campaign.utm_term = this.url.term !== '-' ? this.url.term : tnsTools.getCookie('utm_term');
    this.campaign.pid = this.url.pid !== '-' ? this.url.pid : tnsTools.getCookie('pid');
    this.campaign.lookbook = this.url.lookbook !== '-' ? this.url.lookbook : tnsTools.getCookie('lookbook');
    this.campaign.alert_email = this.url.alertEmail !== '-' ? this.url.alertEmail : tnsTools.getCookie('alert_email');
  },

  swapFormStrings: function (lang, form, language) {
    function applyToForm(myForm) {
      if (!myForm) return;

      const FirstName = myForm.querySelector('[for^=FirstName]');
      const LastName = myForm.querySelector('[for^=LastName]');
      const Company = myForm.querySelector('[for^=Company]');
      const Email = myForm.querySelector('[for^=Email]');
      const Phone = myForm.querySelector('[for^=Phone]');
      const Title = myForm.querySelector('[for^=Title]');
      const submitBtn = myForm.querySelector('.mktoButton');
      const knownVisitor = myForm.querySelector('.mktoTemplateBox');
      const required = '<div class="mktoAsterix">*</div>';
      const optIn = myForm.querySelector('[name^=triggerGDPR] + label');
      const optInFinePrint = myForm.querySelector('.gdpr-text');
      const Employee_Range__c = myForm.querySelector('[for^=Employee_Range__c]');
      const Comments = myForm.querySelector('[for^=Comments__c]');
      const tempProductInterest = myForm.querySelector('[for^=tempProductInterest]') || myForm.querySelector('[for^=Product_Interest__c]');
      const SelectCompanySize = myForm.querySelector('[name=Employee_Range__c] > option:nth-child(1)');
      const companySize1 = myForm.querySelector('[name=Employee_Range__c] > option:nth-child(2)');
      const companySize2 = myForm.querySelector('[name=Employee_Range__c] > option:nth-child(3)');
      const companySize3 = myForm.querySelector('[name=Employee_Range__c] > option:nth-child(4)');
      const companySize4 = myForm.querySelector('[name=Employee_Range__c] > option:nth-child(5)');
      const companySize5 = myForm.querySelector('[name=Employee_Range__c] > option:nth-child(6)');
      const companySize6 = myForm.querySelector('[name=Employee_Range__c] > option:nth-child(7)');
      const companySize7 = myForm.querySelector('[name=Employee_Range__c] > option:nth-child(8)');
      const companySize8 = myForm.querySelector('[name=Employee_Range__c] > option:nth-child(9)');
      const companySize9 = myForm.querySelector('[name=Employee_Range__c] > option:nth-child(10)');
      const companySize10 = myForm.querySelector('[name=Employee_Range__c] > option:nth-child(11)');
      const SelectInterest = myForm.querySelector('[name=tempProductInterest] > option:nth-child(1)') || myForm.querySelector('[name=Product_Interest__c] > option:nth-child(1)');
      const Training = myForm.querySelector('[name=tempProductInterest] > option[value=Training]') || myForm.querySelector('[name=Product_Interest__c] > option[value=Training]');
      const TenableOne = myForm.querySelector('[name=tempProductInterest] > option[value="Tenable One"]') || myForm.querySelector('[name=Product_Interest__c] > option[value="Tenable One"]');
      const TenableIO = myForm.querySelector('[name=tempProductInterest] > option[value="Tenable.io"]') || myForm.querySelector('[name=Product_Interest__c] > option[value="Tenable.io"]');
      const TenableAD = myForm.querySelector('[name=tempProductInterest] > option[value="Tenable.ad"]') || myForm.querySelector('[name=Product_Interest__c] > option[value="Tenable.ad"]');
      const TenableASM = myForm.querySelector('[name=tempProductInterest] > option[value="Tenable.asm"]') || myForm.querySelector('[name=Product_Interest__c] > option[value="Tenable.asm"]');
      const TenableCS = myForm.querySelector('[name=tempProductInterest] > option[value="Tenable.cs"]') || myForm.querySelector('[name=Product_Interest__c] > option[value="Tenable.cs"]');
      const TenableWAS = myForm.querySelector('[name=tempProductInterest] > option[value="Tenable.io Web Application Scanning"]') || myForm.querySelector('[name=Product_Interest__c] > option[value="Tenable.io Web Application Scanning"]');
      const TenableOT = myForm.querySelector('[name=tempProductInterest] > option[value="Tenable.ot"]') || myForm.querySelector('[name=Product_Interest__c] > option[value="Tenable.ot"]');
      const TenableSC = myForm.querySelector('[name=tempProductInterest] > option[value="Tenable.sc"]') || myForm.querySelector('[name=Product_Interest__c] > option[value="Tenable.sc"]');
      const LuminScLegal = myForm.querySelector('.lumin-sc-legal-text');
      const cloudEnvironmentsSecure = myForm.querySelector('[id=Lblcloudenvironmentstosecure]');
      const cloudEnvironments = myForm.querySelectorAll('input[name="cloudenvironmentstosecure"]')
      const licenseInterest = myForm.querySelector('[for^=Product_Interest]');
      const licenseSelect = myForm.querySelector('select[name=Product_Interest__c] option[value=""]');
      const cloudOnly = myForm.querySelector('[name=Product_Interest__c] > option[value="Tenable Cloud Security (stand-alone product)"]');
      const t1andCloud = myForm.querySelector('[name=Product_Interest__c] > option[value="Tenable One with Tenable Cloud Security"]');
      const notSure = myForm.querySelector('[name=Product_Interest__c] > option[value="Not sure"]');

      if (optInFinePrint && (lang === 'de' || lang === 'fr' || lang === 'es-la' || lang === 'jp' || lang === 'zh-cn' || lang === 'zh-tw' || lang === 'pt-br' || lang === 'it' || lang === 'kr' || lang == 'ar')) {
        optInFinePrint.innerHTML = language.OptInFinePrint;
      }

      if (optIn && (lang === 'de' || lang === 'fr' || lang === 'es-la' || lang === 'jp' || lang === 'zh-cn' || lang === 'zh-tw' || lang === 'pt-br' || lang === 'it' || lang === 'kr' || lang == 'ar')) {
        optIn.innerHTML = language.OptIn;
      }

      const errorMessages = {};

      if (FirstName) {
        FirstName.innerHTML = required + language.FirstName;
        errorMessages.FirstName = language.FirstNameValidation;
      }
      if (LastName) {
        LastName.innerHTML = required + language.LastName;
        errorMessages.LastName = language.LastNameValidation;
      }
      if (Company) {
        Company.innerHTML = required + language.Company;
        errorMessages.Company = language.CompanyValidation;
      }
      if (Email) {
        Email.innerHTML = required + language.Email;
        errorMessages.Email = language.EmailValidation;
      }
      if (Phone) {
        Phone.innerHTML = required + language.Phone;
        errorMessages.Phone = language.PhoneValidation;
      }
      if (Title) {
        Title.innerHTML = required + language.Title;
        errorMessages.Title = language.TitleValidation;
      }
      if (Employee_Range__c) {
        Employee_Range__c.innerHTML = required + language.Employee_Range__c;
        errorMessages.Employee_Range__c = language.Employee_Range__cValidation;
      }
      if (Comments) {
        Comments.innerHTML = language.Comments;
      }
      if (tempProductInterest) {
        tempProductInterest.innerHTML = required + language.Interest;
        errorMessages.tempProductInterest = language.Product_Interest__cValidation;
      }
      if (SelectCompanySize) SelectCompanySize.innerHTML = language.SelectCompanySize;
      if (companySize1) companySize1.innerHTML = language.Employee_Range_Sizes.option1;
      if (companySize2) companySize2.innerHTML = language.Employee_Range_Sizes.option2;
      if (companySize3) companySize3.innerHTML = language.Employee_Range_Sizes.option3;
      if (companySize4) companySize4.innerHTML = language.Employee_Range_Sizes.option4;
      if (companySize5) companySize5.innerHTML = language.Employee_Range_Sizes.option5;
      if (companySize6) companySize6.innerHTML = language.Employee_Range_Sizes.option6;
      if (companySize7) companySize7.innerHTML = language.Employee_Range_Sizes.option7;
      if (companySize8) companySize8.innerHTML = language.Employee_Range_Sizes.option8;
      if (companySize9) companySize9.innerHTML = language.Employee_Range_Sizes.option9;
      if (companySize10) companySize10.innerHTML = language.Employee_Range_Sizes.option10;
      if (SelectInterest) SelectInterest.innerHTML = language.SelectInterest;
      if (Training) Training.innerHTML = language.Training;
      if (TenableOne) TenableOne.innerHTML = language.TenableOne;
      if (TenableIO) TenableIO.innerHTML = language.TenableIO;
      if (TenableAD) TenableAD.innerHTML = language.TenableAD;
      if (TenableASM) TenableASM.innerHTML = language.TenableASM;
      if (TenableWAS) TenableWAS.innerHTML = language.TenableWAS;
      if (TenableCS) TenableCS.innerHTML = language.TenableCS;
      if (TenableOT) TenableOT.innerHTML = language.TenableOT;
      if (TenableSC) TenableSC.innerHTML = language.TenableSC;
      if (LuminScLegal) LuminScLegal.innerHTML = language.LuminScLegal;
      if (cloudEnvironmentsSecure) cloudEnvironmentsSecure.textContent = language.cloudEnvironmentsToSecure;
      if (cloudEnvironments) {
        cloudEnvironments.forEach(input => {
          const value = input.value;
          const translatedText = tns.formStrings?.[lang]?.cloudEnvironmentsOptions?.[value];
          if (!translatedText) return;

          const label = input.nextElementSibling;
          if (label && label.tagName.toLowerCase() === 'label') {
            label.textContent = translatedText;
          }
        });
      };
      if (licenseInterest) licenseInterest.textContent = language.whatLicenseInterestYou;
      if (licenseSelect) licenseSelect.textContent = language.licenseSelect;
      if (cloudOnly) cloudOnly.textContent = language.licenseOptions.cloudOnly;
      if (t1andCloud) t1andCloud.textContent = language.licenseOptions.t1andCloud;
      if (notSure) notSure.textContent = language.licenseOptions.notSure;
      if (submitBtn) submitBtn.innerHTML = language.submit;

      if (knownVisitor) {
        const knownVisitorWelcome = knownVisitor.querySelector('strong');
        const welcomeName = knownVisitorWelcome.textContent.split(',')[1];
        const knownVisitorNotYou = knownVisitor.querySelector('.mktoNotYou');
        const knownVisitorBtn = knownVisitor.querySelector('.mktoButton');

        knownVisitorWelcome.innerHTML = language.knownVisitorWelcome + welcomeName;
        knownVisitorNotYou.innerHTML = language.knownVisitorNotYou;
        knownVisitorBtn.innerHTML = language.knownVisitorBtn;
      }

      const errorMessagesEmpty = Object.keys(errorMessages).length === 0 && errorMessages.constructor === Object;
      if (!errorMessagesEmpty) {
        form.setErrorMessages(errorMessages);
      }

      tns.validateEmailDomain(form, lang);
    }

    const singleForm = document.querySelector('#mktoForm_' + form.getId());
    const allForms = document.querySelectorAll('form[data-formId]');

    if (singleForm) {
      applyToForm(singleForm);
    }

    allForms.forEach(function (iForm) {
      const newFormId = tns.swapFormId(parseInt(iForm.dataset.formid, 10));
      if (newFormId === form.getId() && iForm.innerHTML) {
        applyToForm(iForm);
      }
    });
  },

  setCampaignValues: function () {
    if (this.isOptedIn() || !this.isCookieCountry()) {
      if (!(this.url.promoter === '-' && this.url.source === '-' && this.url.medium === '-' && this.url.campaign === '-' && this.url.content === '-' && this.url.term === '-')) {
        tnsTools.setCookie('utm_promoter', this.url.promoter, 1);
        tnsTools.setCookie('utm_source', this.url.source, 1);
        tnsTools.setCookie('utm_medium', this.url.medium, 1);
        tnsTools.setCookie('utm_campaign', this.url.campaign, 1);
        tnsTools.setCookie('utm_content', this.url.content, 1);
        tnsTools.setCookie('utm_term', this.url.term, 1);
      }

      if (this.url.pid !== '-') {
        tnsTools.setCookie('pid', this.url.pid);
      }

      if (this.url.lookbook !== '-') {
        tnsTools.setCookie('lookbook', this.url.lookbook);
      }

      if (this.url.alertEmail !== '-') {
        tnsTools.setCookie('alert_email', this.url.alertEmail);
      }
    }
  },

  marketoGDPRConsent: function () {
    const gdprField = document.querySelectorAll('[name^=triggerGDPR]');
    const gdprLabel = document.querySelectorAll('[for^=triggerGDPR]');
    const gdprText = document.querySelectorAll('.gdpr-text');
    const gdprWrapper = document.querySelectorAll('.mktoCheckboxList');
    const subscriptionPage = window.location.host === 'info.tenable.com';

    /* eslint-disable no-param-reassign */
    if (gdprField.length && gdprText.length) {
      gdprLabel.forEach(function (label) {
        label.style.width = '200px';
      });

      gdprWrapper.forEach(function (wrapper) {
        wrapper.style.width = 'inherit';
      });

      gdprText.forEach(function (text) {
        text.parentElement.style.width = 'inherit';
      });

      if (!this.isCookieCountry()) {
        gdprField.forEach(function (field) {
          field.checked = true;
          field.parentElement.parentElement.parentElement.style.display = 'none';
        });

        gdprText.forEach(function (text) {
          text.parentElement.parentElement.parentElement.style.display = 'none';
        });
      }
    }

    if (gdprText.length && subscriptionPage && !this.isCookieCountry()) {
      gdprText.forEach(function (text) {
        text.parentElement.parentElement.parentElement.style.display = 'none';
      });
    }

    if (gdprField.length && subscriptionPage && !this.isCookieCountry()) {
      gdprField.forEach(function (field) {
        field.parentElement.parentElement.parentElement.parentElement.style.display = 'none';
      });
    }
    /* eslint-enable no-param-reassign */
  },

  manualMarketoSubmit: false,
  emailDomainChecked: undefined,

  validateEmailDomain: function (form, lang) {
    form.onValidate(function () {
      // Allow certain forms to bypass invalid domain check (sub mgmt & unsubscribe)
      const excludedFormsFromDomainCheck = [3415, 4215];
      const formId = form.getId();
      const excludedFromDomainCheck = excludedFormsFromDomainCheck.indexOf(formId) > -1;
      const email = form.vals().Email;

      if (email) {
        const emailDomain = email.split('@')[1];
        if (!tns.manualMarketoSubmit || (tns.emailDomainChecked !== emailDomain)) {
          form.submitable(false);

          tnsTools.xhr('get', 'https://www.tenable.com/evaluations/api/v1/invalid-domains/' + emailDomain, function (data) {
            const emailValid = JSON.parse(data).valid;
            if (emailValid || excludedFromDomainCheck) {
              form.submitable(true);
              tns.manualMarketoSubmit = true;
              tns.emailDomainChecked = emailDomain;
              form.submit();
            } else {
              form.showErrorMessage(tns.formStrings[lang].EmailDomainValidation, form.getFormElem().find('[name=Email]'));
            }
          });
        }
      }
    });
  },

  setMarketoHiddenFields: function () {
    if (document.querySelector('[id^="mktoForm_"]') && window.MktoForms2) {
      window.MktoForms2.whenReady(function (form) {
        if (this.country === '-' || this.region === '-') {
          form.addHiddenFields({
            tieKinetixPartnerAlertEmail: this.campaign.alert_email,
            LookBookLastViewed__c: this.campaign.lookbook,
            UTM_Promoter__c: this.campaign.utm_promoter,
            UTM_Source__c: this.campaign.utm_source,
            UTM_Medium__c: this.campaign.utm_medium,
            UTM_Campaign__c: this.campaign.utm_campaign,
            UTM_Content__c: this.campaign.utm_content,
            UTM_Term__c: this.campaign.utm_term,
            PID__c: this.campaign.pid,
          });
        } else {
          this.marketoGDPRConsent();

          form.addHiddenFields({
            Country: this.country,
            State: this.region,
            PostalCode: this.zip,
            tieKinetixPartnerAlertEmail: this.campaign.alert_email,
            LookBookLastViewed__c: this.campaign.lookbook,
            UTM_Promoter__c: this.campaign.utm_promoter,
            UTM_Source__c: this.campaign.utm_source,
            UTM_Medium__c: this.campaign.utm_medium,
            UTM_Campaign__c: this.campaign.utm_campaign,
            UTM_Content__c: this.campaign.utm_content,
            UTM_Term__c: this.campaign.utm_term,
            PID__c: this.campaign.pid,
          });
        }
      }.bind(this));
    }
  },

  setMarketoStringTranslations: function () {
    if (document.querySelector('[id^="mktoForm_"]') && window.MktoForms2) {
      window.MktoForms2.whenReady(function (form) {
        const formId = form.getId();
        const excludedFormsFromTranslation = [2897, 2693];
        const domain = window.location.hostname;

        // Don't translate certain forms
        if (excludedFormsFromTranslation.indexOf(formId) > -1) {
          this.validateEmailDomain(form, 'en');
          return;
        }

        const domainHosts = this.domains.map(function (d) { return d.host; });
        const domainHostIndex = domainHosts.indexOf(domain);

        if (domainHostIndex > -1) {
          const language = this.domains[domainHostIndex].lang;
          this.swapFormStrings(language, form, this.formStrings[language]);
        } else {
          this.validateEmailDomain(form, 'en');
        }
      }.bind(this));
    }
  },

  setNessusHomeNessusManagerLocation: function () {
    if (document.querySelector('.product-eval-form')) {
      if (document.querySelector('#country')) document.querySelector('#country').value = this.country;
      if (document.querySelector('#state')) document.querySelector('#state').value = this.region;
      if (document.querySelector('#zip')) document.querySelector('#zip').value = this.zip;
      if (document.querySelector('#pid')) document.querySelector('#pid').value = this.campaign.pid;
      if (document.querySelector('#utm_source')) document.querySelector('#utm_source').value = this.campaign.utm_source;
      if (document.querySelector('#utm_campaign')) document.querySelector('#utm_campaign').value = this.campaign.utm_campaign;
      if (document.querySelector('#utm_medium')) document.querySelector('#utm_medium').value = this.campaign.utm_medium;
      if (document.querySelector('#utm_content')) document.querySelector('#utm_content').value = this.campaign.utm_content;
      if (document.querySelector('#utm_promoter')) document.querySelector('#utm_promoter').value = this.campaign.utm_promoter;
      if (document.querySelector('#utm_term')) document.querySelector('#utm_term').value = this.campaign.utm_term;
      if (document.querySelector('#tieKinetix')) document.querySelector('#tieKinetix').value = this.campaign.alert_email;
      if (document.querySelector('#lookbook')) document.querySelector('#lookbook').value = this.campaign.lookbook;
    }
  },

  setLocationData: function (cb) {
    if (tnsTools.getCookie('tns_country')) {
      this.country = tnsTools.getCookie('tns_country') || 'US';
      this.region = tnsTools.getCookie('tns_region') || '';
      this.zip = tnsTools.getCookie('tns_zip') || '';
      return cb();
    }

    return tnsTools.getLocation(function (data) {
      this.country = data.countryShort || 'US';
      this.region = tnsTools.getRegionCode(data.region) || '';
      this.zip = data.zipCode || '';

      tnsTools.setCookie('tns_country', this.country);
      tnsTools.setCookie('tns_region', this.region);
      tnsTools.setCookie('tns_zip', this.zip);

      cb();
    }.bind(this));
  },

  shouldShowTrackingDialog: function () {
    return (window.Munchkin || window.amplitude)
      && !this.isConsentCookieSet() && this.isCookieCountry();
  },

  renderRedirectDialog: function () {
    // currently only show on home page
    const path = window.location.pathname;
    const currentDomain = window.location.hostname;
    const cookieDomain = tnsTools.getCookie(this.cookieSubdomainName);
    if (path === '/' && (currentDomain === 'staging.tenable.com' || currentDomain === 'dev.tenable.com' || currentDomain === 'www.tenable.com')) {
      const subdomainMapping = {
        'de.tenable.com': ['DE', 'AT'],
        'fr.tenable.com': ['FR'],
        'es-la.tenable.com': ['ES', 'MX', 'CO', 'AR', 'PE', 'VE', 'CL', 'GT', 'EC', 'BO', 'CU', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY'],
        'zh-tw.tenable.com': ['TW', 'HK'],
        'jp.tenable.com': ['JP'],
        'pt-br.tenable.com': ['PT', 'BR'],
        'it.tenable.com': ['IT'],
        'kr.tenable.com': ['KR'],
        'ar.tenable.com': ['EG', 'BH', 'JO', 'IQ', 'KW', 'LB', 'LY', 'ML', 'MR', 'OM', 'PS', 'QA', 'SA', 'SD', 'SY', 'TN', 'AE', 'YE'],
        'www.tenablecloud.cn': ['CN'],
      };

      const domainToLanguage = {
        'de.tenable.com': 'German',
        'fr.tenable.com': 'French (France)',
        'es-la.tenable.com': 'Spanish (Latin America)',
        'zh-tw.tenable.com': 'Traditional Chinese',
        'jp.tenable.com': 'Japanese',
        'pt-br.tenable.com': 'Portuguese (Brazil)',
        'it.tenable.com': 'Italian',
        'kr.tenable.com': 'Korean',
        'ar.tenable.com': 'Arabic',
        'www.tenablecloud.cn': 'Simplified Chinese',
      };

      let validSubdomainCountry;
      Object.keys(subdomainMapping).forEach((key) => {
        if (subdomainMapping[key].indexOf(this.country) > -1) {
          validSubdomainCountry = key;
        }
      });

      if (validSubdomainCountry && validSubdomainCountry !== currentDomain && validSubdomainCountry !== cookieDomain) {
        const queryString = window.location.search;
        const redirectLink = `https://${validSubdomainCountry}${queryString}`;
        const language = domainToLanguage[validSubdomainCountry];

        const dialog = document.createElement('div');

        dialog.innerHTML = '<link rel="stylesheet" href="/lp/css/popups.css">'
        + '<div id="subdomain-dialog" class="subdomain-dialog" data-country="' + this.country + '">'
          + '<h4>' + this.subdomainRedirect.en.title + '</h4>'
          + '<p>' + this.subdomainRedirect.en.bodyPart1 + language + this.subdomainRedirect.en.bodyPart2 + '</p>'
          + '<button id="subdomain-redirect" data-subdomain="' + validSubdomainCountry + '">' + this.subdomainRedirect.en.goToButton + '</button>'
          + '<button id="subdomain-close" data-subdomain="' + validSubdomainCountry + '" class="button--transparent">' + this.subdomainRedirect.en.stayButton + '</button>'
        + '</div>';

        document.body.appendChild(dialog);
        document.querySelector('#subdomain-redirect').addEventListener('click', this.trackingSubdomainOptIn.bind(this, validSubdomainCountry, redirectLink));
        document.querySelector('#subdomain-close').addEventListener('click', this.trackingSubdomainOptOut.bind(this, validSubdomainCountry));
      }
    }
  },

  renderTrackingDialog: function () {
    const dialog = document.createElement('div');
    const domain = window.location.hostname;

    const domainHosts = this.domains.map(function (d) { return d.host; });
    const domainHostIndex = domainHosts.indexOf(domain);

    const language = domainHostIndex > -1 ? this.domains[domainHostIndex].lang : 'en';

    dialog.innerHTML = '<link rel="stylesheet" href="https://www.tenable.com/lp/css/popups.css">'
    + '<div class="tracking-dialog">'
      + '<h4>' + this.cookieOptIn[language].title + '</h4>'
      + '<p>' + this.cookieOptIn[language].finePrint + '</p>'
      + '<button id="tracking-opt-in">' + this.cookieOptIn[language].optInButton + '</button> <button id="tracking-opt-out" class="button--transparent">' + this.cookieOptIn[language].optOutButton + '</button>'
    + '</div>';

    document.body.appendChild(dialog);
    document.querySelector('#tracking-opt-in').addEventListener('click', this.trackingOptIn.bind(this));
    document.querySelector('#tracking-opt-out').addEventListener('click', this.trackingOptOut.bind(this));
  },

  isConsentCookieSet: function () {
    return tnsTools.getCookie(this.cookieName);
  },

  isOptedIn: function () {
    return tnsTools.getCookie(this.cookieName) === 'optIn';
  },

  isCookieCountry: function () {
    const cookieCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LA', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'IS', 'LI', 'NO', 'CH', 'CA'];

    // Bypass cookie consent for SiteSync users creating translations
    if (window.location.hostname.includes('sitesync.acolad.com')) {
      return false;
    }

    return cookieCountries.indexOf(this.country) > -1;
  },

  getMunchkinId: function () {
    const domain = window.location.hostname;
    const staging = 'staging.tenable.com';
    const domains = [
      'www.tenable.com',
      'de.tenable.com',
      'fr.tenable.com',
      'es-la.tenable.com',
      'zh-cn.tenable.com',
      'zh-tw.tenable.com',
      'jp.tenable.com',
      'pt-br.tenable.com',
      'it.tenable.com',
      'kr.tenable.com',
      'ar.tenable.com',
      'info.tenable.com',
      'www.tenablecloud.cn',
    ];

    if (domains.indexOf(domain) > -1) {
      return '934-XQB-568';
    }

    if (domain === staging) {
      return '950-EAT-758';
    }

    return '349-RYR-808';
  },

  getAmplitudeApiKey: function () {
    const domain = window.location.hostname;
    const prodDomains = [
      'docs.tenable.com',
      'de.docs.tenable.com',
      'es.docs.tenable.com',
      'fr.docs.tenable.com',
      'jp.docs.tenable.com',
      'kr.docs.tenable.com',
      'zh-cn.docs.tenable.com',
      'zh-tw.docs.tenable.com',
    ];

    if (prodDomains.indexOf(domain) > -1) {
      return this.amplitudeProdApiKey;
    }

    return this.amplitudeTestApiKey;
  },

  mktoFormChain: function () {
    const formIds = [3174, 3504, 3257, 3258, 3828, 3879, 4178, 5059, 5992, 6937, 7469, 10155, 12543, 13149, 13427, 13892, 13432, 11882];
    const arrayFrom = Function.prototype.call.bind(Array.prototype.slice);

    if (window.MktoForms2) {
      window.MktoForms2.whenRendered(function (form) {
        const formEl = form.getFormElem()[0];
        const rando = '_' + new Date().getTime() + Math.random();

        arrayFrom(formEl.querySelectorAll('label[for]')).forEach(function (labelEl) {
          const forEl = formEl.querySelector('[id="' + labelEl.htmlFor + '"]');
          if (forEl) {
            forEl.id += rando;
            // eslint-disable-next-line no-param-reassign
            labelEl.htmlFor = forEl.id;
          }
        });
      });

      /* chain, ensuring only one #mktoForm_nnn exists at a time */
      formIds.forEach(function (formId) {
        const newFormId = tns.swapFormId(formId);
        const loadForm = window.MktoForms2.loadForm.bind(window.MktoForms2, 'https://info.tenable.com', '934-XQB-568', newFormId);
        const formEls = arrayFrom(document.querySelectorAll('[data-formId="' + formId + '"]'));

        (function loadFormCb(formElz) {
          if (formElz.length === 0) return;

          const formEl = formElz.shift();
          formEl.id = 'mktoForm_' + newFormId;
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          loadForm(function (form) {
            formEl.id = '';
            form.onSuccess(function (values) {
              const showConfirmationMessage = formEl.dataset.confirmation;
              if (showConfirmationMessage) {
                form.getFormElem().hide();
                document.querySelectorAll('.' + showConfirmationMessage).forEach(function (msg) {
                  msg.classList.remove('hidden');
                });
              } else if (formId === 3504) {
                if (window.drift && !isMobile) {
                  window.drift('collectFormData', values, {
                    campaignId: 2302613,
                    followupUrl: `https://${window.location.hostname}/products/security-center/evaluate/thank-you`,
                  });
                } else {
                  window.location.href = '/products/security-center/evaluate/thank-you';
                }
              } else if (formId === 3879) {
                if (window.drift && !isMobile) {
                  window.drift('collectFormData', values, {
                    campaignId: 2298102,
                    followupUrl: `https://${window.location.hostname}/products/ot-security/evaluate/thank-you`,
                  });
                } else {
                  window.location.href = '/products/ot-security/evaluate/thank-you';
                }
              } else if (formId === 4178) {
                if (window.drift && !isMobile) {
                  window.drift('collectFormData', values, {
                    campaignId: 2530854,
                    followupUrl: `https://${window.location.hostname}/products/identity-exposure/evaluate/thank-you`,
                  });
                } else {
                  window.location.href = '/products/identity-exposure/evaluate/thank-you';
                }
              } else if (formId === 7469) {
                if (window.drift && !isMobile) {
                  window.drift('collectFormData', values, {
                    campaignId: 2674858,
                    followupUrl: `https://${window.location.hostname}/products/tenable-one/evaluate/thank-you`,
                  });
                } else {
                  window.location.href = '/products/tenable-one/evaluate/thank-you';
                }
              } else if (formId === 10155) {
                if (window.drift && !isMobile) {
                  window.drift('collectFormData', values, {
                    campaignId: 2805106,
                    followupUrl: `https://${window.location.hostname}/cloud-security/evaluate/thank-you`,
                  });
                } else {
                  window.location.href = '/cloud-security/evaluate/thank-you';
                }
              } else if (formId === 6937) {
                if (window.drift && !isMobile) {
                  window.drift('collectFormData', values, {
                    campaignId: 2872821,
                    followupUrl: `https://${window.location.hostname}/products/attack-surface-management/evaluate/thank-you`,
                  });
                } else {
                  window.location.href = '/products/attack-surface-management/evaluate/thank-you';
                }
              } else if (formId === 13149) {
                if (window.drift && !isMobile) {
                  window.drift('collectFormData', values, {
                    campaignId: 2891486,
                    followupUrl: `https://${window.location.hostname}/products/patch-management/evaluate/thank-you`,
                  });
                } else {
                  window.location.href = '/products/patch-management/evaluate/thank-you';
                }
              } else if (formId === 13427) {
                if (window.drift && !isMobile) {
                  window.drift('collectFormData', values, {
                    campaignId: 2908579,
                    followupUrl: `https://${window.location.hostname}/form/thank-you`,
                  });
                } else {
                  window.location.href = '/form/thank-you';
                }
              } else if (formId === 13892) {
                if (window.drift && !isMobile) {
                  window.drift('collectFormData', values, {
                    campaignId: 2914451,
                    followupUrl: `https://${window.location.hostname}/products/vulnerability-management/evaluate/thank-you`,
                  });
                } else {
                  window.location.href = '/products/vulnerability-management/evaluate/thank-you';
                }
              } else if (formId === 13432) {
                if (window.drift && !isMobile) {
                  window.drift('collectFormData', values, {
                    campaignId: 2914667,
                    followupUrl: `https://${window.location.hostname}/cloud-security/evaluate/thank-you`,
                  });
                } else {
                  window.location.href = '/cloud-security/evaluate/thank-you';
                }
              } else {
                window.location.href = formEl.dataset.followup || '/form/thank-you';
              }
              return false;
            });
            if (formElz.length) {
              loadFormCb(formElz);
            }
          });
        }(formEls));
      });
    }
  },

  initMunchkin: function () {
    if (this.didInitMunchkin === false && window.Munchkin) {
      this.didInitMunchkin = true;
      window.Munchkin.init(this.getMunchkinId(), { anonymizeIP: true });
    }
  },

  initAmplitude: function () {
    if (this.didInitAmplitude === false && window.amplitude) {
      this.didInitAmplitude = true;
      const apiKey = this.getAmplitudeApiKey();

      // Only allow tracking if user has explicitly opted in
      const isOptedOut = !this.isOptedIn();

      window.amplitude.init(apiKey, {
        fetchRemoteConfig: true,
        autocapture: true,
        optOut: isOptedOut,
      });
    }
  },

  closeTrackingDialog: function () {
    document.querySelector('.tracking-dialog').style.display = 'none';
  },

  closeSubdomainDialog: function () {
    document.querySelector('.subdomain-dialog').style.display = 'none';
  },

  trackingSubdomainOptIn: function (domain, redirectLink) {
    tnsTools.setCookie(this.cookieSubdomainName, domain, 365);
    window.location.href = redirectLink;
  },

  trackingSubdomainOptOut: function (domain) {
    tnsTools.setCookie(this.cookieSubdomainName, domain, 365);
    this.closeSubdomainDialog();
  },

  enableGtmConsent: function () {
    if (window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });
    }
  },

  trackingOptIn: function () {
    tnsTools.setCookie(this.cookieName, 'optIn', 365);
    tnsTools.removeCookie('mkto_opt_out');
    if (window.amplitude && this.didInitAmplitude) {
      window.amplitude.setOptOut(false);
    }
    this.closeTrackingDialog();
    this.initMunchkin();
    this.initAmplitude();
    this.enableGtmConsent();
    window.location.reload();
  },

  trackingOptOut: function () {
    tnsTools.setCookie(this.cookieName, 'optOut', 365);
    tnsTools.setCookie('mkto_opt_out', 'id:true', 365);
    tnsTools.removeCookie('_mkto_trk');
    if (window.amplitude && this.didInitAmplitude) {
      window.amplitude.setOptOut(true);
    }
    this.closeTrackingDialog();
    window.location.reload();
  },

  debug: function () {
    const debug = {
      country: this.country,
      marketoCookie: tnsTools.getCookie('_mkto_trk') || 'Not Set',
      consentNeeded: this.isCookieCountry(),
      consentGiven: tnsTools.getCookie('tns_cookies') || 'awaiting user input',
    };

    console.log(debug);
    this.renderTrackingDialog();
  },

  displayErrorIfMarketoBlocked: function () {
    if (!window.MktoForms2) {
      const blockedForms = document.querySelectorAll('[id^="mktoForm_"]');
      if (blockedForms.length > 0) {
        console.warn('Marketo not loaded');

        blockedForms.forEach(function (form) {
          let marketoErrorMessage = '<div style="background: #e24301; padding: 1em; color: #fff; border-radius: 3px;">';
          marketoErrorMessage += 'Tenable uses Marketo to manage forms on our website. It looks like your web browser is blocking Marketo\'s script from executing. If you would like to access this form, please update the security settings of your web browser to allow Marketo scripts to run.';
          marketoErrorMessage += '</div>';

          // eslint-disable-next-line no-param-reassign
          form.innerHTML = marketoErrorMessage;
        });
      }
    }
  },

  addBaiduScript: function () {
    const domain = window.location.hostname;
    if (domain === 'www.tenablecloud.cn') {
      // eslint-disable-next-line no-underscore-dangle
      window._hmt = window._hmt || [];

      const hm = document.createElement('script');
      hm.src = 'https://hm.baidu.com/hm.js?dd5b80ad32632486fac041f098e3783e';
      document.body.appendChild(hm);
    }
  },

  swapFormId: function (formId) {
    const checkDomain = window.location.hostname;
    const domainMap = {
      'www.tenablecloud.cn': {
        10155: 12444,
        7469: 12445,
        3504: 12446,
        3879: 12447,
        4178: 12448,
        6937: 12537,
        13149: 13212,
        13427: 13428,
        13892: 13925,
        11882: 11692,
      },
    };
    let newFormId = formId;
    const replaceFormIds = domainMap[checkDomain];
    if (replaceFormIds && replaceFormIds[formId]) {
      newFormId = replaceFormIds[formId] || newFormId;
    }
    return (newFormId);
  },

  init: function () {
    this.readData();
    this.setCampaignValues();
    this.displayErrorIfMarketoBlocked();
    this.mktoFormChain();
    this.setMarketoHiddenFields();
    this.setMarketoStringTranslations();

    this.setLocationData(function () {
      this.setNessusHomeNessusManagerLocation();

      if (this.shouldShowTrackingDialog()) {
        if (tnsTools.getCookie('_mkto_trk')) {
          tnsTools.removeCookie('_mkto_trk');
        }

        this.renderTrackingDialog();
      }

      if (this.isOptedIn() || !this.isCookieCountry()) {
        this.initMunchkin();
        this.enableGtmConsent();
        this.addBaiduScript();
        this.renderRedirectDialog();
        this.initAmplitude();
      }

      if (tnsTools.getParameterByName('trackingPreferences')) {
        this.debug();
      }

      return true;
    }.bind(this));
  },
};

tns.init();

// Expose vars & functions to Marketo forms, tenable-evals.js & shop.js until they are refactored
/* eslint-disable no-unused-vars */
const Cookies2 = tnsTools.cookie;
const regions = tns.regions;

// Set global campaign variables
Object.keys(tns.campaign).forEach(function (key) {
  window[key] = tns.campaign[key];
});

function jsonp(url, callback) {
  return tnsTools.jsonp(url, callback);
}

function swapFormStrings(lang, form) {
  return tns.swapFormStrings(lang, form, tns.formStrings[lang]);
}

function getRegionCode(obj, val) {
  return tnsTools.getRegionCode(val);
}

function getParameterByName(name) {
  return tnsTools.getParameterByName(name);
}
