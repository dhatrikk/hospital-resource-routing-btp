import { PrismaClient } from "../generated/prisma/client.js";
import redis from "../config/redis.js";


const prisma = new PrismaClient();

export const allLocations = async function (req, res) {
  try {
    const data = await prisma.hospitals.findMany();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const nearestLocations = async (req, res) => {
//   try {
//     const { lat, lng, service } = req.query;

//     if (!lat || !lng || !service) {
//       return res.status(400).json({ message: "lat, lng, service required" });
//     }

//     const userLat = parseFloat(lat);
//     const userLng = parseFloat(lng);

//     const serviceMap = {
//       beds: "beds",
//       icu: "icu_beds",
//       ventilator: "ventilators",
//       cardiology: "cardiologists",
//       stroke: "stroke_doctors",
//       operation: "operation_theatres",
//     };

//     const field = serviceMap[service.toLowerCase()];
//     if (!field) {
//       return res.status(400).json({ message: "Invalid service" });
//     }

//     // 🔥 Filter in DB (service > 0)
//     const hospitals = await prisma.hospitals.findMany({
//   where: {
//     hospital_resources: {
//       some: {
//         [field]: {
//           gt: 0,
//         },
//       },
//     },
//   },
//   include: {
//     hospital_resources: true,
//   },
// });

//     const result = hospitals
//       .filter((h) => h.latitude && h.longitude)
//       .map((h) => {
//         const distance =
//           (userLat - h.latitude) ** 2 + (userLng - h.longitude) ** 2;

//         return {
//           id: h.id,
//           name: h.name,
//           latitude: h.latitude,
//           longitude: h.longitude,
//           available: h.hospital_resources[field],
//           distance,
//         };
//       })
//       .sort((a, b) => a.distance - b.distance)
//       .slice(0, 5);

//     return res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



export const nearestLocations = async (req, res) => {
  try {
    const { lat, lng, service } = req.query;

    if (!lat || !lng || !service) {
      return res.status(400).json({ message: "lat, lng, service required" });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    // ✅ Round values (important for caching efficiency)
    const roundedLat = Number(userLat.toFixed(2));
    const roundedLng = Number(userLng.toFixed(2));

    const cacheKey = `search:${roundedLat}:${roundedLng}:${service}`;

    // 🔥 1. Check Redis cache
    const cached = await redis.get(cacheKey);

    if (cached) {
      console.log("Cache HIT");
      return res.status(200).json(cached);
    }

    console.log("Cache MISS");

    const serviceMap = {
      beds: "beds",
      icu: "icu_beds",
      ventilator: "ventilators",
      cardiology: "cardiologists",
      stroke: "stroke_doctors",
      operation: "operation_theatres",
    };

    const field = serviceMap[service.toLowerCase()];
    if (!field) {
      return res.status(400).json({ message: "Invalid service" });
    }

    // 🔥 DB call
    const hospitals = await prisma.hospitals.findMany({
      where: {
        hospital_resources: {
          some: {
            [field]: {
              gt: 0,
            },
          },
        },
      },
      include: {
        hospital_resources: true,
      },
    });

    const result = hospitals
      .filter((h) => h.latitude && h.longitude)
      .map((h) => {
        const distance =
          (userLat - h.latitude) ** 2 + (userLng - h.longitude) ** 2;

        return {
          id: h.id,
          name: h.name,
          latitude: h.latitude,
          longitude: h.longitude,
          available: h.hospital_resources[field],
          distance,
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    // 🔥 2. Store in Redis (TTL = 120 sec)
    await redis.set(cacheKey, result, { ex: 120 });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};