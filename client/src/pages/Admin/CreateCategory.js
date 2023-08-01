import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import CategoryForm from '../../components/Form/CategoryForm'

//model use for pop up form after edit button click using 
import { Modal } from "antd";


const CreateCategory = () => {
    const [category, setcategory] = useState([])
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");


    // handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", {
                name,
            });
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllcategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error("somthing went wrong in input form");
        }
    };


    const getAllcategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data.success) {
                setcategory(data.category);
            }

        } catch (error) {
            console.log(error)
            toast.error('something went wrong in getting category');

        }

    }

    useEffect(() => {
        //get all data in intial
        getAllcategory();
    }, [])

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllcategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //delete category
    const handleDelete = async (pId) => {

        try {
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${pId}`
            );
            if (data.success) {
                toast.success(`category is deleted`);

                getAllcategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };


    return (
        <Layout title={'dashboard-craete category'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {category.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2' onClick={() => {
                                                        setVisible(true);
                                                        setUpdatedName(c.name);
                                                        setSelected(c);

                                                    }}>Edit </button>
                                                    <button className='btn btn-danger ms-2' onClick={() => {
                                                        handleDelete(c._id);
                                                    }}>Delete </button>
                                                </td>
                                            </tr>
                                        </>

                                    ))}


                                </tbody>
                            </table>

                        </div>
                        {/* if set visible is true than model will pop pup */}
                        <Modal oonCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible} >
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default CreateCategory;
