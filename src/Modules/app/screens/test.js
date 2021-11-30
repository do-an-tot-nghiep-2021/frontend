import { useParams } from "react-router"
const TestId = () => {
    const {id} = useParams();
    console.log(id,'hihi')
    return (
        <div>
            test
        </div>
    )
}

export default TestId
