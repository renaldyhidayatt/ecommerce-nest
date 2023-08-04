import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  calculateSubtotal,
  calculateTotalProducts,
  calculateWeight,
} from '../helpers/utils';
import { fetchCartItems } from '../redux/cart';
import {
  calculateShippingCost,
  fetchCities,
  fetchProvinces,
} from '../redux/rajaongkir';
import MidtransPaymentButton from './test_midtrans';
import { myApi } from '../helpers/api';
import { createOrderAsync } from '../redux/order';

const CheckoutForm = () => {
  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [courier, setCourier] = useState('jne');
  const [shippingMethods, setShippingMethods] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('');
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const subtotal = calculateSubtotal(cartItems);
  const totalProducts = calculateTotalProducts(cartItems);
  const totalWeight = calculateWeight(cartItems);

  const { provinces, cities, shippingCosts } = useSelector(
    (state) => state.rajaOngkir
  );

  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);

  useEffect(() => {
    if (province) {
      dispatch(fetchCities(province));
    }
    console.log('city_state:', city);
  }, [province]);

  useEffect(() => {
    dispatch(fetchCartItems());
    console.log('courier', courier);
  }, []);

  const checkCost = () => {
    try {
      dispatch(
        calculateShippingCost({
          asal: city,
          tujuan: city,
          berat: 2,
          kurir: courier,
        })
      );
    } catch (error) {
      console.error('Error calculating shipping cost:', error);
    }
  };

  useEffect(() => {
    if (city && courier) {
      checkCost();
    }
  }, [city, courier]);

  useEffect(() => {
    if (shippingCosts.length > 0) {
      setShippingMethods(shippingCosts[0].costs);
      setShippingCost(shippingCosts[0].costs[0].cost[0].value);
    }
  }, [shippingCosts]);

  const handleOrder = async () => {
    try {
      const formData = {
        nama: recipientName,
        phone: phoneNumber,
        provinci: province,
        kota: city,
        alamat: addressDetail,
        kurir: courier,
        shippingMethod: shippingMethod,
        shippingCost,
        totalPrice: total,
        totalProduct: totalProducts,
      };
      dispatch(createOrderAsync(formData));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePayment = async () => {
    try {
      const formData = {
        gross_amount: total,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: phoneNumber,
      };

      const response = await myApi.post('midtrans/transaction', formData);
      const data = await response.data;

      if (data && data.token) {
        window.snap.pay(data.token, {
          onSuccess: (result) => {
            handleOrder();

            console.log('Payment success');
          },
          onPending: (result) => {
            console.log('Pending transaction', result);
          },
          onError: (result) => {
            console.log('Error transaction', result);
          },
          onClose: () => {
            console.log(
              'Customer close the popup window without finishing the payment'
            );
          },
        });
      } else {
        console.error('Snap Token is missing or invalid.');
      }
    } catch (error) {
      console.error('Error fetching Snap Token:', error);
    }
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const handleAddressName = (event) => {
    setAddressDetail(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCourierChange = (event) => {
    setCourier(event.target.value);
  };

  const handleRecipentName = (event) => {
    setRecipientName(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleShippingMethodChange = (event) => {
    const selectedShippingMethod = event.target.value;
    const selectedCost = shippingMethods.find(
      (method) => method.service === selectedShippingMethod
    );

    if (selectedCost) {
      setShippingCost(selectedCost.cost[0].value);

      setShippingMethod(
        `${selectedCost.service} Rp. ${selectedCost.cost[0].value} Estimasi ${selectedCost.cost[0].etd}`
      );
    }
  };

  useEffect(() => {
    setTotal(subtotal + shippingCost);
  }, [shippingCost]);

  return (
    <section className="max-w-screen-xl mx-auto mt-10">
      <div className="container mx-auto px-4- py-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={recipientName}
                onChange={handleRecipentName}
                className="form-input w-full mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block font-medium">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phoneNumber}
                onChange={handlePhoneNumber}
                className="form-input w-full mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="provinsi" className="block font-medium">
                Provinsi
              </label>
              <select
                name="province_id"
                id="province_id"
                className="select-2"
                value={province}
                onChange={handleProvinceChange}
                required
              >
                <option value="" selected disabled>
                  -- Select Province --
                </option>
                {provinces.map((province) => (
                  <option
                    key={province.province_id}
                    value={province.province_id}
                  >
                    {province.province}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block font-medium">
                City
              </label>
              <select
                name="city_id"
                id="city_id"
                className="select-2"
                value={city}
                onChange={handleCityChange}
                disabled={!cities.length}
                required
              >
                <option value="" selected disabled>
                  -- Select City --
                </option>
                {cities.map((c) => (
                  <option key={c.city_id} value={c.city_id}>
                    {c.type} {c.city_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block font-medium">
                Address
              </label>
              <textarea
                value={addressDetail}
                onChange={handleAddressName}
                id="address"
                name="address"
                className="form-textarea w-full mt-1"
                defaultValue={''}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="courier" className="block font-medium">
                Courier
              </label>
              <select onChange={handleCourierChange} value={courier}>
                <option value="jne" selected>
                  JNE
                </option>
                <option value="tiki">TIKI</option>
                <option value="pos">POS INDONESIA</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="shipmentMethod" className="block font-medium">
                Shipment Method
              </label>
              <select
                onChange={handleShippingMethodChange}
                value={shippingMethods[0]?.service}
              >
                {shippingMethods.map((method) => (
                  <option key={method.service} value={method.service}>
                    {method.service} Rp. {method.cost[0].value} Estimasi{' '}
                    {method.cost[0].etd}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
            <ul className="mb-4">
              {cartItems.map((item) => (
                <li key={item.product_id}>
                  {item.name} x {item.quantity}{' '}
                  <span>RP {item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <label className="block font-medium">Total Weight</label>
              <p>{totalWeight}</p>
            </div>
            <div className="mb-4">
              <label className="block font-medium">Subtotal</label>
              <p>{subtotal}</p>
            </div>
            <div className="mb-4">
              <label className="block font-medium">Shipping Cost</label>
              <p>{shippingCost}</p>
            </div>
            <div className="mb-4">
              <label className="block font-medium">Total</label>
              <p>{total}</p>
            </div>
            <MidtransPaymentButton handlePayment={handlePayment} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
