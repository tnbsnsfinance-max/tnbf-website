// Google Analytics 4 (GA4) Configuration
// ==========================================

(function() {
    // ⚠️ TODO: Replace 'G-XXXXXXXXXX' with your actual Measurement ID from Google Analytics
    // You can find this in Google Analytics -> Admin -> Data Streams
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

    // 1. Load the Google Analytics Script asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // 2. Initialize the Data Layer
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag; // Make gtag available globally for other scripts

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    console.log('Google Analytics Initialized with ID:', GA_MEASUREMENT_ID);
})();
