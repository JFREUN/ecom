'use client'
import { Container } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const UploadComponent = () => {
    const defaultProduct = {
        name: '',
        description: '',
        price: 0,
        rating: 0,
        imageUrl: ''
    };
    const router = useRouter();
    const [product, setProduct] = useState(defaultProduct);

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post("/api/service", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response)
            if (response.status === 200) {
                setProduct({ ...product, imageUrl: response.data.fileUrl });
            }
        } catch (error) {
            console.log("Error while uploading the file: ", error);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/products", product);
            if (res.status === 200) {
                console.log("Product created");
                router.push("/");
            }
        } catch (error) {
            console.error("Product creation failed:", error);
        }
    };

    return (
        <Container maxWidth="xl" fixed sx={{ py: "4rem", px: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    />
                    <label>Price:</label>
                    <input
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })}
                    />
                    <label>Image File:</label>
                    <input
                        type="file"
                        onChange={handleFileUpload}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </Container>
    );
};

export default UploadComponent;
