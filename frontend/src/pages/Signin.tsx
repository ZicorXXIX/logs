import Auth from "../components/Auth";

export default function Signin() {
  return <>
  <div className="bg-custom-white w-full h-screen flex items-center justify-center">
    <Auth type="login"/>
  </div>
  </>
}