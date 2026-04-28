"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // const handleLogin = async () => {
  //   if (!id || !password) {
  //     alert("Enter credentials");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/hospital/login`,
  //       { id, password }
  //     );

  //     localStorage.setItem("token", res.data.token);
  //     localStorage.setItem("hospitalName", res.data.hospitalName);

  //     router.push("/hospital/dashboard");

  //   } catch (err) {
  //     alert("Invalid credentials");
  //   }
  // };

	const handleLogin = async () => {
		// Dummy credentials
		if (id === "hospital1" && password === "1234") {
			localStorage.setItem("token", "dummy_token");
			localStorage.setItem("hospitalName", "Apollo Hospital");
	
			router.push("/hospital/dashboard");
		} else {
			alert("Invalid credentials");
		}
	};

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-87.5">
        <h2 className="text-xl font-semibold mb-4">Hospital Login</h2>

        <input
          placeholder="Hospital ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
