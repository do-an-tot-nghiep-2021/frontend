import axios from "axios";
import { useState } from "react";

export default function useUpload() {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://beecoffee.wtf/api/uploads",
        formData
      );
      setLoading(false);

      return response.data;
    } catch (error) {
      setLoading(false);
      return "";
    }
  };

  return {
    loading,
    setLoading,
    handleUpload,
  };
}
