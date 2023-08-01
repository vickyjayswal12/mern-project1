import React from "react";
// import { useState } from "react";
// import axios from 'axios'
// import toast from 'react-hot-toast'

//in comment code is for create individual page which have own state and getAllcategory as a probs for refress createcategory page so that show updated category

const CategoryForm = ({ handleSubmit, value, setValue }) => {   //get probs getAllcategory function 
    // const [name, setName] = useState("");

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const { data } = await axios.post("/api/v1/category/create-category", {
    //             name,
    //         });
    //         if (data?.success) {
    //             toast.success(`${name} is created`);
    //             getAllcategory();
    //         } else {
    //             toast.error(data.message);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         // toast.error("somthing went wrong in input form");
    //     }
    // };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new category"
                        value={value}    //value as name
                        onChange={(e) => setValue(e.target.value)}   //set value as setname 
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default CategoryForm;
