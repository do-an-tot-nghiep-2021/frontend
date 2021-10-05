import { useHistory } from 'react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { create } from "../../../../Api/category";
import ClipLoader from "react-spinners/ClipLoader";
import useUpload from '../../../../hooks/upload/useUpload';

const CreateFormScreen = () => {

    const history = useHistory();
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

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = async (data) => {
        try {

            if (preview) {
                data.image = preview;
            }
            await create(data);
            history.push('/admin/categories');
        } catch (error) {
            console.log(error)
        }
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
                        src={preview} className="mt-2 mb-5 rounded"
                    />
                </div>
            );
        }

        return null;
    }

    return (
        <div>
            <h4>Create product</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        {...register("name", { required: true })}
                    />
                    {errors.name && (
                        <span className="d-block text-danger mt-3">
                            This field is required
                        </span>
                    )}
                </div>
                <div className="mb-3">
                    <div className="custom-file">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="image"
                            accept="image/*"
                            onChange={handleInputUploadChange}
                        />
                        <label
                            className="custom-file-label"
                            htmlFor="image"
                        >
                            Choose image
                        </label>
                        {renderPreview()}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-5">create</button>
            </form>
        </div>
    )
}

export default CreateFormScreen
