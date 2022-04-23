import Navbar from "./components/navbar";
import { Register, Login } from './components/authentication'
import { Routes, Route, Link } from 'react-router-dom'
import { lazy, Suspense, useState, useContext } from 'react'
import Loader from './components/loader'
import Create from './components/create'
import ItemContext from "./context";


const Home = lazy(() => import('./components/dashboard'))
const Update = lazy(() => import('./components/edit'))

const NotFound = () => (
    <div className='container absolute top-0 left-0 mx-auto flex flex-col justify-center items-center w-full h-screen'>
        <div className='text-4xl font-bold'>
            <span className='text-gray-400'>404 </span>
            <span className='text-red-500'>The page is missing</span>
            <p className='text-xs text-center pt-1'>The page you are looking for does not exist.</p>
        </div>
        <br />
        <br />
        <p className='text-xl font-semibold'>Try these links instead?</p>
        <div className='flex justify-center gap-6 pt-2'>
            <Link to='/' className='text-sm font-semibold hover:text-blue-500 text-gray-400 transition-all'>Home</Link>
            <Link to='/create' className='text-sm font-semibold hover:text-blue-500 text-gray-400 transition-all'>Create a task</Link>

        </div>
        <br />
    </div>
)

const Layout = () => {
    const { clickedItem } = useContext(ItemContext)
    return (
        <div className='dark:bg-gray-900 dark:text-white h-screen'>
            <Navbar />
            <Routes>
                <Route path='/' element={
                    <Suspense fallback={<Loader />}>
                        <Home />
                    </Suspense>
                } />
                <Route path={`/edit/${clickedItem?._id}`} element={
                    <Suspense fallback={<Loader />}>
                        <Update />
                    </Suspense>
                } />
                <Route path='/create' element={<Create />} />
                <Route path='/signup' element={<Register />} />
                <Route path='/signin' element={<Login />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    )
}

const App = () => {
    const [clickedItem, setClickedItem] = useState(null)
    return (
        <ItemContext.Provider value={{ clickedItem, setClickedItem }}>
            <Layout />
        </ItemContext.Provider>
    )
}

export default App;