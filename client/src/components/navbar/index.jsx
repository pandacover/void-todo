import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../redux/features/auth/authSlice'
import { useState, useEffect } from 'react'

const NavButtons = ({ sprite }) => {
    const [darkMode, setDarkMode] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const handleClick = (e) => {
        e.preventDefault()
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    useEffect(() => {
        if (window.localStorage.darkMode === undefined) return
        const isDarkMode = window.localStorage.darkMode
        if (isDarkMode === 'true') {
            document.querySelector('body').classList.add('dark')
        } else if (isDarkMode === 'false') {
            document.querySelector('body').classList.remove('dark')
        }
        setDarkMode(isDarkMode)
    }, [])

    const toggleDarkMode = (e) => {
        e.preventDefault()
        document.querySelector('body').classList.toggle('dark')
        window.localStorage.setItem('darkMode', !darkMode)
        setDarkMode(!darkMode)
    }

    return (
        <>
            <div>
                <button onClick={() => null}>
                    <img
                        src={sprite ? sprite : 'https://avatars.dicebear.com/api/big-smile/sad.svg'}
                        alt="Avatar"
                        className='w-10 h-10'
                    />
                </button>
            </div>
            <div>
                <button className='px-6 py-1 border-[1px] border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all' onClick={handleClick}>Logout</button>
            </div>
            <div>
                <button className={`w-[2.2rem] h-4 bg-gray-300 rounded-3xl px-1`} onClick={toggleDarkMode}>
                    <div className='w-3 h-3 rounded-full bg-white dark:bg-gray-600 transition-all' />
                </button>
            </div>
        </>
    )
}

const Navbar = () => {

    const { user } = useSelector(state => state.auth)

    return (
        <nav className='container mx-auto flex justify-between'>
            <p className='font-bold uppercase'>
                <Link to='/'>Void List</Link>
            </p>
            {
                user ?
                    (<div className='flex gap-8 items-center'>
                        <NavButtons sprite={user?.sprite} />
                    </div>) : ""
            }
        </nav>
    )
}

export default Navbar;