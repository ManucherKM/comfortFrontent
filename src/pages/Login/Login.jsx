import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { email, password } from "../../components/Validation/Validation.js"
import axios from "../../axios"
import Input from "../../components/Input/Input"
import Button from "../../components/UI/Button"
import Loading from "../../components/UI/Loading"

const Login = () => {
  const [bekVal, setBekVal] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false)

  const [valEmail, setValEmail] = useState("")
  const [еmailError, setEmailError] = useState(false);
  const newValEmail = (value) => {
    setValEmail(value)
  }

  const [valPassword, setValPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false);
  const newValPassword = (value) => {
    setValPassword(value)
  }

  const sendForm = async () => {
    setIsLoading(true)

    const isEmail = email(valEmail);
    const isPassword = password(valPassword);

    if (!isEmail || !isPassword) {
      if (!isEmail) {
        setEmailError(true)
        setIsLoading(false)
      } else {
        setEmailError(false)
        setIsLoading(false)
      }
      if (!isPassword) {
        setPasswordError(true)
        setIsLoading(false)
      } else {
        setPasswordError(false)
        setIsLoading(false)
      }
      return
    }

    const obj = {
      email: valEmail,
      password: valPassword,
    };

    try {
      const user = await axios.post("/login", obj)

      dispatch({ type: "auth", newUser: user.data.user });

      setIsLoading(false);
      setBekVal(false)
      navigate("/");
    } catch (e) {
      setBekVal(true)
      console.log(e);
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-[60vh]">
        {isLoading &&
          <div className='w-full h-[70vh] flex flex-col items-center justify-center loader-wrapper'>
            <Loading />
          </div>
        }
        {!isLoading && <form className="w-2/4 mx-auto mt-20 md:mt-10 sm:w-3/4" action="">
          <h2 className="text-3xl text-center mb-8">Авторизация</h2>
          <div>
            {еmailError && !bekVal && <p className="text-base text-red-600 mb-2">Некорректный email</p>}
            {bekVal && <p className="text-base text-red-600 mb-2">Некорректный email или пароль</p>}
            <Input Required={true} dopStyles={"mb-3 border rounded"} bgText={"Email"} className="" getVal={newValEmail} />
            {passwordError && !bekVal && <p className="text-base text-red-600 mb-2">Пароль слишком короткий</p>}
            {bekVal && <p className="text-base text-red-600 mb-2">Некорректный email или пароль</p>}
            <Input Required={true} dopStyles={"mb-8 border rounded"} bgText={"Пароль"} className="" getVal={newValPassword} />
            <Button Type={'submit'} dopStyles={"lg:w-full"} textButton={"Отправить"} click={sendForm} />
          </div>
        </form>}
      </div>
    </>
  )
}

export default Login