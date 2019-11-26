import APP_ENV from '../env';

(function ($) {
  const handleGetAccess = async (public_token) => {
    const TOKEN = localStorage.getItem("webToken");
    const USERNAME = localStorage.getItem("username");
    // Post the values to the Login url
    const GETACCESS_URL = `${APP_ENV.backendUrl}/get_access_token?public_token=${public_token}`;
    const TRANSACTION_URL = `${APP_ENV.backendUrl}/transactions/${USERNAME}`;
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };

    const response = await fetch(GETACCESS_URL, options).then(async (response) => {
      const results = await response.json();
      console.log("Results", results);

      const opt = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
      await fetch(TRANSACTION_URL, opt).then(async (response) => {
        const results = await response.json();
        console.log("Transactions Response", results);
      });
    });
  }

  window.handler = Plaid.create({
    clientName: 'Plaid Quickstart',
    env: 'development',
    key: '408076128548bef334534e21b01171',
    product: ['transactions'],
    onSuccess: function (public_token, metadata) {
      console.log("public_token", public_token);
      handleGetAccess(public_token);
    }
  });

})(jQuery);