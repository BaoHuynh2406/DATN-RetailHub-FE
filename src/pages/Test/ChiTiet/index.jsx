import { useParams } from 'react-router-dom'

function ChiTiet() {
    const { id } = useParams()

    return (
        <>
               <h1>Đây là trang chi tiết</h1>
                <p>ID: {id}</p>
        </> 
 
     );
}

export default ChiTiet;