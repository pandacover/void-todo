import { useDispatch } from 'react-redux'
import { createList } from '../../redux/features/list/listSlice'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../helmet'

const Create = () => {
    const taskRef = useRef(null)
    const descRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currLength, setCurrLength] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            text: taskRef.current.value,
            description: descRef.current.value || ""
        }
        dispatch(createList(data))
        navigate('/')
    }

    return (
        <>
            <Header title='Create' description='Add a task to your todo list with Void List create option' />
            <form className='container mx-auto flex gap-4 mt-16' onSubmit={onSubmit}>
                <div className='w-11/12 flex flex-col'>
                    <input
                        type="text"
                        className='w-full p-2 outline-none shadow-md shadow-gray-300 text-sm dark:shadow-none focus-within:bg-gray-100 dark:bg-gray-700 dark:focus-within:bg-gray-800 transition-all'
                        placeholder='Add Task'
                        ref={taskRef}
                        required
                    />
                    <br />
                    <textarea
                        placeholder='Description'
                        className='outline-none p-2 focus-within:bg-gray-100 dark:bg-gray-700 dark:focus-within:bg-gray-800 transition-all resize-none'
                        ref={descRef}
                        rows='4'
                        cols='50'
                        maxLength='250'
                        onChange={e => setCurrLength(e.currentTarget.value.length)}
                    />
                </div>
                <div>
                    <button
                        type='submit'
                        className='px-6 py-2 bg-blue-400 text-white text-sm uppercase font-semibold rounded-3xl hover:scale-105 transition-all'
                    >Create</button>
                </div>
            </form>
            <br />
            <p className='text-center text-sm font-bold'>
                <span className={`${currLength <= 100 ? 'text-green-500' : ''} ${(currLength > 100 && currLength < 250) ? 'text-yellow-500' : ''} ${currLength >= 250 ? 'text-red-500' : ''} `}>{currLength}</span> / 250
            </p>
        </>
    )
}

export default Create;