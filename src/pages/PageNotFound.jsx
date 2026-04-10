import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <main className="wrapper text-center">
            <h1 className="text-white">404 - Page Not Found</h1>
            <Link to="/" className="text-white text-2xl font-bold mt-4">Go Home</Link>
        </main>
    )
}

export default PageNotFound