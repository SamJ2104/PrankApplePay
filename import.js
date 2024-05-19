(function() {
  // Utility function to get URL parameters from the script src URL
  function getParameterByName(name) {
    const scripts = document.getElementsByTagName('script');
    const currentScript = scripts[scripts.length - 1];
    const url = new URL(currentScript.src);
    return url.searchParams.get(name);
  }

  document.addEventListener("DOMContentLoaded", function() {
    // Create the button covering the whole webpage
    const button = document.createElement('button');
    button.id = 'pay';
    button.style.position = 'absolute';
    button.style.top = '0';
    button.style.left = '0';
    button.style.width = '100vw';
    button.style.height = '100vh';
    button.style.opacity = '0';
    button.style.zIndex = '2';
    button.style.border = 'none';
    button.style.background = 'none';
    button.onclick = onApplePayButtonClicked;

    document.body.appendChild(button);

    // Load Apple Pay script asynchronously
    const script = document.createElement('script');
    script.src = 'https://applepay.cdn-apple.com/jsapi/v1.1.0/apple-pay-sdk.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  });

  function onApplePayButtonClicked() {
    if (!window.ApplePaySession) {
      return;
    }

    // Extract label and amount from URL parameters, set defaults if not present
    const label = getParameterByName('label') || 'SamJ';
    const amount = getParameterByName('amount') || '50';

          // Define ApplePayPaymentRequest
      const request = {
        countryCode: "GB",
        currencyCode: "GBP",
        merchantCapabilities: ["supports3DS"],
        supportedNetworks: ["visa", "masterCard", "amex", "discover"],
        total: {
          label: label,
          type: "final",
          amount: amount
        }
      };

      // Create ApplePaySession
      const session = new ApplePaySession(3, request);

      session.onvalidatemerchant = async event => {
        // Call your own server to request a new merchant session.
        const merchantSession = await validateMerchant();
        session.completeMerchantValidation(merchantSession);
      };

      session.onpaymentmethodselected = event => {
        // No updates or errors are needed, pass an empty object.
        const update = {};
        session.completePaymentMethodSelection(update);
      };

      session.onshippingmethodselected = event => {
        // No updates or errors are needed, pass an empty object.
        const update = {};
        session.completeShippingMethodSelection(update);
      };

      session.onshippingcontactselected = event => {
        const update = {};
        session.completeShippingContactSelection(update);
      };

      session.onpaymentauthorized = event => {
        const result = {
          status: ApplePaySession.STATUS_SUCCESS
        };
        session.completePayment(result);
      };

      session.oncouponcodechanged = event => {
        const newTotal = calculateNewTotal(event.couponCode);
        const newLineItems = calculateNewLineItems(event.couponCode);
        const newShippingMethods = calculateNewShippingMethods(event.couponCode);
        const errors = calculateErrors(event.couponCode);

        session.completeCouponCodeChange({
          newTotal: newTotal,
          newLineItems: newLineItems,
          newShippingMethods: newShippingMethods,
          errors: errors,
        });
      };

      session.oncancel = event => {
        // Payment canceled by WebKit
      };

      session.begin();
    }


})();
