import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 const Products = () =>{


const[post,setPost]=useState([]);
const[loading,setLoading]=useState(false);
const[error,setError]=useState("");
const[count,setCount]=useState(0);
console.log(count);


const APIURL = "https://6778fc1a482f42b62e901a35.mockapi.io/API/v4/products"

const getPostData = async () => {
    setLoading(true)
    try {
        const res = await axios.get(APIURL);
        if (res.status === 200) {   
            setLoading(false)
            setError("");
           
            setPost(res.data)
            console.log("API Response:", res.data);

    
        }
        
    } catch (error) {
        setError("Something went wrong");
        console.error(error);
        setLoading(false)

    }
}



useEffect(()=>{
    getPostData();
},[])


const handleDeletePost = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this post?");
    if (isConfirmed) {
        try {
            const res = await axios.delete(`${APIURL}/${id}`);
            console.log(res);
            if (res.status === 200) {
                getPostData();
            }
        } catch (error) {
            console.error("Error deleting the post:", error);
            alert("Failed to delete the post. Please try again.");
        }
    } else {
        console.log("Deletion canceled by user.");
    }
};




if (loading) {
    return(
    <><h2>Loading....</h2></>
    )
}






    return(
        <>
        <h1>OUR PRODUCTS</h1>
        <Link className="add_btn" to="/create-post">Add Product</Link>

        {error && (
            <h2>{error}</h2>
        )}
        {
            post && post.length > 0 && (
                <table border={1}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Product Name</th>
                    <th>description</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {
                        post && post.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.ProductName}</td>
                                    <td>{item.Description}</td>
                                    <td>{item.Price}</td>
                                    <td className="act">
                                        <Link className="action_btn" to={`/create-post/${item.id}`}>Edit</Link>
                                        <button className="action_btn"onClick={()=>handleDeletePost(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            )
        }
      
        </>
    )
}

export default Products;