import "./css/stylesheet.css"
import "./css/bootstrap.min.css"

const AccountLayout = (props) => {
    return (
        <div className="body-account">
           {props.children} 
        </div>
    )
}

export default AccountLayout
