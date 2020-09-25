import chroma from 'chroma-js'
export default {
    colorBox:{
        width: '20%',
        height: props => (props.fullPalette)? '25%': '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-4.5px',
        '&:hover button':{
            opacity: 1
        }
    },
    copyText: {
         color: props => chroma(props.background).luminance() > 0.6 ? 'black':'white'
     },
    colorName: {
         color: props => chroma(props.background).luminance() <= 0.08 ? 'white':'black'
     },
    more: {
        color: props => chroma(props.background).luminance() > 0.6 ? 'black':'white', 
        position: 'absolute',
        right: '0px',
        bottom: '0px',
        background: 'rgba(255, 255, 255, 0.3)',
        outline: 'none',
        width: '60px',
        height: '30px',
        border: 'none',
        textAlign: 'center',
        lineHeight: '30px',
        textDecoration: 'none'
    },
    copyButton: {
        color: props => chroma(props.background).luminance() > 0.6 ? 'black':'white',
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        textAlign: 'center',
        border: 'none',
        textDecoration: 'none',
        opacity:0
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        letterSpacing: '1px',
        fontSize: '12px'
    },
    copyOverlay: {
        height: '100%',
        width: '100%',
        opacity: '0',
        zIndex: '0',
        transition: 'transform 0.6s ease-in',
        transform: 'scale(0.1)'
    },
    showOverlay:{
        opacity: '1',
        zIndex: '10',
        position: 'absolute',
        transform: 'scale(50)',
    },
    copyMessage: {
        opacity: '0',
        position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        transform: 'scale(0.1)',
        flexDirection: 'column',
        "& h1": {
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255, 255, 255, 0.2)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase"
          },
          "& p": {
            fontSize: "2rem",
            fontWeight: "100"
          }
    },
    showMessage:{
        opacity: '1',
        transform: 'scale(1)',
        zIndex: '25',
        transition: 'all 0.4s ease-in',
        transitionDelay: '0.3s'
    }
}