import { Button } from "../ui/Button"
import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import { useNavigate} from "react-router-dom"


export default function Landing() {
    const navigate = useNavigate();
    async function handleClick() {
        navigate('/signup');
    }
    return <>
        <div className="min-h-screen text-[#151515] bg-custom-white flex flex-col">
      <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-black/70">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to='/blogs'>
                <img src={Logo} alt={Logo} className='w-14' />
            </Link>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-black hover:text-[#A91D3A]">Our story</a>
            <a href="#" className="text-black hover:text-[#A91D3A]">Membership</a>
            <a href="/create" className="text-black hover:text-[#A91D3A]">Write</a>
            <a href="#" className="text-black hover:text-[#A91D3A]">Sign in</a>
          </nav>
          <Button handleClick={handleClick} color="peach" type="button" size='small'>
            Get started
          </Button>
        </div>
      </header>

      <main className="flex-grow flex items-center ml-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-black">
              Unleash Your Creativity
            </h1>
            <p className="text-xl mb-8 text-black">
              A place to write, read, and inspire. Let your ideas flow like ink on paper.
            </p>
            <Button color="peach" type="button" size='small' handleClick={async ()=> navigate('/create')}>
              Start writing
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/landingphoto-ClTJ4YhXILBI7sMzm5vblv7qHfiJjf.png" 
              alt="Stylized fountain pen nib creating a flowing line" 
              className="max-w-full h-auto max-h-[500px] object-contain"
            />
          </div>
        </div>
      </main>

      <footer className="bg-[#151515] text-custom-white py-2 border-t border-black/20">   
          <div className="mt-8 text-center text-sm text-custom-white/60">
            © 2024 @zicor.inc. All rights reserved.
          </div>
      </footer>
    </div>
    </>
}