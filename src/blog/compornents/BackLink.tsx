import { useRouter } from 'next/router'
const BackLink = () => {
    const router = useRouter()
    return (
        <>
            <hr />
            <a href="#" onClick={() => router.back()}>Back to prev page</a>
        </>
    )
}
export default BackLink