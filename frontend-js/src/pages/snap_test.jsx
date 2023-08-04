import React, { useEffect, useState } from 'react';
import { myApi } from '../helpers/api';

const SimpleSnapExample = () => {
  const CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

  const [snapToken, setSnapToken] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    script.dataset.clientKey = CLIENT_KEY;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [CLIENT_KEY]);

  useEffect(() => {
    const fetchSnapToken = async () => {
      try {
        const response = await myApi.get('midtrans/transaction');

        const data = await response.data;

        console.log('token', data.token);
        setSnapToken(data.token);
      } catch (error) {
        console.error('Error fetching Snap Token:', error);
      }
    };

    fetchSnapToken();
  }, []);

  const handleCheckout = () => {
    console.log('opening snap popup:');
    window.snap.pay(snapToken, {
      onSuccess: function (result) {
        console.log('SUCCESS', result);
        alert('Payment accepted \r\n' + JSON.stringify(result));
      },
      onPending: function (result) {
        console.log('Payment pending', result);
        alert('Payment pending \r\n' + JSON.stringify(result));
      },
      onError: function () {
        console.log('Payment error');
      },
    });
  };

  return (
    <div className="cart">
      <input type="hidden" id="snap_token" value={snapToken} />
      <div className="popup">
        <div className="row header">
          <span>Items</span>
          <span>Amount</span>
        </div>

        <div className="row items">
          <span>Sneaker x1</span>
          <span>200.000</span>
        </div>
        <div className="row checkout">
          <span>
            <a href="#"></a>
          </span>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleSnapExample;
