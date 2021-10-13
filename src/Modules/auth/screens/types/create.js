import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createtype } from "../../../../Api/types";

const CreateToppingScreen = () => {
  const history = useHistory();
  const [preview, setPreview] = useState("");
  const [AddTopping, setAddTopping] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data, e) => {
        try{
            await createtype(data);
            e.target.reset();
            history.push('/admin/types')
        }catch(error){
            console.log(error);
        }
    }
return (
    <div>
      <h4>Create types</h4>
      <form id="form-add" onSubmit={handleSubmit(onSubmit)}>
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
      
        
        <button type="submit" className="btn btn-primary mt-5">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateToppingScreen;
