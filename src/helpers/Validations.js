// eslint-disable-next-line no-unused-vars
import * as yup from "yup";
import { object, string } from "yup";

const alphaRegEx = /^[A-Za-z]+$/;
var usernameRegex = /^[a-zA-Z0-9.\-_$@*!]{3,30}$/;
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signUp: object({
    firstName: string("Please enter a valid first name.")
      .required("First name is required.")
      .test(
        "firstName",
        "Only alphabets are allowed.",
        (value) => !value || usernameRegex.test(value)
      )
      .trim(),
    userName: string("Please enter a valid first name.")
      .required("User Name is required.")
      .test(
        "firstName",
        "Only alphabets are allowed and Numric are allowed, no whitespace are allowed.",
        (value) => !value || alphaRegEx.test(value)
      )
      .trim(),
    lastName: string("Please enter a valid last name.")
      .required("Last name is required.")
      .test(
        "lastName",
        "Only alphabets are allowed.",
        (value) => !value || alphaRegEx.test(value)
      )
      .trim(),
    password: string("Please enter a valid password.")
      .required("Password is required")
      .trim()
      .test(
        "password",
        "Password length must me be minimum 8 characters.",
        (value) => {
          return !value || value.length >= 8;
        }
      )
      .test(
        "password",
        "Password length can not be more than 20 characters.",
        (value) => {
          return !value || value.length <= 20;
        }
      )
      .test("password", "At least 1 lowercase letter required.", (value) => {
        return !value || value.toUpperCase() !== value;
      })
      .test("password", "At least 1 uppercase letter required.", (value) => {
        return !value || value.toLowerCase() !== value;
      })
      .test("password", "At least 1 digit is required.", (value) => {
        return !value || /\d/.test(value);
      })
      .test(
        "password",
        "At least 1 special character is required.",
        (value) => {
          return !value || !/^[A-Za-z0-9 ]+$/.test(value);
        }
      ),
    confirmPassword: string("Please enter a valid password.")
      .required("Password is required")
      .test(
        "confirmPassword",
        "Confirm Password must match the password.",
        function (value) {
          return this.parent.password === value;
        }
      )
      .trim(),
  }),
  changePassword: object({
    password: string("Please enter a valid password.")
      .required("Password is required")
      .trim()
      .test(
        "password",
        "Password length must me be minimum 8 characters.",
        (value) => {
          return !value || value.length >= 8;
        }
      )
      .test(
        "password",
        "Password length can not be more than 20 characters.",
        (value) => {
          return !value || value.length <= 20;
        }
      )
      .test("password", "At least 1 lowercase letter required.", (value) => {
        return !value || value.toUpperCase() !== value;
      })
      .test("password", "At least 1 uppercase letter required.", (value) => {
        return !value || value.toLowerCase() !== value;
      })
      .test("password", "At least 1 digit is required.", (value) => {
        return !value || /\d/.test(value);
      })
      .test(
        "password",
        "At least 1 special character is required.",
        (value) => {
          return !value || !/^[A-Za-z0-9 ]+$/.test(value);
        }
      ),
  }),
};
