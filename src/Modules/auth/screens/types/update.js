import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { showtype, updatetype } from "../../../../Api/types";
import useUpload from '../../../../hooks/upload/useUpload';

const UpdateTypesScreen = () => {

    const history = useHistory();
    let { id } = useParams();
    console.log(id, 'haha')
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState('');

    const { loading, handleUpload } = useUpload();

    const handleInputUploadChange = async (e) => {
        const file = e.target.files.length > 0 ? e.target.files[0] : null;

        if (file === null) {
            setPreview('');
            return;
        }

        const url = await handleUpload(file);

        setPreview(url);
    };

    const renderPreview = () => {
        if (loading) {
            return (
                <div className="form-group mb-2">
                    <ClipLoader color="#000000" size={35} />
                </div>
            )
        }

        if (preview !== '') {
            return (
                <div className="form-group mb-2">
                    <img
                        width="120"
                        src={preview} className="mt-2 rounded"
                    />
                </div>
            );
        }

        return null;
    }

    const onSubmit = async (data) => {
        try {

            if (preview) {
                data.image = preview;
            }

            await updatetype(data);

            history.push('/admin/types');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async () => {
        const respons = await showtype(id);
        console.log(respons.data)
        const category = respons.data;
        console.log(category)

        if (category.image) {
            setPreview(category.image);
        }

        reset(category);
    }, [id]);

    return (
        <div>
            <h4>Update product</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-2">
                    <input type="text"
                        name="name"
                        className="form-control"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span className="text-danger">This field is required</span>}
                </div>
            
              
                <button type="submit" className="btn btn-primary mt-2">update</button>
            </form>
        </div>
    )
}

export default UpdateTypesScreen
