import { useRef, useEffect, useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register, login, reset } from '../../redux/features/auth/authSlice'
import Loader from '../loader'
import Header from '../helmet'

const seeds = ['sad', 'happy', 'bored', 'sleepy', 'active', 'playful', 'angry', 'polite', 'smile', 'bruh', 'alpha', 'female', 'rip', 'facade']

export const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passRef = useRef(null)
    const [sprite, setSprite] = useState('')

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

    const Random = (max) => Math.floor(Math.random() * max);


    const callback = useCallback(() => {
        if (isError) console.error(message)
        if (isSuccess || user) navigate('/')

        return () => {
            dispatch(reset())
        }
    }, [user, isSuccess, isError, message, dispatch, navigate])

    useEffect(() => { callback() }, [callback])

    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value,
            sprite: sprite
        }

        dispatch(register(data))
    }

    const getSprite = e => {
        e.preventDefault()
        const spriteKey = e.target.innerText
        setSprite(`https://avatars.dicebear.com/api/${spriteKey}/${seeds[Random(seeds.length)]}.svg`)
        document.querySelectorAll('.sprite-btn').forEach(btn => {
            if ((btn.innerText === spriteKey)) btn.classList.add('active-sprite-btn')
            else btn.classList.remove('active-sprite-btn')
        })
    }

    console.log(sprite)

    if (isLoading) return <Loader />
    return (
        <>
            <Header title='Signup' description='Signup to void todo and enjoy a free todo list dashboard with add, edit and delete options!' />
            <form className='container mx-auto mt-[10vh] flex flex-col gap-8 items-center' onSubmit={onSubmit}>
                <p className='font-bold text-3xl mb-8'>Create an account</p>
                {isError === true ? <p className='text-center mt-2 font-medium text-red-500'>{message}</p> : ""}
                <label htmlFor="email" className='w-3/12 font-bold text-xs uppercase mb-2'>
                    <p>Email</p>
                    <input ref={emailRef} type="email" name='email' className='dark:shadow-none dark:text-black dark:focus-within:text-white shadow-md shadow-gray-300 w-full p-2 outline-none transition-all focus-within:bg-blue-500 text-white' required />
                </label>
                <label htmlFor="name" className='w-3/12 font-bold text-xs uppercase mb-2'>
                    <p>Name</p>
                    <input ref={nameRef} type="text" name='name' className='dark:shadow-none dark:text-black dark:focus-within:text-white shadow-md shadow-gray-300 w-full p-2 outline-none transition-all focus-within:bg-blue-500 text-white' required />
                </label>
                <label htmlFor="password" className='w-3/12 font-bold text-xs uppercase mb-2'>
                    <p>Password</p>
                    <input ref={passRef} type="password" name='password' className='dark:shadow-none dark:text-black dark:focus-within:text-white shadow-md shadow-gray-300 w-full p-2 outline-none transition-all focus-within:bg-blue-500 text-white' required />
                </label>
                <div className='flex gap-6'>
                    <button className='px-4 py-2 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-all rounded-3xl sprite-btn' onClick={getSprite}>
                        male
                    </button>
                    <button className='px-4 py-2 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-all rounded-3xl sprite-btn' onClick={getSprite}>
                        female
                    </button>
                    <button className='px-4 py-2 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-all rounded-3xl sprite-btn' onClick={getSprite}>
                        human
                    </button>
                </div>
                <p className='text-sm font-semibold'>
                    <span>Already have an account?</span> <Link to='/signin' className='text-blue-500'>Login</Link>
                </p>
                <button type='submit' className='border-[1px] border-blue-500 px-10 py-2 rounded-3xl font-semibold transition-all text-blue-500 hover:bg-blue-500 hover:text-white'>
                    <span>Sign Up</span>
                </button>
            </form>
        </>
    )
}

export const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const emailRef = useRef(null)
    const passRef = useRef(null)

    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

    const callback = useCallback(() => {
        if (isError) console.error(message)
        if (isSuccess || user) navigate('/')

        return () => {
            dispatch(reset())
        }
    }, [user, isSuccess, isError, message, dispatch, navigate])

    useEffect(() => { callback() }, [callback])

    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: emailRef.current.value,
            password: passRef.current.value,
        }

        dispatch(login(data))
    }

    if (isLoading) return <Loader />

    return (
        <>
            <Header title='Signin' description='Signin to void todo and keep enjoying your free todo list dashboard with add, edit and delete options!' />
            <form className='container mx-auto mt-[10vh] flex flex-col gap-8 items-center' onSubmit={onSubmit}>
                <p className='font-bold text-3xl mb-8'>Welcome Back</p>
                {isError === true ? <p className='text-center mt-2 font-medium text-red-500'>{message}</p> : ""}
                <label htmlFor="email" className='w-3/12 font-bold text-xs uppercase mb-2'>
                    <p>Email</p>
                    <input ref={emailRef} type="email" name='email' className='dark:shadow-none dark:text-black dark:focus-within:text-white shadow-md shadow-gray-300 w-full p-2 outline-none transition-all focus-within:bg-blue-500 text-white' required />
                </label>
                <label htmlFor="password" className='w-3/12 font-bold text-xs uppercase mb-2'>
                    <p>Password</p>
                    <input ref={passRef} type="password" name='password' className='dark:shadow-none dark:text-black dark:focus-within:text-white shadow-md shadow-gray-300 w-full p-2 outline-none transition-all focus-within:bg-blue-500 text-white' required />
                </label>
                <p className='text-sm font-semibold'>
                    <span>Need an account?</span> <Link to='/signup' className='text-blue-500'>Register</Link>
                </p>

                <button type='submit' className='border-[1px] border-blue-500 px-10 py-2 rounded-3xl font-semibold transition-all text-blue-500 hover:bg-blue-500 hover:text-white '>
                    <span>Sign In</span>
                </button>
            </form>
        </>
    )
}

export default Login