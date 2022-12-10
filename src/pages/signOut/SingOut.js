import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AtuthContext"

const SignOut = () => {
    const { signOut } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        signOut()
        setTimeout(() => {
            navigate('/singin')
        }, 2000)
    }, [])
    return (
        <div >
            <h3>
                Looking forward to seeing you soon
            </h3>
            <p>Redirecting ...</p>
        </div>
    )
}

export default SignOut