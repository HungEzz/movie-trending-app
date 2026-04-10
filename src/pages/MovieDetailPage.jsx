import { useParams } from 'react-router-dom';

const MovieDetailPage = () => {
   const { id } = useParams(); 
  return (
    <h1>Đây là chi tiết của sản phẩm mã số: {id}</h1>
  )
}

export default MovieDetailPage