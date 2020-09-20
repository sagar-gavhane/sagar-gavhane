import React from 'react'
import pdfResume from './../../Resume.pdf'

const ResumePage = () => <iframe src={pdfResume} style={{width: '100vw', height: '100vh'}} frameBorder="0"/>

export default ResumePage;
