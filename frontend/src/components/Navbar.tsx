import Logo from '../assets/logo.png';
import { Button } from '../ui/Button';
export default function Navbar() {
    return <>
        <div className="flex justify-between px-10 py-4 border-b border-black/20">
            <img src={Logo} alt={Logo} className='w-14' />
            <div>
                <Button color="peach" type="button" size='small'>Sign Up</Button>
            </div>
        </div>
    </>
}