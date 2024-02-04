import Logo from "../../../assets/logo.png"
import { Link } from "react-router-dom";
import FormLayout from "../../../Components/common/FormLayout";
import EmailField from "../../../Components/common/EmailField";
import PasswordField from "../../../Components/common/PasswordField";
import SubmitButton from "../../../Components/common/SubmitButton";
import React from "react";
import logo from "../../../assets/bazar365_logo.png";
import { TEInput, TERipple } from "tw-elements-react";

function LoginView({ setEmail, setPassword, handleSignIn, message }) {
  return (
    // <div className="w-full h-screen flex flex-col justify-center items-center">
    // <FormLayout onSubmit={handleSignIn} message={message}>
    //   <div className="flex flex-col items-center mb-10">
    //     <img className="logo w-[150px] h-[68px]" src={Logo} alt="" />
    //     <h1 className="font-normal text-xl">Admin Login</h1>
    //   </div>
    //   <EmailField setEmail={setEmail} />
    //   <PasswordField setPassword={setPassword} label={'Password'} />
    //   <div className="flex items-center justify-between">
    //     <SubmitButton label="Sign In" />
    //     <Link className="inline-block align-baseline font-bold text-sm text-[#10823A] hover:text-gray-500" to="/forgetpassword">
    //       Forgot Password?
    //     </Link>
    //   </div>
    // </FormLayout>
    // </div>
    
    <section className="h-full bg-neutral-200 dark:bg-neutral-700 " style={{
      paddingRight: "250px",
     backgroundColor: "white",
      //   lement.style {
      //     background: linear-gradient(to right, rgb(67 168 68 / 85%), #008a00, rgb(27 111 19), #14562c);
      // }
    }}>
      <div className="container h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 pl-[250px] bg-white">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap flex">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12 w-[100%]">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-[90px] mt-6"
                        src={logo}
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                      Please login to your account
                      </h4>
                    </div>

                    <form onSubmit={handleSignIn} message={message}>
                      {/* <p className="mb-4">Please login to your account</p> */}
                      {/* <!--Username input--> */}
                      <EmailField setEmail={setEmail} label={'Email'}/>
                     <PasswordField setPassword={setPassword} label={'Password'} />

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded-3xl px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-1050 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            style={{
                              background:
                              
                                "linear-gradient(to right, rgb(67 168 68 / 85%), #008a00, rgb(27 111 19), #14562c)",

                                
                              //   lement.style {
                              //     background: linear-gradient(to right, rgb(67 168 68 / 85%), #008a00, rgb(27 111 19), #14562c);
                              // }
                            }}
                          >
                            Log in
                          </button>
                        </TERipple>

                        {/* <!--Forgot password link--> */}
                        <Link className="inline-block align-baseline font-bold text-sm text-[#10823A] hover:text-gray-500" to="/forgetpassword">
                        Forgot Password?
                        </Link>
                      </div>

                      {/* <!--Register button--> */}
                      {/* <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <TERipple rippleColor="light">
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            Register
                          </button>
                        </TERipple>
                      </div> */}
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, rgb(67 168 68 / 85%), #008a00, rgb(27 111 19), #14562c)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-bold">
                      We are more than just a company
                    </h4>
                    <p className="text-base">
                    Bazar365 is a pioneering sustainable online grocery shopping platform committed to tackling the global problem of plastic pollution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
 

export default LoginView;
