import { useDispatch } from 'react-redux'
import { updateList } from '../../redux/features/list/listSlice'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemContext from '../../context'
import Header from '../helmet'

const Edit = () => {
    const { clickedItem } = useContext(ItemContext)
    const [update, setUpdate] = useState({
        text: clickedItem.text,
        description: clickedItem.description
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currLength, setCurrLength] = useState(clickedItem.description.length);


    const onSubmit = (e) => {
        e.preventDefault()
        const data = { ...update, _id: clickedItem._id }
        dispatch(updateList(data))

        navigate('/')
        window.location.reload('/')
    }

    const textAreaChange = e => {
        e.preventDefault()
        setCurrLength(e.currentTarget.value.length)
        setUpdate({ ...update, description: e.target.value })
    }

    return (
        <>
            <Header title='Edit' description='Edit your task with ease using the update option of void todo' />
            <form className='container mx-auto flex gap-4 mt-16' onSubmit={onSubmit}>
                <div className='w-11/12 flex flex-col'>
                    <input
                        type="text"
                        className='w-full p-2 outline-none shadow-md shadow-gray-300 text-sm dark:shadow-none focus-within:bg-gray-100 dark:bg-gray-700 dark:focus-within:bg-gray-800 transition-all'
                        placeholder='Add Task'
                        value={update.text}
                        onChange={e => setUpdate({ ...update, text: e.target.value })}
                        required
                    />
                    <br />
                    <textarea
                        placeholder='Description'
                        className='outline-none p-2 focus-within:bg-gray-100 dark:bg-gray-700 dark:focus-within:bg-gray-800 transition-all resize-none'
                        value={update.description}
                        rows='4'
                        cols='50'
                        maxLength='250'
                        onChange={textAreaChange}
                    />
                </div>
                <div>
                    <button
                        type='submit'
                        className='px-6 py-2 bg-blue-400 text-white text-sm uppercase font-semibold rounded-3xl hover:scale-105 transition-all'
                    >Update</button>
                </div>
            </form>
            <br />
            <p className='text-center text-sm font-bold'>
                <span className={`${currLength <= 100 ? 'text-green-500' : ''} ${(currLength > 100 && currLength < 250) ? 'text-yellow-500' : ''} ${currLength >= 250 ? 'text-red-500' : ''} `}>{currLength}</span> / 250
            </p>
        </>
    )
}

export default Edit;