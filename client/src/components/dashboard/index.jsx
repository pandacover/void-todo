import { useContext, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemContext from "../../context";
import { useDispatch, useSelector } from 'react-redux'
import { getList, reset, deleteList } from '../../redux/features/list/listSlice'
import Header from "../helmet";
import { RiEditCircleFill } from 'react-icons/ri'
import { MdDeleteOutline } from 'react-icons/md'
import Loader from '../loader'

const DashNav = ({ name }) => (
    <div className='container mx-auto mt-8 flex justify-between items-center'>
        <p className='text-3xl font-semibold'>Welcome <span className='text-blue-500'>{name}</span></p>
        <div>
            <Link to='/create' className='flex items-center justify-center text-sm font-semibold px-3 py-1 border-2 border-blue-400 text-blue-400 rounded-3xl hover:bg-blue-400 hover:text-white transition-all'>New Task</Link>
        </div>
    </div>
)

const List = ({ item, dispatch }) => {
    const { setClickedItem } = useContext(ItemContext);

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(deleteList(item._id))
        window.location.reload()
    }

    return (
        <div
            className='flex items-center justify-between px-2 h-10 shadow-sm shadow-gray-300 dark:shadow-xs dark:shadow-gray-700 dark:bg-gray-800'
            onClick={() => setClickedItem(item)}
        >
            <p>
                <span>{item.text}</span>
            </p>
            <div className='flex gap-4'>
                <Link to={`/edit/${item._id}`} className='text-blue-400 hover:text-blue-500 transition-all'><RiEditCircleFill /></Link>
                <button onClick={handleClick} className='text-red-400 hover:text-red-500 transition-all'><MdDeleteOutline /></button>
            </div>
        </div>
    )
}


const Details = () => {
    const { clickedItem } = useContext(ItemContext)
    return (
        <div className='h-96 flex-1'>
            <p className='text-center font-semibold py-2'>
                <span>{clickedItem ? clickedItem.text : 'Title'}</span>
            </p>
            <hr />
            <div className='flex flex-col p-2 h-full'>
                <div className='flex-[2]'>
                    <h4 className='font-semibold text-sm text-gray-400'>Description</h4>
                    <p className='text-sm'>
                        <span>{clickedItem && clickedItem.description}</span>
                    </p>
                </div>
                <div className='flex-1'>
                    <h4 className='font-semibold text-sm text-gray-400'>Status</h4>
                    <p className='text-sm'>
                        <span>{clickedItem && clickedItem.status}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}


const Dashboard = () => {
    const { user } = useSelector(state => state.auth)
    const { lists, isError, isLoading, message } = useSelector(state => state.list)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const callback = useCallback(() => {
        if (isError) console.error(message)
        if (!user) navigate('/signin')

        dispatch(getList())
        return () => {
            dispatch(reset())
        }

    }, [user, isError, message, dispatch, navigate])

    useEffect(() => { callback() }, [callback])

    if (isLoading) return <Loader />

    return (
        <>
            <Header title='Dashboard' description='Check out all your tasks and operate on them using edit and delete option of void todo.' />
            <DashNav name={user?.name} />
            <div className='container mx-auto pt-16 flex gap-4'>
                <ul className='flex-[3]'>
                    {lists.map(item => (
                        <List key={item._id} item={item} dispatch={dispatch} />
                    ))}
                </ul>
                <Details />
            </div>
        </>
    )
}

export default Dashboard;