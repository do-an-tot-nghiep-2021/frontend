import { useParams } from "react-router"

const TestID = () => {
    const {test} = useParams();
    console.log(test)
    return (
        <div>
            hah
        </div>
    )
}

export default TestID
