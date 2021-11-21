import HomeScreen from "../../screens/home/homepage";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { allproduct, allproductcategory, allproductkeword } from "../../../../Api/product";

const HomePageComponentApp = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [keySearch, setKeySearch] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setKeySearch(data.keywd);
  }

  useEffect(() => {
    if (keySearch != '' && keySearch != null) {
      const item = {
        keyword: keySearch
      }
      const getProducts = async () => {
        try {
          const { data } = await allproductkeword(item);
          setProducts(data);
        } catch (error) {
          console.log(error);
        }
      };
      getProducts();
    }
  }, [keySearch]);


  useEffect(() => {
    if (id) {
      const getProducts = async () => {
        try {
          const { data } = await allproductcategory(id);
          setProducts(data);
        } catch (error) {
          console.log(error);
        }
      };
      getProducts();
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      setKeySearch([]);
      const getProducts = async () => {
        try {
          const { data } = await allproduct();
          setProducts(data);
        } catch (error) {
          console.log(error);
        }
      };
      getProducts();
    }
  }, []);

  return (
    <>
      <div className="m-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className="form-control" type="text" placeholder="Nhập từ khóa" {...register('keywd')} />
          <button type="submit" className="btn btn-dark mt-2">Tìm kiếm</button>
        </form>
      </div>
      <div className="row">
        {products.map((product) => (
          <HomeScreen key={product.id} product={product} />
        ))}
      </div>
    </>
  );

};

export default HomePageComponentApp;
