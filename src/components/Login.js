import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn, resetError } from '../actions/userActions';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email address.')
    .required('Must include email address.'),
  password: Yup.string()
    .min(6, 'password must be at least 6 characters long.')
    .required('password is required'),
});

function LoginForm(props) {
  const [member, setMember] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const validate = (e) => {
    // yup's reach method is for partial validation, only for the field being entered
    // this will create Promises (asynchronous)
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: '',
        });
      })
      .catch((err) => {
        console.log(err.errors);
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const handleChanges = (event) => {
    // when we use eventHandler in react(synthetic eventHander) in
    // asynchronous way, we need include e.persist()
    event.persist();
    validate(event);

    let value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    setMember({
      ...member,
      [event.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.logIn({
      email: member.email,
      password: member.password,
    });
    setMember({
      email: '',
      password: '',
    });
  };
  if (props.status) {
    setTimeout(() => {
      props.resetError();
    }, 5000);
  }
  if (props.isLogged) {
    history.push('/admin');
  }
  return (
    <div className="input">
      {props.status && (
        <u2 className="errors">{props.message}: Please try again.</u2>
      )}
      <form className="input-form" onSubmit={(e) => handleSubmit(e)}>
        <ul className="form-container">
          <li>
            <label htmlFor="email">email </label>
            <input
              id="email"
              type="text"
              name="email"
              value={member.email}
              onChange={(e) => handleChanges(e)}
              required
            />

            {errors.email.length ? (
              <p className="errors">{errors.email}</p>
            ) : null}
          </li>

          <li>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={member.password}
              onChange={(e) => handleChanges(e)}
              required
            />

            {errors.password.length ? (
              <p className="errors">{errors.password}</p>
            ) : null}
          </li>

          <li>
            <button type="submit" className="button primary">
              Submit
            </button>
          </li>
        </ul>
        <div className="asking-register">
          <p>NO ACCOUNT?</p>
          <Link to="/register">
            <p>REGISTER NOW.</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    status: state.user.error.status,
    message: state.user.error.message,
    isLogged: state.user.user.isLogged,
  };
};
export default connect(mapStateToProps, { logIn, resetError })(LoginForm);
