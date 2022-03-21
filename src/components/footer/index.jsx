import './styles.css';

function Footer (props) {
    
    return (
        <div className="footer">
            <button onClick={props.onClick}>
                <h3>Generate chart</h3>
            </button>
        </div>
    )
}

export default Footer;