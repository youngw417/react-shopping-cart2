import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
export default function ShippingAddressScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [state, setState] = useState(shippingAddress.state);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        state,
        country,
      })
    );
    props.history.push('/payment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="input-form" onSubmit={submitHandler}>
        <ul className="form-container shipping-form">
          <li>
            <h1>Shipping Address</h1>
          </li>
          <li>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </li>
          <li>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Enter the address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </li>
          <li>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="Enter the city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </li>
          <li>
            <label htmlFor="potalCode">Zip Code</label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter your Zip code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </li>
          <li>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              placeholder="Enter the State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </li>
          <li>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Enter the country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </li>
          <li>
            <label />
            <button className="button primary" type="submit">
              Continue
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
