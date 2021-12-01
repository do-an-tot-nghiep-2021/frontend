import { useParams } from "react-router"
const FormCommentCheckorderSuccess = () => {
    const {id} = useParams();
    return (
        <div>
            hihi {id}
        </div>
    )
}

export default FormCommentCheckorderSuccess
