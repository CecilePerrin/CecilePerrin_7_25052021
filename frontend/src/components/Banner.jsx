import logoWhite from '../assets/icon-left-font-monochrome-white.png'
import imgAcc from '../assets/image_accueil.png'
import logo from '../assets/logo.png';
import monsieur from '../assets/Monsieur.png'
import "../styles/banner.css"

function Banner() {
    return (
        <div className='grpomania-banner'>
            <div className="hero-elem-deco" role="banner"></div>
            <img src={logo} alt="groupomania" className='logoBlack' />
            <img src={logoWhite} alt="groupomania" className='logoWhite' />
            <img src={imgAcc} alt ="groupomania" className='imgAcc img-fluid'/>
            <img src={monsieur} alt ="groupomania" className='monsieur img-fluid'/>
        </div>
    )
}

export default Banner