import React from 'react';
import './Footer.css';
import githubLogo from '../../pictures/github-mark.png';
import linkedInLogo from '../../pictures/LI-In-Bug.png';


export default function Footer() {
  return (
    <div className='footer-div'>
        <div className='footer-contact-me-div'>
            <b className='footer-contact-me'>Contact Me</b>
            <a href='https://github.com/OneBoatFly' className='footer-contact-me' target="_blank" rel="noopener noreferrer"><img src={githubLogo} alt='github' style={{ 'width': '18px' }} /></a>
            <a href='https://www.linkedin.com/in/yizhoucatherinezhang/' className='footer-contact-me' target="_blank" rel="noopener noreferrer"><img src={linkedInLogo} alt='github' style={{ 'width': '19px' }} /></a>
        </div>
        <span>Disclaimer: BnBAir is a clone of the website Airbnb created as a student project at App Academy. <b>This website does not perform any real transactions.</b></span>
    </div>
  )
}
