import axios from "axios";
import React, { useState } from "react";

export default function Iframe() {
    const searchParams = new URLSearchParams(window.location.search);


    const [url, setUrl] = useState(null);
    const [form, setForm] = useState({
        mobileNumber: "",
        email: "",
        fullName: "",
        opcUserId: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `${process.env.apiBaseURL}/resources/initiate/handover-internal/v1/`,
                headers: {
                    "X-Univest-Secret": "SecretUnivestKey",
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    ...form,
                    opcUserId: Number(form.opcUserId)
                })
            };
            const response = await axios.request(config);
            console.log(response.data);
            setUrl(`${response.data?.data?.webUrl}${searchParams.toString() ? `&${searchParams.toString()}` : ""}`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleIframeLoad = () => {
        console.log("Iframe loaded");
    };
    const handleReLoadIframe = () => {
        setUrl(null);
    };

    if (url) {
        return (
            <div className="h-screen w-full my-24 relative">
                <button
                    onClick={handleReLoadIframe}
                    className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Reload
                </button>
                <iframe
                    src={url}
                    className="h-full w-full"
                    title="Handover Form"
                    frameBorder="0"
                    onLoad={handleIframeLoad}
                ></iframe>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Handover Form</h1>
                <p className="mb-6">Please fill out the form below to initiate the handover process.</p>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={form.mobileNumber}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">OPC User ID</label>
                        <input
                            type="number"
                            name="opcUserId"
                            value={form.opcUserId}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
