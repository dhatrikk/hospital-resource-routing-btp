import axios from "axios";

export const fetchNearestHospitals = async (lat, lng, service) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/hospitals/nearest`,
    {
      params: { lat, lng, service },
    }
  );

  return res.data;
};