
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        ProductName: "",
        Description: "",
        Price: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const Params = useParams();

    const APIURL = "https://6778fc1a482f42b62e901a35.mockapi.io/API/v4/products";

    useEffect(() => {
        if (Params.id) {
            getProductData();
        }
    }, [Params.id]);

    const getProductData = async () => {
        try {
            const result = await axios.get(`${APIURL}/${Params.id}`);
            if (result.status === 200) {
                setFormData(result.data);
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    const InputChanger = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.ProductName !== "" && formData.Description !== "" && formData.Price !== "") {
            try {
                if (Params.id) {
                    // Update existing product
                    const result = await axios.put(`${APIURL}/${Params.id}`, formData);
                    if (result.status === 200) {
                        navigate("/products"); // Navigate to product list after successful update
                    }
                } else {
                    // Create new product
                    const result = await axios.post(APIURL, formData);
                    if (result.status === 201) {
                        setFormData({
                            ProductName: "",
                            Description: "",
                            Price: ""
                        });
                        navigate("/products"); // Navigate to product list after successful creation
                    }
                }
                setError(""); // Clear any previous error
            } catch (error) {
                console.error("Error submitting form:", error);
                setError("An error occurred while submitting the form.");
            }
        } else {
            setError("Please fill all the fields!");
        }
    };

    return (
        <>
            <h2>{Params.id ? "Edit Product" : "Create Product"}</h2>
            <form onSubmit={handleSubmit}>
                {error && <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>}

                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        onChange={InputChanger}
                        name="ProductName"
                        value={formData.ProductName}
                        placeholder="Enter your product name"
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="Description"
                        onChange={InputChanger}
                        value={formData.Description}
                        placeholder="Enter your product descripton"
                    ></textarea>
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        onChange={InputChanger}
                        name="Price"
                        value={formData.Price}
                        placeholder="Enter your product price"
                    />
                </div>
                <div>
                    <input
                        className="submit_btn"
                        type="submit"
                        value="submit"
                    />
                </div>
            </form>
        </>
    );
};

export default CreatePost;