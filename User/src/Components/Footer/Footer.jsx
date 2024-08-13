import { FaRegCopyright } from "react-icons/fa";
import './Footer.css'
const Footer = () => {
  return (
    <>
      <div className="footer mt-2" >
        <div>
          <FaRegCopyright color="white" style={{ marginTop: "0.3rem", marginRight: "0.5rem" }} />
        </div>
        <div>
          <p className="text-white">Designed by Nidhi</p>
        </div>
      </div>
    </>
  )
}

export default Footer 