import React, { useState } from 'react';

// export default function Login() {
//   const initialState = {
//     first: '',
//     last: '',
//     email: '',
//     password: '',
//   };
//   const [login, setLogin] = useState(initialState);
//   return <div>This is Loig-in Form</div>;
// }

import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  firstname: Yup.string().required('name is Required'),
  lastname: Yup.string().required('name is Required'),
  email: Yup.string()
    .email('Must be a valid email address.')
    .required('Must include email address.'),
  password: Yup.string()
    .min(6, 'password must be at least 6 characters long.')
    .required('password is required'),
  // passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('required'),
  passwordConfirm: Yup.string(),
});

function RegisterForm(props) {
  const [member, setMember] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

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
    if (member.password === member.passwordConfirm) {
      //   props.addMember({
      //     id: Date.now(),
      //     name: member.name,
      //     email: member.email,
      //     role: member.role,
      //   });
      setMember({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: '',
      });
    }
  };

  return (
    <div className="input">
      <form className="input-form" onSubmit={(e) => handleSubmit(e)}>
        <ul className="form-container">
          <li>
            <label htmlFor="firstname">Frist Name </label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              value={member.firstname}
              onChange={(e) => handleChanges(e)}
              required
            />

            {errors.firstname.length ? (
              <p className="errors">{errors.firstname}</p>
            ) : null}
          </li>
          <li>
            <label>Last Name</label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              value={member.lastname}
              onChange={(e) => handleChanges(e)}
              required
            />

            {errors.lastname.length ? (
              <p className="errors">{errors.lastname}</p>
            ) : null}
          </li>

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
            <label htmlFor="passwordConfirm">Password Confirm</label>
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              value={member.passwordConfirm}
              onChange={(e) => handleChanges(e)}
              required
            />

            {member.password !== member.passwordConfirm ? (
              <p className="errors">Password does not match</p>
            ) : null}
          </li>

          <li>
            <button type="submit" className="button primary">
              Submit
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterForm;
