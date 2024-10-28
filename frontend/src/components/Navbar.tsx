import Logo from '../assets/logo.png';
import { Button } from '../ui/Button';
import Avatar from '../ui/Avatar';
import { useState } from 'react';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../store/atoms/user';

export default function Navbar({publish , handlePublish }: {publish?: boolean, handlePublish?: ()=>Promise<void>}) {
    const user = useRecoilValue(userAtom)
    const [isVisible, setIsVisible] = useState(false)
    console.log(user)
  
    return <>
        <div className="flex justify-between px-10 py-4 border-b border-black/20">
            <Link to='/blogs'>
                <img src={Logo} alt={Logo} className='w-14' />
            </Link>
            <div className='flex items-center gap-12'>
                {publish ?
                <Button color="peach" type="button" size='small' handleClick={handlePublish}>Publish</Button> 
                :               
                <Link to='/create'>
                    <div className='flex gap-3 cursor-pointer text-black/70 hover:text-black'>
                        Write
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>
                </Link>
                }
                {user === undefined ? <Button color="peach" type="button" size='small'>Sign Up</Button> 
                :
                <>
                    <div onClick={()=> setIsVisible(!isVisible)} className='cursor-pointer'>
                        <Avatar name={user} size="large" />
                    </div>
                    <Dropdown user={user} isVisible={isVisible} />
                </>
                }
                
            </div>
        </div>
    </>
}