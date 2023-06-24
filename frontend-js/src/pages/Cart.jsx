import { useDispatch, useSelector } from 'react-redux';
import { calculateSubtotal, calculateTotalProducts } from '../helpers/utils';
import { clearCart, removeFromCart } from '../redux/cart';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { createOrderAsync } from '../redux/order';
import { updateQuantity } from '../redux/product';

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.user);
  const subtotal = calculateSubtotal(cartItems);
  const totalProducts = calculateTotalProducts(cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handlePaymentSuccess = (details, data) => {
    var shippingAddress = details.purchase_units[0].shipping.address;
    var orderID = details.purchase_units[0].custom_id;
    var email = auth.email;
    let user = auth.id;

    var postalCode = shippingAddress.postal_code;
    var countryCode = shippingAddress.country_code;

    var postData = {
      user_id: user,
      email: email,
      postalCode: postalCode,
      countryCode: countryCode,
      totalProduct: totalProducts,
      totalPrice: subtotal,
    };

    dispatch(createOrderAsync(postData)).then((data) => {
      console.log('createorder: ', data);
    });
    dispatch(updateQuantity(cartItems)).then((data) => {
      console.log('updatequantity: ', data);
    });
    dispatch(clearCart());
  };

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="relative overflow-x-auto mt-10">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 card text-center shadow-lg p-3 mb-5 bg-white rounded">
          <div className="text-center m-5">My Cart</div>
          <div className="overflow-x-auto mt-10">
            <table className="table-auto w-full text-sm text-left">
              <thead>
                <tr>
                  <th className="border border-gray-800 p-2">Name</th>
                  <th className="border border-gray-800 p-2">Quantity</th>
                  <th className="border border-gray-800 p-2">Price</th>
                  <th className="border border-gray-800 p-2">Total Price</th>
                  <th className="border border-gray-800 p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product_id}>
                    <td className="border border-gray-800 px-4 py-2">
                      {item.name}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {item.price}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {item.quantity * item.price}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      <button
                        onClick={() => handleRemoveFromCart(item.product_id)}
                        className="text-red-500"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <h2 className="text-center">SubTotal: Rp: {subtotal}</h2>
          <p className="text-center">Total Products: {totalProducts}</p>
          <hr />
          <div className="flex justify-center">
            <PayPalButton
              amount={subtotal}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: subtotal,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(function (details) {
                  handlePaymentSuccess(details, data);
                });
              }}
              options={{
                clientId:
                  'AWB0KnJcTsTgLbSZbr9VJTJx3Llrwy6e9DurXdi5Ir1VN2zIFvRq62hoVo9W54zi8Ghpob-D8VHDx-dz',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
