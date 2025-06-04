import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios' 
import Spinner from '../../Components/Spinner';


const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,

  } = useForm();

  const allCategories = useSelector((state) => state.category.categories);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state)=>state?.user?.user?.id)


  const onFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);
    setValue('images', newFiles, { shouldValidate: true });
  };

  const handleDelete = (indexToRemove) => {
    const newFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(newFiles);
    setValue('images', newFiles, { shouldValidate: true });
  };

  const onSubmit = async (formData) => {
    
    if(selectedFiles.length !== 4 ){

      toast.warning('Select 4 images')
    }

    const {

      name , 
      description , 
      price ,
      stock ,
      category ,
      
      
    } = formData

    const data = new FormData() ;

    data.append('name',name) 
    data.append('description',description) 
    data.append('price',price) 
    data.append('stock',stock) 
    data.append('category',category) ;
      selectedFiles.forEach((file) => {
      data.append('images', file);
    });


    try {

      setLoading(true)
      const api_response = await axios.post(import.meta.env.VITE_API_URL+`/create-product/${user}`,data,{
      withCredentials:true 
      })

      if(api_response.data.success){

        toast.success(api_response.data.message) ;
        setLoading(false) ;
        setSelectedFiles([])
        reset() ;
        return ;
      }
      
    } catch (error) {

      toast.error(error?.response?.data?.message)
      console.log(error)
      setLoading(false) ;
      
    }



   
  };

  const theme = {
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-800',
      heading: 'text-gray-900',
      inputBg: 'bg-white',
      border: 'border-gray-300',
      button: 'bg-black text-white hover:bg-gray-800',
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-gray-100',
      heading: 'text-white',
      inputBg: 'bg-gray-800',
      border: 'border-gray-700',
      button: 'bg-white text-black hover:bg-gray-200',
    },
  };

  const currentTheme = darkMode ? theme.dark : theme.light;

  return (
    <main className={`min-h-screen flex items-center justify-center p-6 ${currentTheme.bg} ${currentTheme.text}`}>
      <div className="w-full max-w-5xl p-8 rounded-xl shadow-xl border flex gap-8 flex-col md:flex-row">
        {/* Form Left Side */}
        <div className="w-full md:w-2/3 space-y-6">
          <h1 className={`text-3xl font-bold mb-4 ${currentTheme.heading}`}>Create a New Product</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name:</label>
              <input
                type="text"
                {...register("name", { required: "Product name is required" })}
                className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter product name"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description:</label>
              <input
                type="text"
                {...register("description", { required: "Product description is required" })}
                className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter description"
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Price:</label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter price"
                />
                {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Stock:</label>
                <input
                  type="number"
                  {...register("stock", { required: "Product stock is required" })}
                  className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter stock"
                />
                {errors.stock && <span className="text-red-500 text-sm">{errors.stock.message}</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Select Category:</label>
              <select
                {...register("category", { required: "Category is required" })}
                className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">---Select Category---</option>
                {allCategories?.map((c, i) => (
                  <option key={i} value={c._id}>{c.name}</option>
                ))}
              </select>
              {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
            </div>
          </form>
        </div>

        {/* Image Upload + Submit */}
        <div className="w-full md:w-1/3 space-y-6 flex flex-col justify-between">
          <div>
            <label className="block text-sm font-medium mb-1">Product Images:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onFilesChange}
              className={`w-full px-4 py-2 rounded-md border ${currentTheme.border} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.images && <span className="text-red-500 text-sm">{errors.images.message}</span>}

            {selectedFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="w-full h-34 object-contain rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className={`w-full py-3 rounded-md font-semibold 
              cursor-pointer text-lg ${currentTheme.button}`}
          >
           {loading ? <Spinner/> : 'Create Product'} 
          </button>
        </div>
      </div>
    </main>
  );
};

export default CreateProduct;
